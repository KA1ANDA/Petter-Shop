import React, {useState } from 'react';
import {auth , googleProvider} from "../../config/firebase"
import {createUserWithEmailAndPassword , signInWithPopup} from "firebase/auth"
import { useDispatch } from 'react-redux';
import { setUserId } from '../../Redux/Slices/logedUserSlice';
import { useNavigate } from 'react-router-dom';




const Registration = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')



  const singUp = async() => {
    try{
      await createUserWithEmailAndPassword(auth , email , password)
      dispatch(setUserId(auth.currentUser.uid))
      navigate('/Home')
      console.log(auth.currentUser)
    }catch(err){
      console.error(err)
    }
  }

  const singInWithGoogle = async() => {
    try{
      await signInWithPopup(auth , googleProvider)
      dispatch(setUserId(auth.currentUser.uid))
      navigate('/Home')
      console.log(auth.currentUser)
    }catch(err){
      console.error(err)
    }
  }



  return(
   
      <div className='flex flex-col gap-[20px] bg-red-300'>
        <div>Registration</div>
        <input
         type='text'
         placeholder='Write Your EmaiL'
         onChange={(e)=>setEmail(e.target.value)}
         />

        <input
         type='password' 
         placeholder='Write Your Password' 
         onChange={(e)=>setPassword(e.target.value)}
         />

       
        <button onClick={singUp}>Register</button>
        <button onClick={singInWithGoogle}>Sing In With Google</button>

      </div>
  )
}


export default Registration