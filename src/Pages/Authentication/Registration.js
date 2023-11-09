import React, {memo, useEffect, useState } from 'react';
import {auth , db, googleProvider} from "../../config/firebase"
import {createUserWithEmailAndPassword , signInWithPopup , updateProfile} from "firebase/auth"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setChooseActivityToggle, setDisplayName } from '../../Redux/Slices/logedUserSlice';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';


 export const addUserToDb = async(displayName=auth.currentUser.displayName) => {

  try{
   
    await addDoc(collection(db, "users"), {
      id:auth.currentUser.uid,
      displayName,
      email:auth.currentUser.email,
      photo:auth.currentUser.photoURL,
      activity:""
    })
  }catch(err){
    console.error(err)
  }
  
}

const Registration = memo(() => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  const [name , setName] =  useState('')
  const [lastName , setLastName] =  useState('')

  const {users} = useSelector((state) => state.logedUserSlice)



  


  const singUp = async() => {
    try{
        await createUserWithEmailAndPassword(auth , email , password).then((result) => {
        const user = result.user;
        updateProfile(user, {displayName: `${name} ${lastName}` })
        dispatch(setDisplayName(`${name} ${lastName}`))
        })

        const displayName = `${name} ${lastName}`
        addUserToDb(displayName)

    }catch(err){
      console.error(err)
    }
  }

  const singInWithGoogle = async() => {
    try{
      await signInWithPopup(auth , googleProvider)

      const filtredUser = users.filter((user)=>user.id === auth.currentUser.uid)
      if (filtredUser.length == 0) {
        addUserToDb();
        dispatch(setChooseActivityToggle(true))
        console.log('sheiqmna');
      } else {
        console.log('User with the given email already exists');
      }

      navigate('/Home')
    }catch(err){
      console.error(err)
    }
  }



  return(
   
      <div className='flex flex-col gap-[20px] bg-red-300  m-auto'>
        <div>Registration</div>
        <input
         type='text'
         placeholder='Name'
         onChange={(e)=>setName(e.target.value)}
         />
         <input
         type='text'
         placeholder='Lastname'
         onChange={(e)=>setLastName(e.target.value)}
         />
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
})


export default Registration