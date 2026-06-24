import React from 'react'
import {Routes,Route} from "react-router"
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

const App = () => {
  return (
    <Routes>
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
      <Route path='/register' element={<Register/>} />
      <Route path='/login' element={<Login/>} />
    </Routes>
  )
}

export default App