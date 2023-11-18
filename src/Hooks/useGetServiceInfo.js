import { useState, useEffect } from 'react';
import { getDocs, query, where, collection } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { useSelector } from 'react-redux';

const useGetServiceInfo = () => {

  //REDUX persisti gamoviyeno tu minda rom id daimaxsovros reloadis shemtxvevashi
  
  const [docRef, setDocRef] = useState(null);
  const {selectedService} = useSelector((state) => state.servicesSlice)

  useEffect(() => {

    if(selectedService){
      const q = query(collection(db, 'services'), where('id', '==', selectedService));

  
      getDocs(q).then((querySnapshot) => {
        const docRef = querySnapshot.docs[0].data();
        setDocRef(docRef);
      });
     
    }
    
  
   
  
  }, [selectedService]);

  return docRef;
};

export default useGetServiceInfo;




