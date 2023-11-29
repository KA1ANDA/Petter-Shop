import { collection, getDocs, updateDoc } from 'firebase/firestore';
import React, {memo, useEffect, useState} from 'react';
import { db } from '../config/firebase';
import useUserDocRef from '../Hooks/useUserDocRef';
import { useNavigate } from 'react-router-dom';
import { setChooseActivityToggle } from '../Redux/Slices/logedUserSlice';
import { useDispatch } from 'react-redux';
import useGetServices from '../Hooks/useGetServices';





const ChooseActivity = memo(() => {
  const dispatch = useDispatch()

  const [wantToBeEmployed , setWantToBeEmployed] = useState(false)
  // const [servicesData, setServicesData] = useState([]);

  const servicesData = useGetServices()
  const navigate = useNavigate();

  const docRef = useUserDocRef();
  // const ServicesdocRef = collection(db, "services");



  // useEffect(() => {
  //   const fetchServices = async () => {
  //     const docSnapshots = await getDocs(ServicesdocRef);
  //     const servicesData = docSnapshots.docs.map((doc) => doc.data());
  //     setServicesData(servicesData);
  //   };
  
  //   fetchServices();

  // }, []);


  const setActivity = (el) => {
    if(wantToBeEmployed){
      updateDoc(docRef, { 
        activity:el,
        about:'',
        location:'',
        phoneNumber:null,
        readyToWork:false,
        salary: {
          thirtyMin:null,
          fortyfiveMin:null,
          hour:null,
        },
        workDates: [
          {
            name:'Monday',
            isFree:false,
          },
          {
            name:'Tuesday',
            isFree:false,
          },
          {
            name:'Wednesday',
            isFree:false,
          },
          {
            name:'Thursday',
            isFree:false,
          },
          {
            name:'Friday',
            isFree:false,
          },
          {
            name:'Saturday',
            isFree:false,
          },
          {
            name:'Sunday',
            isFree:false,
          }
        ]
      });
    }else{
      updateDoc(docRef, {activity:'searching'}) 
    }
    dispatch(setChooseActivityToggle(false))
    navigate('/')
  }

  console.log(servicesData)

 

  return(
    <div className=' absolute top-0 bottom-0 left-0 right-0 bg-[rgba(9,9,9,0.82)] flex items-center justify-center'>
      <div className={wantToBeEmployed ? 'bg-white w-[30%] rounded-[20px]' :'bg-white w-[50%] h-[50%] grid grid-cols-2 rounded-[20px] transition-all'}>
        {wantToBeEmployed ? 
         
          <ul className='text-[30px]  flex flex-col gap-[30px] p-[40px]'>
            {servicesData?.map((el , index) => (
              <li onClick={() => setActivity(el.service)} className='border-[5px] rounded-[20px] p-[10px] cursor-pointer hover:border-black hover:scale-110 transition-all' key={index}>{el.service}</li>
            ))}
          </ul>
          
          :
          <>
            <div onClick={setActivity} className='bg-red-200 flex flex-col justify-center items-center gap-[20px] text-[25px] rounded-[20px] cursor-pointer'>
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