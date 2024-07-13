import { useState, useEffect } from 'react';
import { getDocs, query, where, collection, updateDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setSelectedUserId } from '../Redux/Slices/usersSlice';

const useUserDocRef = () => {
  const dispatch = useDispatch()
  const [docRef, setDocRef] = useState(null);
  
  var selectedUserId =  localStorage.getItem("selectedUserId");


  const location = useLocation()

  const pathname = location.pathname;
  const lastValue = pathname.split('/').pop();

  // const {selectedUserId} = useSelector(state => state.usersSlice)
  
  
  // useEffect(() => {
  //     if(lastValue === selectedUserId){
  //       localStorage.setItem('selectedUserId', lastValue); 
  //     }else{
  //       localStorage.setItem('selectedUserId', auth.currentUser.uid); 
  //       console.log('araaaa')
  //     }
  // },[])
 

  useEffect(() => {


 //  ise gavaketo rom aq  udristan iyos auth.currentUser.uid da to select useri udris local storages mashin daeweros eg


   
    if(auth.currentUser.uid && selectedUserId){
      const q = query(collection(db, 'users'), where('id', '==',  selectedUserId)); // aq unda shevcvalo


      console.log(q)

      getDocs(q).then((querySnapshot) => {
        const docRef = querySnapshot.docs[0]?.ref;
        setDocRef(docRef);
        console.log(docRef)
        
      });
    }

    
    // if(lastValue && lastValue===selectedUserId){
    //   localStorage.setItem('selectedUserId', lastValue); 
    //   console.log('tokoa')
    // }else{
    //   localStorage.setItem('selectedUserId', auth.currentUser.uid); 
    //   console.log('pandaia')
    // }
  
    lastValue===selectedUserId && dispatch(setSelectedUserId(lastValue))
    
  }, [selectedUserId , lastValue]);

  return docRef;
};

export default useUserDocRef;




