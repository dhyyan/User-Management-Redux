import React from 'react'
import SignUp from './Pages/SignUp'
import Login from './Pages/Login'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import ProfilePage from './Pages/ProfilePage'
import AdminLogin from './Pages/admin/AdminLogin'
import AdminDashboard from './Components/admin/AdminDashboard'
import EditUser from './Components/admin/EditUser'


const App = () => {
  return (
    <div>

      <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
        <Route path='/admin/login' element={<AdminLogin/>}/>
        <Route path='/admin/users' element={<AdminDashboard/>}/>
        <Route path='/admin/editUser/:id' element={<EditUser/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
