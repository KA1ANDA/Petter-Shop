import React, { memo } from 'react';
import { FaPaw } from "react-icons/fa6";

const ContactUsForm = memo(() => {
  
  
  return(
    <div className='  grid grid-cols-1 lg:grid-cols-2'>
      <div className=' flex flex-col gap-[20px]'>
        <div className=' text-h2 font-extrabold'>Contact Us</div>
        <div className=' text-h5'>Massa enim nec dui nunc mattis enim ut tellus. Auctor augue mauris augue neque gravida in fermentum</div>
        <div className=' grid grid-cols-2 gap-[30px]'>
          <div>
            <div className=' text-h6 font-bold'>Name *</div>
            <input className='transition-all duration-300 hover:border-primary p-[25px] w-full rounded-standart text-h6 border-[1px] border-lightPrimary' placeholder='Type your Name'/>
          </div>
          <div>
            <div className=' text-h6 font-bold'>Email *</div>
            <input  className=' transition-all duration-300 hover:border-primary p-[25px] w-full rounded-standart text-h6 border-[1px] border-lightPrimary' placeholder='Type your Email'/>
          </div>
        </div>
        <div>
          <div className=' text-h6 font-bold'>Your message</div>
          <textarea className=' transition-all duration-300 hover:border-primary h-[130px]  p-[25px] rounded-standart text-h6 border-[1px] border-lightPrimary w-full resize-none' placeholder='Type your message'></textarea>
        </div>
        <button className='addToCartBtn w-full justify-center text-center sm:w-fit flex gap-[10px]  items-center hover:bg-additional transition-all duration-300'>
          <div className='text-secondary'><FaPaw/></div>
          <div>Get Service</div>
          </button>
      </div>
      
    </div>
  )
})


export default ContactUsForm