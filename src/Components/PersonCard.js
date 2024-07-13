import React, { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedUserId, setSelectedUserName } from '../Redux/Slices/usersSlice';
import { useLocation } from 'react-router-dom';
import { auth } from '../config/firebase';


const PersonCard = memo(({name , about , photo , userId}) => {
  const dispatch = useDispatch()



  const handleClick = () => {
    // dispatch(setSelectedUserId(userId))  

    localStorage.setItem('selectedUserId', userId); 
    dispatch(setSelectedUserName(name))
  };



  return(
    <div className=' bg-pink-400 flex flex-col  cursor-pointer' onClick={handleClick}>
      <img className='w-[100px] h-[100px] object-cover self-center' src={photo}/>
      <div className='text-[20px] font-bold'>{name}</div>
      <div className='flex gap-[30px]'>
        <div>salary</div>
        <div>region</div>
      </div>
      <div>{about}</div>  
    </div>
  )
})


export default PersonCard