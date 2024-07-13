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
import NotificationsPage from '../Pages/NotificationsPage'
import ShopLandingPage from '../Pages/ShopPages/ShopLandingPage';
import Products from '../Pages/ShopPages/Products';
import SelectedProductPage from '../Pages/ShopPages/SelectedProductPage';
import ShopingCartPage from '../Pages/ShopPages/ShopingCartPage';
import ShippingInfoPage from './../Pages/ShopPages/ShippingInfoPage'
import ProductAdd from './admin/ProductAdd';
import { auth } from '../config/firebase';
import AdminPage from '../Pages/AdminPage';
import ContactUsPage from '../Pages/ShopPages/ContactUsPage';



const AppRouter = memo(() => {
 
  const {isLoged , currentServiceURL , selectedService} = useSelector(state => state.logedUserSlice)
  const {selectedUserName} = useSelector(state => state.usersSlice)

  const [isAdmin , setIsAdmin] = useState(false)


  auth.onAuthStateChanged(user => {
    if(user){
      user.getIdTokenResult().then(idTokenResult => {
        setIsAdmin(idTokenResult.claims.admin)
      })
    }
  })
 
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
      {/* <Route path='/' element={<LandingPage/>}/>    */}
      {/* <Route path='/Login' element={<Navigate to='/' />}/>    */}
      {/* <Route path='/Registration' element={<Navigate to='/' />}/>    */}
      <Route path='/Profile' element={<ProfilePage/>}/>   
      <Route path='/Services' element={<ServicesPage />}/>  
      <Route path='/ShippingInfo' element={<ShippingInfoPage />}/>  
      <Route path='/Contact' element={<ContactUsPage />}/>  
      <Route path={`/Services/:${currentServiceURL}/:id`} element={<ServicePage />}/>   
      <Route path={`/Discover/:${currentServiceURL}`} element={<DiscoverPeoplePage />}/>   
      <Route path={`/Discover/:${currentServiceURL}`} element={<DiscoverPeoplePage />}/>  
      <Route path={`/Discover/:${selectedUserName}/:id`} element={<ProfilePage/>}/>  
      <Route path={`/Notifications`} element={<NotificationsPage/>}/>
      {isAdmin && (    
        <Route path={'/Admin'} element={<AdminPage/>} />  
      )}   
      <Route path={`/`} element={<ShopLandingPage/>}/>   
      <Route path={`/Products/`} element={<Products/>}/>   
      <Route path={`/Products/:id`} element={<SelectedProductPage/>}/>   
      <Route path={`/Cart`} element={<ShopingCartPage/>}/>   

      





    </Routes>
  )
  :
  (
    // Public Routes
    <Routes>
      {/* <Route path='/' element={<Navigate to='Home' />}/>    */}
      {/* <Route path='/' element={<LandingPage/>}/>    */}
      {/* <Route path='/Login' element={<SignIn />}/>   
      <Route path='/Registration' element={<Registration />}/>   */}
      <Route path='/Profile' element={<Navigate to='/' />}/>   
      <Route path='/Services' element={<ServicesPage />}/>  
      <Route path='/ShippingInfo' element={<ShippingInfoPage />}/> 
      <Route path='/Contact' element={<ContactUsPage />}/>  
      <Route path={`/Services/:${currentServiceURL}/:id`} element={<ServicePage />}/> 
      <Route path={`/Discover/:${currentServiceURL}`} element={<DiscoverPeoplePage />}/>   
      <Route path={`/Discover/:${selectedUserName}/:id`} element={<ProfilePage/>}/> 
      <Route path={`/`} element={<ShopLandingPage/>}/>   
      <Route path={`/Products/`} element={<Products/>}/>   
      <Route path={`/Products/:id`} element={<SelectedProductPage/>}/>   







    </Routes>

  )
})


export default AppRouter