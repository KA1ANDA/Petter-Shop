import { useState, useEffect } from 'react';
import { onSnapshot } from 'firebase/firestore';
import useUserDocRef from './useUserDocRef';

const useGetUserInfo = () => {
  const userDocRef = useUserDocRef();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (userDocRef) {
      const unsubscribe = onSnapshot(userDocRef, (doc) => {
        if (doc.exists()) {
          setUserData(doc.data());
        } else {
          console.log("No such document!");
        }
      });

      // Cleanup subscription on unmount
      return () => unsubscribe();
    }
  }, [userDocRef]);

  return userData;
};

export default useGetUserInfo;
