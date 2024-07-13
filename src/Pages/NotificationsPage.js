import React, { memo, useEffect, useState } from 'react';
import useGetNotification from '../Hooks/useGetNotification';
import Notification from '../Components/Notification';
import useGetNotificationRef from '../Hooks/useGetNotificationRef';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../Redux/Slices/logedUserSlice';





const NotificationsPage = memo(() => {


  // console.log('shetyobineba' , notificationData)

  // const notificationRef = useGetNotificationRef()
  // const notificationRef = collection(db, 'notifications');
  const notificationRef = query(collection(db, 'notifications'), where('recipientId', '==',  auth.currentUser.uid));
  
  const [notifications, setNotifications] = useState()

  useEffect(() => {
    const unsubscribe = onSnapshot(notificationRef, (snapshot) => {
  
      snapshot.forEach((doc) => {
        const notificationData = doc.data();
        setNotifications(notificationData)
      });
      
    });
  

    
    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);


 


  if(!notifications?.inbox){
    return <div>YOU HAVE NO NOTIFICATIONS YET</div>
  }

  return(
    <div className='bg-purple-300 h-[100%] flex flex-col gap-[30px]'>
      {notifications?.inbox?.map(notification => <Notification notification={notification}/>)}
    </div>
  )
})


export default NotificationsPage