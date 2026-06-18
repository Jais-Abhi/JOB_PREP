import React from 'react'
import {Routes,Route} from "react-router"
import Register from './Features/Auth/Pages/Register'
import Login from './Features/Auth/Pages/Login'
import Home from './Features/Interview/Pages/Home'
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register/>} />
      <Route path='/login' element={<Login/>} />
    </Routes>
  )
}

export default App