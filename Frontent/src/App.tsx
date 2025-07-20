import React from 'react'
import SignUp from './Pages/SignUp'
import Login from './Pages/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import ProfilePage from './Pages/ProfilePage'


const App = () => {
  return (
    <div>

      <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
