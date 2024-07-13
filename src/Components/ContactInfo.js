import React, { memo } from 'react';
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { FaClock } from "react-icons/fa6";

const ContactInfo = memo(() => {
  
  const advantages = [
    {
      icon:<FaPhone/>,
      title:'Phone',
      info:'(913) 756-3126'
    },
    {
      icon:<MdEmail/>,
      title:'Email',
      info:'petopia@example.com'
    },
    {
      icon:<IoLocationSharp/>,
      title:'Address',
      info:'17 Parkman Place, 2122'
    },
    {
      icon:<FaClock/>,
      title:'Open Hours',
      info:'Mon - Fri: 7am - 6pm'
    }
  ]

  return(
    <div className=' grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-[60px] xl:gap-[30px] relative'>
      {advantages.map((el) => 
      <div className=' contactParent hover:border-primary transition-all duration-300 text-center border-[1px] border-lightPrimary px-[22px] pt-[54px] pb-[34px] relative flex flex-col justify-center items-center rounded-standart '>
        <div className=' contactIcon bg-lightPrimary text-h3 p-[20px]   rounded-[50%] absolute -top-10 w-fit z-20 text-primary'>  
          {el.icon}
        </div>
        <div className=' text-h4 font-bold'>{el.title}</div>
        <div className=' text-h5 font-normal'>{el.info}</div>
      </div>
    )}
    </div>
  )
})


export default ContactInfo