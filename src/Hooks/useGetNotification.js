// import { useState, useEffect } from 'react';
// import { getDoc, getDocs } from 'firebase/firestore';
// import useUserDocRef from './useUserDocRef';
// import useGetNotificationRef from './useGetNotificationRef';

// const useGetNotification = () => {
  

//   const notificationRef = useGetNotificationRef()

//   const [notificationData, setNotificationData] = useState([]);

//   useEffect(() => {
//     if(notificationRef){
//       const fetchNotificationInfo = async () => {
//         const docSnap = await getDoc(notificationRef);
//         const notificationData = docSnap.data();
//         setNotificationData(notificationData);
//       };
      
//       fetchNotificationInfo();
//     }
    
//   }, [notificationRef]);

//   return notificationData;
// };

// export default useGetNotification;




