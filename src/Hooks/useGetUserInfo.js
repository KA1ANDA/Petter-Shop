import { useState, useEffect } from 'react';
import { getDoc, getDocs } from 'firebase/firestore';
import useUserDocRef from './useUserDocRef';

const useGetUserInfo = () => {
  

  const userDocRef = useUserDocRef()

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    if(userDocRef){
      const fetchUserInfo = async () => {
        const docSnap = await getDoc(userDocRef);
        const userData = docSnap.data();
        setUserData(userData);
      };
      
      fetchUserInfo();
    }
    
  }, [userDocRef]);

  return userData;
};

export default useGetUserInfo;




