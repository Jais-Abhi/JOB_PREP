import React from 'react'
import {Routes,Route} from "react-router"
import Register from './Features/Auth/Pages/Register'
import Login from './Features/Auth/Pages/Login'
import Dashboard from './Features/public/Pages/Dashboard'
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/register' element={<Register/>} />
      <Route path='/login' element={<Login/>} />
    </Routes>
  )
}

export default App