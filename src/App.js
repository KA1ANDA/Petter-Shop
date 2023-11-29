import { useDispatch, useSelector } from 'react-redux';
import AppRouter from './Components/AppRouter';
import NavBar from './Components/NavBar';
import { auth, db } from './config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import {setIsLoged, setUsers } from './Redux/Slices/logedUserSlice';
import { useEffect, useState } from 'react';
import { collection, doc, getDocs, onSnapshot } from 'firebase/firestore';
import { current } from '@reduxjs/toolkit';
import ChooseActivity from './Components/ChooseActivity';



function App() {

  const dispatch = useDispatch()
  const usersRef = collection(db, 'users');
  const {chooseActivityToggle} = useSelector(state => state.logedUserSlice)

  
  onAuthStateChanged(auth,(user) => {

    if (user) {
      dispatch(setIsLoged(true))
      console.log(auth.currentUser)
      console.log('shesuli var')
    } else {
      dispatch(setIsLoged(false))
      console.log('ar var shesuli')
    }
  });


  

  useEffect(() => {
    const unsubscribe = onSnapshot(usersRef, (snapshot) => {
      const users = [];
  
      snapshot.forEach((doc) => {
        const userData = doc.data();
        users.push(userData);
      });
  
      dispatch(setUsers(users));
    });
  
    return () => unsubscribe(); // Cleanup listener on unmount
  }, [dispatch]);
  

  return (
    <div className="flex flex-col bg-green-300 h-[100%] px-[275px]">
      <NavBar/>
      <AppRouter />
      {chooseActivityToggle && (
        <ChooseActivity />
      )}
    </div>
  );
}

export default App;
