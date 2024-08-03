import React, { memo } from 'react';
import logo from './shopComponents/Photos/logo.webp'
import { FaPhoneAlt } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";


const Footer = memo(() => {

  

  return(
    <div className=' px-[15px] 2xl:px-0 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[66px] mb-[30px] '  >
      <div className='flex flex-col gap-[30px]'>
        <img src={logo} className=' max-w-[180px]'/>
        <div className=' text-h5 font-normal leading-[26px]'>Tristique nulla aliquet enim tortor at auctor urna nunc. Massa enim nec dui nunc mattis enim ut tellus. Sed ut perspiciatis unde …</div>
        <div className=' flex gap-[20px]'>
          <div className=' text-h2 text-primary'><FaPhoneAlt/></div>
          <div>
            <div className=' text-h4 font-extrabold'>(913) 756-3126</div>
            <div className=' text-h6'>Got Questions? Call us 24/7</div>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-[30px]'>
        <div className=' text-h4 font-extrabold'>Working Hours</div>
        <div className='text-h5 leading-[26px] font-lato p-[30px] rounded-standart bg-bgGray flex flex-col gap-[23px]'>
          <div className=' flex justify-between '>
            <div>Mon – Fri:</div>
            <div className=' font-bold'>7am – 6pm</div>
          </div>

          <div className=' flex justify-between '>
            <div>Saturday:</div>
            <div className=' font-bold'>9am – 4pm</div>
          </div>

          <div className=' flex justify-between '>
            <div>Sunday:</div>
            <div className=' font-bold'>closed</div>
          </div>

        </div>
      </div>


      <div className='flex flex-col gap-[30px]'>
        <div className=' text-h4 font-extrabold'>Useful Links</div>
        <ul className=' grid grid-cols-2 text-h5 font-normal leading-[26px] list-disc  marker:text-pink gap-[18px] '>
          <li className='liHover'>Home</li>
          <li className='liHover'>About</li>
          <li className='liHover'>Services</li>
          <li className='liHover'>Shop</li>
          <li className='liHover'>FAQ</li>
          <li className='liHover'>Gallery</li>
          <li className='liHover'>Delivery</li>
          <li className='liHover'>Sales</li>
        </ul>
      </div>


      <div  className='flex flex-col gap-[30px]'>
        <div className=' text-h4 font-extrabold'>Newsletter</div>
        <div className=' flex flex-col gap-[20px]'>
          <div className=' text-h5 font-normal leading-[26px]'>Be first in the queue! Get our latest
news straight to your inbox.</div>
          <div className=' flex justify-between gap-[30px] w-full '>
            <input className=' border-2 border-gray text-gray px-[25px] py-[13px] rounded-standart w-full' placeholder='Type your Email'></input>
            <button className='  hover:bg-additional transition-all duration-300 bg-primary text-white text-h5 p-[13px] rounded-standart  fotterBtnHover'> <FaArrowRight className='icon '  /></button>
          </div>
          <div className=' flex gap-[30px] text-primary text-h4 '>
            <FaFacebookF className=' cursor-pointer transition-all duration-500 hover:text-additional' />
            <FaTwitter className=' cursor-pointer transition-all duration-500 hover:text-additional' />
            <FaInstagram className=' cursor-pointer transition-all duration-500 hover:text-additional'/>
            <FaWhatsapp className=' cursor-pointer transition-all duration-500 hover:text-additional'/>
          </div>
        </div>
      </div>

    </div>
  )
})


export default Footer