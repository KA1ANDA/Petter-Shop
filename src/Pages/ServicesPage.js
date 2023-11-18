import React, { memo } from 'react';
import Information from '../Components/Information';
import Services from '../Components/Services';



const ServicesPage = memo(() => {


  return(
    <div className='bg-pink-400 h-[100%] flex flex-col gap-[160px]'>
      <Information />
      <Services />
    </div>
  )
})


export default ServicesPage