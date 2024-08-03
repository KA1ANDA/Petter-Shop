import React, { memo, useEffect, useState } from 'react';

import { FaInfoCircle, FaShippingFast } from "react-icons/fa";



const ShippingInfoAlert = memo(({availableOnSpot}) => {


  return(
      
    <div>
       <div className={` cursor-pointer flex text-h6 text-primary  underline font-bold  items-center gap-[10px] ${availableOnSpot ? 'bg-green-200' : 'bg-red-200'}`}>
        <div className='text-h3'>
          <FaShippingFast/>
        </div>
         {availableOnSpot ?' მიწოდების ხანგრძლივობა 1-3 დღე' :'  მიწოდების ხანგრძლივობა 7-15 დღე'  }
         <FaInfoCircle />
      </div>
    </div>
         
  )
})


export default ShippingInfoAlert