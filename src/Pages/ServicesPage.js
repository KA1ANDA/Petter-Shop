import React, { memo } from 'react';
import Information from '../Components/Information';
import Services from '../Components/Services';
import GroomingService from '../Components/GroomingService';



const ServicesPage = memo(() => {
  return(
    <div className='bg-pink-400 h-[100%] flex flex-col gap-[160px]'>
      <Information
       name='Our Services'
       description='Blandit cursus risus at ultrices. Enim sit amet venenatis urna cursus eget nunc scelerisque'/>
      <Services />
      <GroomingService />
    </div>
  )
})


export default ServicesPage