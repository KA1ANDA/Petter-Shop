import React, { memo, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import LandingPage from '../Pages/LandingPage';
import { useSelector } from 'react-redux';
import SignIn from '../Pages/Authentication/SignIn';
import Registration from '../Pages/Authentication/Registration';
import ProfilePage from '../Pages/ProfilePage';
import ServicesPage from '../Pages/ServicesPage';
import ServicePage from '../Pages/ServicePage';
import DiscoverPeoplePage from '../Pages/DiscoverPeoplePage';




const AppRouter = memo(() => {
 
  const {isLoged , currentServiceURL , selectedService} = useSelector(state => state.logedUserSlice)

  const navigate = useNavigate();
 
  useEffect(() => {
    if (isLoged) {
      window.history.replaceState({}, '', '/'); // Replace with the desired page after login
    }
  }, [isLoged]);

//logins tu saertod amovigeb zedmeti carieli historys routi gaqqreba
  return isLoged  ?
  (
    //Private Routes
    <Routes>
      {/* <Route path='/' element={<Navigate to='Home' />}/>    */}
      <Route path='/' element={<LandingPage/>}/>   
      {/* <Route path='/Login' element={<Navigate to='/' />}/>    */}
      {/* <Route path='/Registration' element={<Navigate to='/' />}/>    */}
      <Route path='/Profile' element={<ProfilePage/>}/>   
      <Route path='/Services' element={<ServicesPage />}/>  
      <Route path={`/Services/:${currentServiceURL}/:id`} element={<ServicePage />}/>   
      <Route path={`/Discover/:${currentServiceURL}`} element={<DiscoverPeoplePage />}/>   
    </Routes>
  )
  :
  (
    // Public Routes
    <Routes>
      {/* <Route path='/' element={<Navigate to='Home' />}/>    */}
      <Route path='/' element={<LandingPage/>}/>   
      <Route path='/Login' element={<SignIn />}/>   
      <Route path='/Registration' element={<Registration />}/>  
      <Route path='/Profile' element={<Navigate to='/' />}/>   
      <Route path='/Services' element={<ServicesPage />}/>  
      <Route path={`/Services/:${currentServiceURL}/:id`} element={<ServicePage />}/> 
      <Route path={`/Discover/:${currentServiceURL}`} element={<DiscoverPeoplePage />}/>   



    </Routes>

  )
})


export default AppRouter