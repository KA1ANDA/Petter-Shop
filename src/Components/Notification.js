import React, { memo, useEffect } from 'react';
import { setNotification } from '../Redux/Slices/logedUserSlice';
import { useDispatch } from 'react-redux';






const Notification = memo(({notification}) => {

  return(
    <div className='bg-orange-300 h-[100%] flex  justify-between  items-center '>
      <div >
        <div>დამკვეთი</div>
        <div>{notification.senderName}</div>
      </div>

      <div>
        <div>სერვისი</div>
        <div>{notification.price}</div>
      </div>

      <div>
        <div>თარიღი</div>
        <div>{notification.date}</div>
      </div>

      <div>
        <div>დრო</div>
        <div></div>
      </div>

      <div>
        <div>დამატებითი ინფო</div>
        <div>{notification.info}</div>
      </div>

      <div className='bg-green-300 m-[10px] px-[15px] rounded-[25px] hover:bg-white'>
        <button>Accept</button>
      </div>
     
    </div>
  )
})


export default Notification