import { useState, useEffect } from 'react';
import { getDocs, query, where, collection, updateDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

const useUserDocRef = () => {
  const [docRef, setDocRef] = useState(null);

  useEffect(() => {
    const q = query(collection(db, 'users'), where('id', '==', auth.currentUser.uid));

    getDocs(q).then((querySnapshot) => {
      const docRef = querySnapshot.docs[0].ref;
      setDocRef(docRef);
    });
  }, []);

  return docRef;
};

export default useUserDocRef;




