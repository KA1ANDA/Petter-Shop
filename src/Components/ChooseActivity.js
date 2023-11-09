import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import React, {memo, useEffect, useRef, useState} from 'react';
import { db } from '../config/firebase';
import useUserDocRef from '../Hooks/useUserDocRef';
import { useNavigate } from 'react-router-dom';
import { setChooseActivityToggle } from '../Redux/Slices/logedUserSlice';
import { useDispatch } from 'react-redux';





const ChooseActivity = memo(() => {
  const dispatch = useDispatch()

  const [wantToBeEmployed , setWantToBeEmployed] = useState(false)
  const [servicesData, setServicesData] = useState([]);
  const navigate = useNavigate();

  const docRef = useUserDocRef();
  const serviceRef = useRef(null)
  const ServicesdocRef = doc(db, "services", "an9my6FMXqOCh1iHCjrW");



  useEffect(() => {
    const getServices = async () => {
    const docSnap = await getDoc(ServicesdocRef);

    if (docSnap.exists()) {
      setServicesData(docSnap.data().activities)
    } else {
      console.log("No such document!");

    }
  }

    getServices();

  }, []);


  const setActivity = () => {
    if(wantToBeEmployed){
      updateDoc(docRef, {activity:serviceRef.current.textContent});
    }else{
      updateDoc(docRef, {activity:'searching'}) 
      dispatch(setChooseActivityToggle(false))
      navigate('/Home')
    }
  }

  console.log(wantToBeEmployed)

 

  return(
    <div className=' absolute top-0 bottom-0 left-0 right-0 bg-[rgba(9,9,9,0.82)] flex items-center justify-center'>
      <div className='bg-white w-[50%] h-[50%] grid grid-cols-2 rounded-[20px]'>
        {wantToBeEmployed ? 
          <div>
            <ul>
              {servicesData?.map((el) => (
                <li ref={serviceRef}>{el}</li>
              ))}
            </ul>
          </div>
          :
          <>
            <div onClick={setActivity} className='bg-red-200 flex flex-col justify-center items-center gap-[20px] text-[25px] rounded-[20px] cursor-pointer'>
              <div className='w-[200px] h-[200px] bg-purple-200 rounded-[50%] '></div>
              <div>ვეძებ მომუშავეს</div>
            </div>
            <div className='bg-green-200 flex flex-col justify-center items-center gap-[20px] text-[25px]  rounded-[20px]'>
              <div className='w-[200px] h-[200px] bg-purple-400 rounded-[50%]'></div>
              <div onClick={() => setWantToBeEmployed(true)}>მსურს დასაქმება</div>
            </div>
          </>
        }
      </div>
    </div>
  )
})


export default ChooseActivity