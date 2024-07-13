import { collection, getDoc, getDocs, query, where } from 'firebase/firestore';
import React, { memo, useEffect, useState } from 'react';
import { db } from '../config/firebase';
import PersonCard from '../Components/PersonCard';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';


const DiscoverPeoplePage = memo(() => {


  const [usersData, setUsersData] = useState([]);


  var selectedService = localStorage.getItem("currentServiceName");




  useEffect(() => {
    const q = query(collection(db, 'users'), where('readyToWork', '==', true), where('activity', '==', selectedService));

    getDocs(q).then((querySnapshot) => {
      if (querySnapshot.docs.length === 0) {
        // Handle empty querySnapshot
        console.warn('No users found with matching filters');
      } else {
        const users = querySnapshot.docs.map((doc) => doc.data());
        setUsersData(users);
        console.log(usersData)
      }
    });
  },[]);


  // useEffect(() => {
  //   if(docRef){
  //     const fetchUsers = async () => {
  //       const docSnap = await getDoc(docRef);
  //       const usersData = docSnap.data();
  //       setUsersData(usersData);
  //     };
      
  //     fetchUsers();
  //   }

  //   console.log(usersData)
    
  // }, [docRef]);


  return(
    <div className=' bg-amber-200 h-[100%] flex gap-[50px]'>
      
      {usersData == [] ? (
      <div >Loading...</div>
    ) : (
      usersData?.map((user) => (
        <NavLink to={`/Discover/${user.displayName}/${user.id}`}>
          <PersonCard name={user.displayName} about={user.about} photo={user.photo} userId={user.id} />
        </NavLink>
        
      ))
    )}
      
    </div>
  )
})


export default DiscoverPeoplePage