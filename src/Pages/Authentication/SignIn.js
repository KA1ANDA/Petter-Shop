import React, {memo, useState } from 'react';
import {auth} from "../../config/firebase"
import {signInWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from 'react-router-dom';
import useGoogleAuth from '../../Hooks/useGoogleAuth';




const SignIn = memo(() => {
  const navigate = useNavigate();
  const googleAuth = useGoogleAuth()
  
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')



  const singIn = async() => {
    try{
      await signInWithEmailAndPassword(auth , email , password)
      navigate('/Home')

    }catch(err){
      console.error(err)
    }
  }

 


  return(
   
      <div className='flex flex-col gap-[20px] bg-purple-300 m-auto'>
        <div>Sing In</div>
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

       
        <button onClick={singIn}>Sing In</button>
        <button onClick={googleAuth}>Sing In With Google</button>
      </div>
  )
})


export default SignIn