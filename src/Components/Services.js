import React, { memo } from 'react';
import useGetServices from '../Hooks/useGetServices';
import { FaArrowRight } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { setSelectedService } from '../Redux/Slices/servicesSlice';
import { NavLink } from 'react-router-dom';

const Services = memo(() => {
  const dispatch = useDispatch()
  
  const servicesData = useGetServices()
  

  const setService = (id) => {
    dispatch(setSelectedService(id))
  }

  return(
    <div>
      <div className='flex flex-col justify-center items-center'>
        <div>OUR SERVICES</div>
        <div>All Pet Care Services</div>
      </div>
      <div className=' grid grid-cols-3 w-fit gap-[40px] m-auto'>
        {servicesData.map(el =>
        <div className='flex flex-col bg-white border border-black w-[430px] p-[40px] gap-[15px] rounded-[8px]'>
          <div className='flex items-center gap-[20px]'>
            <img src={el.photoURL}/>
            <div>{el.service}</div>
          </div>
          <div>
            {el.description}
          </div>

          
          <div className='flex items-center gap-[5px]'>
            {/* <NavLink to='/Services' onClick={()=>setService(el.id)}>Get Service</NavLink> */}
          <div onClick={()=>setService(el.id)}>Get Service</div>
          <FaArrowRight />
          </div>

         
        </div>)}
      </div>
    </div>
    
  )
})


export default Services