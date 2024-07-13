import React, { memo } from 'react';
import thumbnailPhoto from './Photos/thumbnail.webp'
import { FaTruckFast } from "react-icons/fa6";
import { TbDiscount2 } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";
import { HiMiniShieldCheck } from "react-icons/hi2";
import { NavLink } from 'react-router-dom';
import { FaPaw } from "react-icons/fa6";
import BallAnimation from '../BallAnimation';

const advantages = [
  {
    icon:<FaTruckFast/>,
    title:'Trust & Safety',
  },
  {
    icon:<TbDiscount2/>,
    title:'Discounts',
  },
  {
    icon:<BiSupport/>,
    title:'Support',
  },
  {
    icon:<HiMiniShieldCheck/>,
    title:'Guarantee',
  }
]

const ShopThumbnail = memo(() => {
 

  return(
    <div className='  items-center relative  '>

      <div className='grid grid-cols-1  lg:grid-cols-2 '>
        <div className='flex items-center justify-center order-1 lg:order-2 '>
          <img src={thumbnailPhoto} className='imageBounce'/>
        </div>

        <div className='flex flex-col justify-normal gap-[50px] xl:gap-0 xl:justify-between  order-2 lg:order-1 '>
          <div className='flex flex-col gap-[13px]'>
            <div className=' text-primary text-h6 font-bold'>WE CARE FOR YOUR PETS</div>
            <div className=' text-h3 leading-[50px] md:text-h2 xl:text-h1 xl:leading-[71px] font-extrabold '>We Help You Care for Animals with Nutrition</div>
            <div className=' font-lato text-h5 font-normal'>All offers are subject to availability. Ut tortor pretium viverra suspendisse potenti nullam ac tortor vitae. Consectetur a erat nam at. Potenti nullam ac tortor vitae purus faucibus ornare.</div>
          </div>
          
          <div className='grid grid-cols-1 gap-5 md:grid-cols-2  lg:grid-cols-1 xl:grid-cols-2  xl:gap-8 '>
            {advantages.map((el) =>
            <div className='flex items-center gap-[14px]'>
              <div className='bg-bgGray py-[13px] px-[16px] rounded-standart text-primary text-h3 simpleHover border-2 border-[#EBE5F7]'>{el.icon}</div>
              <div className='flex flex-col items-start justify-center bg-'>
                <div className=' text-h4 font-bold'>{el.title}</div>
                <div className=' font-lato'>ragaca texti</div>
              </div>
              
            </div>
            )}
          </div>

          <div className='  w-full md:w-auto    md:self-start  '>   
            <NavLink to='Products'>
              <div className=' w-full flex gap-[10px] items-center justify-center transition-all duration-300 hover:bg-additional addToCartBtn  '>
                <div className=' text-secondary'>
                  <FaPaw />
                </div>
                ALL PRODUCTS
              </div>
            </NavLink>
          </div>
        </div>
      </div>

       

     
      
      

    </div>
  )
})


export default ShopThumbnail