import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {signOut} from 'firebase/auth'
import {auth} from "../config/firebase"
import { setUserId } from '../Redux/Slices/logedUserSlice';

const NavBar = () => {
  const dispatch = useDispatch()
  const {userId} = useSelector(state => state.logedUserSlice)

  const logOut = async() => {
    try{
      await signOut(auth)
      dispatch(setUserId(''))

    }catch(err){
      console.error(err)
    }
    
  }

  return(
    <div className='bg-blue-300'>
   
      {userId ? 
        <button onClick={logOut}>Log Out</button>
        :
        <>
          <NavLink to='Login'>  <button>Log In</button> </NavLink>   
          <NavLink to='Registration'>  <button>Registration</button> </NavLink>   
        </>
        
      
      }
       

    
      
    </div>
  )
}


export default NavBar