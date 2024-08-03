import React, { memo, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { auth } from '../config/firebase';
import LandingPage from '../Pages/LandingPage';
import SignIn from '../Pages/Authentication/SignIn';
import Registration from '../Pages/Authentication/Registration';
import ProfilePage from '../Pages/ProfilePage';
import ServicesPage from '../Pages/ServicesPage';
import ServicePage from '../Pages/ServicePage';
import DiscoverPeoplePage from '../Pages/DiscoverPeoplePage';
import NotificationsPage from '../Pages/NotificationsPage';
import ShopLandingPage from '../Pages/ShopPages/ShopLandingPage';
import Products from '../Pages/ShopPages/Products';
import SelectedProductPage from '../Pages/ShopPages/SelectedProductPage';
import ShopingCartPage from '../Pages/ShopPages/ShopingCartPage';
import ShippingInfoPage from './../Pages/ShopPages/ShippingInfoPage';
import ProductAdd from './admin/ProductAdd';
import AdminPage from '../Pages/AdminPage';
import ContactUsPage from '../Pages/ShopPages/ContactUsPage';
import ScrollToTop from './ScrollToTop';
import ProtectedRoute from './ProtectedRoute';


const AppRouter = memo(() => {
  const { isLoged, currentServiceURL, selectedService } = useSelector(state => state.logedUserSlice);
  const { selectedUserName } = useSelector(state => state.usersSlice);
  const [isAdmin, setIsAdmin] = useState(false);

  auth.onAuthStateChanged(user => {
    if (user) {
      user.getIdTokenResult().then(idTokenResult => {
        setIsAdmin(idTokenResult.claims.admin);
      });
    }
  });

  useEffect(() => {
    if (isLoged) {
      window.history.replaceState({}, '', '/'); // Replace with the desired page after login
    }
  }, [isLoged]);

  return (
    <ScrollToTop>
      <Routes>
        <Route path='/' element={<ShopLandingPage />} />
        <Route path='/SignIn' element={<SignIn />} />
        <Route path='/Registration' element={<Registration />} />
        <Route path='/Products' element={<Products />} />
        <Route path='/Products/:id' element={<SelectedProductPage />} />
        <Route path='/Contact' element={<ContactUsPage />} />
        <Route path='/Services' element={<ServicesPage />} />
        <Route path='/ShippingInfo' element={<ShippingInfoPage />} />
        
        {/* Private Routes */}
        <Route path='/Profile' element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />  
        <Route path={`/Services/:${currentServiceURL}/:id`} element={<ProtectedRoute><ServicePage /></ProtectedRoute>} />
        <Route path={`/Discover/:${currentServiceURL}`} element={<ProtectedRoute><DiscoverPeoplePage /></ProtectedRoute>} />
        <Route path={`/Discover/:${selectedUserName}/:id`} element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path='/Notifications' element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
        <Route path='/Cart' element={<ProtectedRoute><ShopingCartPage /></ProtectedRoute>} />
        {isAdmin && <Route path='/Admin' element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />}
      </Routes>
    </ScrollToTop>
  );
});

export default AppRouter;
