import React, { memo, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LandingPage from '../Pages/LandingPage';
import { useSelector } from 'react-redux';
import SignIn from '../Pages/Authentication/SignIn';
import Registration from '../Pages/Authentication/Registration';
import ProfilePage from '../Pages/ProfilePage';
import ServicesPage from '../Pages/ServicesPage';




const AppRouter = memo(() => {

  const {isLoged} = useSelector(state => state.logedUserSlice)


 
  return isLoged  ?
  (
    //Private Routes
    <Routes>
      <Route path='/Home' element={<LandingPage/>}/>   
      <Route path='/Login' element={<Navigate to='/Home' />}/>   
      <Route path='/Registration' element={<Navigate to='/Home' />}/>   
      <Route path='/Profile' element={<ProfilePage/>}/>   
      <Route path='/Services' element={<ServicesPage />}/>   
    </Routes>
  )
  :
  (
    // Public Routes
    <Routes>
      <Route path='/' element={<Navigate to='Home' />}/>   
      <Route path='/Home' element={<LandingPage/>}/>   
      <Route path='/Login' element={<SignIn />}/>   
      <Route path='/Registration' element={<Registration />}/>  
      <Route path='/Services' element={<ServicesPage />}/>   
    </Routes>

  )
})


export default AppRouter