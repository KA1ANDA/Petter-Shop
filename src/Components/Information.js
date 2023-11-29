import React, { memo, useEffect } from 'react';
import useGetServiceInfo from '../Hooks/useGetServiceInfo';
import Breadcrumbs from './Breadcrumbs';
import { setSelectedService } from '../Redux/Slices/servicesSlice';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';


const Information = memo(({name , description}) => {


  
  return(
    <div className='bg-orange-200 flex  items-center bg-[url("https://demo.7iquid.com/petopia/wp-content/uploads/2023/02/bg-pagetitle-services-optimized.png")]  object-cover  h-[489px] -mx-[275px] bg-center'>
      <div className='flex flex-col mx-[275px]' >
        <Breadcrumbs />
        <div className='flex flex-col'>
          <div className='text-[68px] font-bold'>{name}</div>
          <div>{description}</div>
        </div>
      </div>
      {/* <img  src='https://demo.7iquid.com/petopia/wp-content/uploads/2023/02/bg-pagetitle-services-optimized.png'/> */}
    </div>
  )
})


export default Information