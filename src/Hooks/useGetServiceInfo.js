import { useState, useEffect } from 'react';
import { getDocs, query, where, collection } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { useSelector } from 'react-redux';

const useGetServiceInfo = () => {

  //REDUX persisti gamoviyeno tu minda rom id daimaxsovros reloadis shemtxvevashi
  
  const [docRef, setDocRef] = useState(null);
  // const {selectedService} = useSelector((state) => state.servicesSlice)

  var selectedService = localStorage.getItem("currentServiceId");


  useEffect(() => {

    if(selectedService){
      const q = query(collection(db, 'services'), where('id', '==', parseInt(selectedService) ));

  
      getDocs(q).then((querySnapshot) => {
        if (querySnapshot.docs.length > 0) {
          const docRef = querySnapshot.docs[0].data();
          setDocRef(docRef);
        } else {
          console.error('No document found with ID:', selectedService);
        }
      });
     
    }
    
  
   
  }, [selectedService]);

  return docRef;
};

export default useGetServiceInfo;




