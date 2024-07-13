import React, { memo, useEffect, useState } from 'react';

import { FaShippingFast } from "react-icons/fa";



const ShippingInfoAlert = memo(({availableOnSpot}) => {


  return(
      
    <div>
       <div className={`flex text-[25px] font-bold justify-center items-center gap-[30px] ${availableOnSpot ? 'bg-green-200' : 'bg-red-200'}`}>
        <div className='text-[50px]'>
          <FaShippingFast/>
        </div>
         {availableOnSpot ?' ადგილზეა. მიწოდების ხანგრძლივობა 1-3 დღე' :' არაა ადგილზე . მიწოდების ხანგრძლივობა 7-15 დღე'  }
      </div>
    </div>
         
  )
})


export default ShippingInfoAlert