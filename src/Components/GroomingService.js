import React, { memo } from 'react';
import useGetServiceInfo from '../Hooks/useGetServiceInfo';



const GroomingService = memo(() => {
  


  return(
    <div className='bg-pink-100 flex justify-center'>
      <div>
        <div className='text-[46px] font-bold'>
          Pet Grooming Service
        </div>
        <ul className='flex flex-col gap-[20px]'>
          <li className= 'before:bg-purple-700 before:p-[5px] before:content-["✓"] before:text-white before:rounded-[50%]'>Bathing - wash and fluff dry</li>
          <li className= 'before:bg-purple-700 before:p-[5px] before:content-["✓"] before:text-white before:rounded-[50%]'>Pawdicure - nail trimming and filing</li>
          <li className= 'before:bg-purple-700 before:p-[5px] before:content-["✓"] before:text-white before:rounded-[50%]'>Breed specific styling, cutting and stripping</li>
          <li className= 'before:bg-purple-700 before:p-[5px] before:content-["✓"] before:text-white before:rounded-[50%]'>De-matting and detangling</li>
        </ul>
      </div>
    </div>
  )
})


export default GroomingService