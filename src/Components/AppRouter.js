import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LandingPage from '../Pages/LandingPage';
import { useSelector } from 'react-redux';
import SignIn from './Authentication/SignIn';
import Registration from './Authentication/Registration';


const AppRouter = () => {
  const {userId} = useSelector(state => state.logedUserSlice)
 
  return userId ?
  (
    //Private Routes
    <Routes>
      <Route path='/Home' element={<LandingPage/>}/>   
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
    </Routes>

  )
}


export default AppRouter