import React, { useEffect } from 'react'
import {Routes,Route} from "react-router"
import { useDispatch, useSelector } from 'react-redux'
import { setUser, setLoading } from './Redux/Slice/user.slice'
import api from './Config/api'
import Register from './Features/Auth/Pages/Register'
import Login from './Features/Auth/Pages/Login'
import Dashboard from './Features/public/Pages/Dashboard'
import Resume from './Features/public/Pages/Resume'
import AtsCheck from './Features/public/Pages/AtsCheck'
import CreateResume from './Features/public/Pages/CreateResume'
import JobPreperation from './Features/public/Pages/JobPreperation'
import Roadmaps from './Features/public/Pages/Roadmaps'
import Plans from './Features/public/Pages/Plans'
import Account from './Features/public/Pages/Account'
import Settings from './Features/public/Pages/Settings'
import MainLayout from './Features/public/Layout/MainLayout'
import ProtectedRoute from './Features/Auth/Components/ProtectedRoute'

const App = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get('/api/user/auth/account');
        console.log(response)
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
          <Route path='/' element={<Dashboard />} />
          <Route path='/job-preparation' element={<JobPreperation />} />
          <Route path='/resume' element={<Resume />} />
          <Route path='/resume/ats-check' element={<AtsCheck />} />
          <Route path='/resume/create' element={<CreateResume />} />
          <Route path='/roadmaps' element={<Roadmaps />} />
          <Route path='/plans' element={<Plans />} />
          <Route path='/account' element={<Account />} />
          <Route path='/settings' element={<Settings />} />
        </Route>
      </Route>
      <Route path='/register' element={<Register/>} />
      <Route path='/login' element={<Login/>} />
    </Routes>
  )
}

export default App