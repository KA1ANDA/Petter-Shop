import React, { memo, useEffect } from 'react';
import useGetServices from '../Hooks/useGetServices';
import { FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedService , setCurrentServiceURL, setServicesPage } from '../Redux/Slices/servicesSlice';
import { NavLink, useParams } from 'react-router-dom';

const Services = memo(() => {
  const dispatch = useDispatch()

  const servicesData = useGetServices()

  

  const setService = (id , name) => {
    dispatch(setSelectedService(id))
    const str = name;
    const newStr = str.replaceAll(" ", "");
    dispatch(setCurrentServiceURL(newStr))
    
  }

  useEffect(() => {
  
    localStorage.setItem('currentServiceId', ''); 
    
  },[])




  return(
    <div>
      <div className='flex flex-col justify-center items-center'>
        <div>OUR SERVICES</div>
        <div>All Pet Care Services</div>
      </div>
      <div className=' grid grid-cols-3 w-fit gap-[40px] m-auto'>
        {servicesData.map(el =>
        <div key={el.id} className='flex flex-col bg-white border border-black w-[430px] p-[40px] gap-[15px] rounded-[8px]'>
          <div className='flex items-center gap-[20px]'>
            <img src={el.photoURL}/>
            <div>{el.service}</div>
          </div>
          <div>
            {el.description}
          </div>

          
          <div className='flex items-center gap-[5px]'>
            <NavLink to={`/Services/${el.service.replaceAll(" ", "")}/${el.id}`} onClick={()=>setService(el.id , el.service)}>Get Service</NavLink>

          {/* <div onClick={()=>setService(el.id , el.service)}>Get Service</div> */}
          <FaArrowRight />
          </div>

         
        </div>)}
      </div>
    </div>
    
  )
})


export default Services