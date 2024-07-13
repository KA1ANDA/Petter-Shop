import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import React, {memo, useEffect, useState} from 'react';
import { auth, db } from '../config/firebase';
import useUserDocRef from '../Hooks/useUserDocRef';
import { useNavigate } from 'react-router-dom';
import { setChooseActivityToggle } from '../Redux/Slices/logedUserSlice';
import { useDispatch } from 'react-redux';
import useGetServices from '../Hooks/useGetServices';
import { walking } from '../Variables/profileSetUpFormInfo';
import ProfileSetUpForm from './ProfileSetUpForm';
import useGetUserInfo from '../Hooks/useGetUserInfo';





const ChooseActivity = memo(() => {
  const dispatch = useDispatch()
  

  const [wantToBeEmployed , setWantToBeEmployed] = useState(false)
  const [form , setForm] = useState(false)

  const userData = useGetUserInfo()
  const servicesData = useGetServices()
  const navigate = useNavigate();

  // const docRef = useUserDocRef();
 
  const userDocRef = doc(db, 'users', auth.currentUser?.uid);


  

  const setActivity = (el) => {

    if(userDocRef){
      if (el !== 'searching'){
        setForm(true)

        updateDoc(userDocRef,{
          about:'',
          raiting:null,
          comments:[],
        }) 
      }else{
        dispatch(setChooseActivityToggle(false))
        navigate('/Shop')
      }
      


   //id ze gadaviyvano casebi tu sajiro gaxda translklates pontshi 
      switch (el) {
        case "Pet Grooming":
            console.log("It's Monday!");
            break;
        case "Pet Taxi":
            console.log("It's Tuesday!");
            break;
        case "Pet Hotel":
            console.log("It's Wednesday!");
            break;
        case "Health & Wellness":
            console.log("It's Monday!");
            break;
        case "Walking & Sitting":
            updateDoc(userDocRef,{activity:el,walking}) 
            break;
        case "Pet Training":
            console.log("It's Wednesday!");
            break;     
        default:
          updateDoc(userDocRef, {activity:'searching'}) 
      }
    


    
    }else{
      console.log('ar mosula jer')
    }

     
   
  }

 


 

  
   if (form) {
    return (
      <div className="absolute top-0 bottom-0 left-0 right-0 bg-[rgba(9,9,9,0.82)] flex items-center justify-center">
        <ProfileSetUpForm />
      </div>
    );
  }
  

  return(
    <div className=' absolute top-0 bottom-0 left-0 right-0 bg-[rgba(9,9,9,0.82)] flex items-center justify-center'>
    
      <div className={wantToBeEmployed ? 'bg-white w-[30%] rounded-[20px]' :'bg-white w-[50%] h-[50%] grid grid-cols-2 rounded-[20px] transition-all'}>
        {wantToBeEmployed  ? 
         
          <ul className='text-[30px]  flex flex-col gap-[30px] p-[40px]'>
            {servicesData?.map((el , index) => (
              <li onClick={() => setActivity(el.service)} className='border-[5px] rounded-[20px] p-[10px] cursor-pointer hover:border-black hover:scale-110 transition-all' key={index}>{el.service}</li>
            ))}
          </ul>
          
          :
          <>
            <div onClick={() => setActivity("searching")} className='bg-red-200 flex flex-col justify-center items-center gap-[20px] text-[25px] rounded-[20px] cursor-pointer'>
              <div className='w-[200px] h-[200px] bg-purple-200 rounded-[50%] '></div>
              <div>ვეძებ მომუშავეს</div>
            </div>
            <div onClick={() => setWantToBeEmployed(true)} className='bg-green-200 flex flex-col justify-center items-center gap-[20px] text-[25px]  rounded-[20px] cursor-pointer'>
              <div className='w-[200px] h-[200px] bg-purple-400 rounded-[50%]'></div>
              <div >მსურს დასაქმება</div>
            </div>
          </>
        }
      </div>

      
    </div>
  )
})


export default ChooseActivity