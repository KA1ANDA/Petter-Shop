import React, { memo, useEffect } from 'react';
import { FaTruckFast } from "react-icons/fa6";
import { TbDiscount2 } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";
import { HiMiniShieldCheck } from "react-icons/hi2";
import benefitsDecor from './../../Components/shopComponents/Photos/benefitsDecor.png'

const OurBenefits = memo(() => {

  const advantages = [
    {
      icon:<FaTruckFast/>,
      title:'Trust & Safety',
      info:'Velit euismod in pellentesque massa placerat duis. Pellentesque habitant morbi tristique senectus'
    },
    {
      icon:<TbDiscount2/>,
      title:'Discounts',
      info:'Bibendum ut tristique et egestas quis ipsum suspendisse ultrices. Convallis tellus id interdum velit'
    },
    {
      icon:<BiSupport/>,
      title:'Support',
      info:'Leo a diam sollicitudin tempor nisl nunc mi. Magna ac placerat vestibulm lectus mauris'
    },
    {
      icon:<HiMiniShieldCheck/>,
      title:'Guarantee',
      info:'Dignissim diam quis enim lobortis scelerisque fermentum dui. Turpis in eu mi bibendum neque'
    }
  ]
  
  return(
    <div className='flex flex-col mt-[160px] gap-[30px]'>
      <div className='text-h2 font-extrabold font-nunito text-center'>Why Choose Us</div>

      <div className='grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-[30px] '>
        {advantages.map((el) => 
          <div className=' rounded-standart border-2 border-lightPrimary p-[30px] flex flex-col gap-[15px] relative  overflow-hidden'>
            <div className=' text-primary text-h3 '>{el.icon}</div>
            <div className=' flex flex-col gap-[10px]'>
              <div className=' text-h4 font-extrabold '>{el.title}</div>
              <div className='z-20'>{el.info}</div>
            </div>
            
            <img className=' absolute right-0 bottom-0 z-10' src={benefitsDecor}/>
          </div>
        )}

       
      </div>
      
     
      
      
      
    </div>
  )
})
 

export default OurBenefits