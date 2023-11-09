import React, {memo, useEffect, useState } from 'react';
import {auth , googleProvider} from "../../config/firebase"
import {signInWithEmailAndPassword , signInWithPopup} from "firebase/auth"
import { useNavigate } from 'react-router-dom';
import { addUserToDb } from './Registration';
import { useSelector } from 'react-redux';




const SignIn = memo(() => {
  const navigate = useNavigate();
  
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  const {users} = useSelector((state) => state.logedUserSlice)



  const singIn = async() => {
    try{
      await signInWithEmailAndPassword(auth , email , password)
      navigate('/Home')

    }catch(err){
      console.error(err)
    }
  }

  const singInWithGoogle = async() => {
    try{
      await signInWithPopup(auth , googleProvider)
      const filtredUser = users.filter((user)=>user.id === auth.currentUser.uid)
      console.log(filtredUser)
      if (filtredUser.length == 0) {
        addUserToDb();
        console.log('sheiqmna');
      } else {
        console.log('User with the given email already exists');
      }
      
     
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
        <button onClick={singInWithGoogle}>Sing In With Google</button>
      </div>
  )
})


export default SignIn