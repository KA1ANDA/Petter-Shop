import React, { memo, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {signOut} from 'firebase/auth'
import {auth} from "../config/firebase"
import { useDispatch, useSelector } from 'react-redux';
import { setDisplayName } from '../Redux/Slices/logedUserSlice';
import { setSelectedService } from '../Redux/Slices/servicesSlice';

const NavBar = memo(() => {
  const dispatch = useDispatch()
  

  const {isLoged , displayName , profilePictureLoading} = useSelector(state => state.logedUserSlice)
  

  const logOut = async() => {
    try{
      await signOut(auth)
    }catch(err){
      console.error(err)
    }
    
  }


  useEffect(()=>{
    if(auth.currentUser?.displayName != ''){
      dispatch(setDisplayName(auth.currentUser?.displayName))
    }
  },[dispatch , auth.currentUser?.displayName])

  
  

  return(
    <div className='bg-blue-300 flex justify-between items-center '>
      <NavLink to='/'>
        PETTER
      </NavLink>
       

      <ul className='flex gap-[80px]'>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/Services'>Services</NavLink></li>
        <li>Shop</li>
        <li>About</li>
      </ul>
   
      {isLoged ? 
        <div className='flex gap-[50px] '>
          <div className='flex justify-center items-center'>
            <NavLink to='Profile'>
              <div className=' rounded-[50%] overflow-hidden w-[70px] h-[70px] border border-black'>
                {profilePictureLoading ? 
                  <div>Loadinggggggg </div>
                :
                  <img src={auth.currentUser.photoURL}/>
                }
            
              </div>
            </NavLink>   
            <div>{displayName}</div>
          </div>
          <button onClick={logOut}>Log Out</button>
        </div>
       
        :
        <>
          <NavLink to='Login'>  <button>Log In</button> </NavLink>   
          <NavLink to='Registration'>  <button>Registration</button> </NavLink>   
        </>
        
      
      }
       

    
      
    </div>
  )
})


export default NavBar