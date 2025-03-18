import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import { Routes, useLocation, useNavigate } from "react-router"


import Home from './pages/Home'
import Signup from './pages/Signup'
import CarbonCalculator from './pages/Calculator'
import Solution from './pages/Solution'
import ChatBot from './pages/ChatBot'

const App = () => {
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(()=>{
    if(location.pathname === "/calculator"){
    if(!localStorage.getItem("idToken")){
      navigate("/authentication")
    }else{
      navigate("/calculator")
    }
  }
  },[navigate])
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/calculator" element={<CarbonCalculator/>}/>
      <Route path="/solution" element={<Solution/>}/>
      <Route path="/chatbot" element={<ChatBot/>}/>

      <Route path="/authentication" element={<Signup/>}/>
    </Routes>
  )
}

export default App