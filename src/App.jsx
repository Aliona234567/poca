// import React, { Component } from 'react' 
import React from 'react'
import Navbar from './Components/Navbar'
import { Route,Routes } from 'react-router-dom'
import About from './Components/peges/About'
import Contact from './Components/peges/Contact'
import Home from './Components/peges/Home'

export default function App(){
  return <div className='App'>
    {/* <Navbar/> */}
    <Routes>  
      <Route path='/' element={<Home/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/contsct' element={<Contact/>} />

    </Routes>
  </div>
}
