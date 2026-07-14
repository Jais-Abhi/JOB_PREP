import React, { useEffect } from 'react'
import {Routes,Route} from "react-router"
import { useDispatch, useSelector } from 'react-redux'
import { setUser, setLoading } from './Redux/Slice/user.slice'
import api from './Config/api'
import Register from './Features/Auth/Pages/Register'
import Login from './Features/Auth/Pages/Login'
import Dashboard from './Features/dashboard/Dashboard'
import AtsCheck from './Features/resume-studio/AtsCheck'
import AtsReport from './Features/resume-studio/AtsReport'
import CreateResume from './Features/resume-studio/CreateResume'
import ResumeTemplates from './Features/resume-studio/ResumeTemplates'
import History from './Features/resume-studio/History'
import JobPreperation from './Features/career-lab/job-preperation/JobPreperation'
import PastAnalysis from './Features/career-lab/job-preperation/PastAnalysis'
import SkillRoadmap from './Features/career-lab/roadmaps/SkillRoadmap'
import PlacementRoadmap from './Features/career-lab/roadmaps/PlacementRoadmap'
import DsaTracker from './Features/career-lab/roadmaps/DsaTracker'
import Account from './Features/profile/Account'
import Settings from './Features/profile/Settings'
import Plans from './Features/my-plans/Plans'
import Roadmaps from './Pages/Roadmaps'
import Resume from './Pages/Resume'
import ProtectedRoute from './Features/Auth/Components/ProtectedRoute'
import NotFound from './Pages/NotFound'
import MainLayout from './components/Layout/MainLayout'

const App = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get('/api/user/auth/account');
        if (response.status === 200) {
          dispatch(setUser(response.data));
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    checkAuth();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="text-xl font-semibold text-slate-700">Loading...</div>
      </div>
    );
  }

  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          {/* Dashboard */}
          <Route path='/' element={<Dashboard />} />

          {/* Resume Studio */}
          <Route path='/resume' element={<Resume />} />
          <Route path='/resume/ats-check' element={<AtsCheck />} />
          <Route path='/resume/ats-check/report/:id' element={<AtsReport />} />
          <Route path='/resume/create' element={<CreateResume />} />
          <Route path='/resume/templates' element={<ResumeTemplates />} />
          <Route path='/resume/history' element={<History />} />

          {/* Career Tools – Job Preparation */}
          <Route path='/job-preparation' element={<JobPreperation />} />
          <Route path='/past-analysis' element={<PastAnalysis />} />

          {/* Career Tools – Roadmaps */}
          <Route path='/roadmaps' element={<Roadmaps />} />
          <Route path='/roadmaps/skill' element={<SkillRoadmap />} />
          <Route path='/roadmaps/placement' element={<PlacementRoadmap />} />
          <Route path='/roadmaps/dsa' element={<DsaTracker />} />

          {/* Misc */}
          <Route path='/plans' element={<Plans />} />
          <Route path='/account' element={<Account />} />
          <Route path='/settings' element={<Settings />} />
        </Route>
      </Route>
      <Route path='/register' element={<Register/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App