import React, { memo, useEffect } from 'react';
import useGetServiceInfo from '../Hooks/useGetServiceInfo';
import Breadcrumbs from './Breadcrumbs';
import { setSelectedService } from '../Redux/Slices/servicesSlice';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';


const Information = memo(({name , description , image}) => {


  
  return(
    <div className='flex flex-col   bg-bgGray xl:my-[120px] relative'>
      <div className=' grid grid-cols-1 lg:grid-cols-2 2xl:flex w-full px-[15px] 2xl:p-0  2xl:w-[1400px] m-auto  items-center  object-cover  '>
        <div className='flex flex-col  gap-[15px] py-[157px] 2xl:py-0   ' >
          <Breadcrumbs />
          <div className='flex flex-col  gap-[18px]'>
            <div className=' text-h2 xl:text-h1  font-extrabold leading-[71px]'>{name}</div>
            <div className=' w-auto lg:w-[440px] text-h5 font-normal font-lato leading-[26px]'>{description}</div>
          </div>
        </div>

       
        <img className='hidden lg:block relative 2xl:-right-[200px] object-cover'  src={image}/>
       
        
      </div>
      <div className='w-full absolute bottom-0  '>
        <svg x1="0" y1="0" x2="100" y2="0" stroke="#7c58d3" stroke-width="0.5" stroke-dasharray="80, 100"  fill='#fff' xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1440 150"> <path class="elementor-shape-fill" d="M 0 26.1978 C 275.76 83.8152 430.707 65.0509 716.279 25.6386 C 930.422 -3.86123 1210.32 -3.98357 1439 9.18045 C 2072.34 45.9691 2201.93 62.4429 2560 26.198 V 172.199 L 0 172.199 V 26.1978 Z"> <animate repeatCount="indefinite" fill="freeze" attributeName="d" dur="10s" values="M0 25.9086C277 84.5821 433 65.736 720 25.9086C934.818 -3.9019 1214.06 -5.23669 1442 8.06597C2079 45.2421 2208 63.5007 2560 25.9088V171.91L0 171.91V25.9086Z; M0 86.3149C316 86.315 444 159.155 884 51.1554C1324 -56.8446 1320.29 34.1214 1538 70.4063C1814 116.407 2156 188.408 2560 86.315V232.317L0 232.316V86.3149Z; M0 53.6584C158 11.0001 213 0 363 0C513 0 855.555 115.001 1154 115.001C1440 115.001 1626 -38.0004 2560 53.6585V199.66L0 199.66V53.6584Z; M0 25.9086C277 84.5821 433 65.736 720 25.9086C934.818 -3.9019 1214.06 -5.23669 1442 8.06597C2079 45.2421 2208 63.5007 2560 25.9088V171.91L0 171.91V25.9086Z"> </animate> </path> </svg>
      </div>
     
     
      
    </div>
  )
})
 

export default Information