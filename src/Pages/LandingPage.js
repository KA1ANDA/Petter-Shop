import React, { memo } from 'react';
import Services from '../Components/Services';




const LandingPage = memo(() => {
 

  return(
    <div className='bg-orange-300 h-[100%] flex flex-col gap-[160px]'>
  
      <Services />
    </div>
  )
})


export default LandingPage