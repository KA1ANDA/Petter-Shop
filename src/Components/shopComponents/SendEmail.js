import React, { memo } from 'react';
import cat from './Photos/sendEmailCat.png'
import dog from './Photos/sendEmaildog.webp'
import circle from './Photos/circle.webp'
import sendEmailBg from './Photos/sendEmailBg.webp'
import BallAnimation from '../BallAnimation';


const SendEmail = memo(() => {

  

  return(
    <div className='flex flex-col px-[15px] py-[70px] md:px-0 justify-start md:justify-center md:items-center bg-no-repeat md:py-[120px]  relative bg-right-bottom overflow-hidden rounded-standart bg-primary gap-[30px] '  style={{backgroundImage: `url(${sendEmailBg})`}}>

      <div className=' w-full h-full  absolute'>
        <BallAnimation containerWidth={1400} containerHeight={500} numBalls={10} />
      </div>


      <div className=' flex flex-col gap-[15px]  text-start md:text-center  w-full md:w-[700px] z-30'>
        <div className='font-extrabold text-[36px] md:text-[40px] xl:text-h2 text-white  leading-[40px]    '>
          Get 20% Off Your First Purchase When You Use Petco Credit Card
        </div>
        <div className='text-white  text-h5 font-medium '>Sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum. Ligula ullamcorper malesuada proin libero nunc consequat interdum varius sit.</div>
      </div>
     
      <div className='flex flex-col w-full  sm:flex-row sm:w-fit justify-center gap-[30px] z-40  '>
        <input placeholder='Type your Email' className='sm:max-w-[330px] rounded-standart border-2 border-[#cecece] text-h6 leading-[68px] placeholder:text-[#fbf9ff] text-[#fbf9ff]  px-[24px]  bg-transparent focus:outline-none'></input>
        <button className=' shadow p-[20px]  transition-all duration-300 font-extrabold text-h5 bg-secondary rounded-standart hover:shadow-2xl hover:-translate-y-0.5 '>Subscribe</button>
      </div>

      <img data-aos="fade-right" data-aos-duration="2500"   data-aos-delay="1000" className='hidden md:block  w-[400px] xl:w-fit absolute left-0 -bottom-10 z-20'  data-aos-once="true" src={cat}/>
      <img data-aos="fade-up" data-aos-duration="1000"   data-aos-delay="2000" data-aos-once="true" className='hidden md:block  w-[200px]  xl:w-fit z-20 absolute right-0 -bottom-10'src={dog}/>
      <img className='hidden md:block  absolute -left-20 -bottom-40  z-10
        animate-spin-slow  ' src={circle}/>


    </div>
  )
})


export default SendEmail