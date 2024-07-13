import React, { memo } from 'react';
import icon1 from './Photos/icon1.webp'
import icon2 from './Photos/icon2.webp'
import icon3 from './Photos/icon3.webp'
import icon4 from './Photos/icon4.webp'
import achiveBg from './Photos/achivesbg.webp'
import BallAnimation from '../BallAnimation';

const AboutShopSuccess = memo(() => {

  const achivements = [
    {
      icon:icon1,
      number:'120+',
      title:'Sutisfide Clients'
    },
    {
      icon:icon2,
      number:'20+',
      title:'Sutisfide Clients'
    },
    {
      icon:icon3,
      number:'70+',
      title:'Sutisfide Clients'
    },
    {
      icon:icon4,
      number:'200+',
      title:'Products for pets'
    },
  ]

  return(
    <div className=' bg-[#a388e5] grid grid-cols-1 md:grid-cols-2 lg:flex gap-[30px] justify-around items-center p-[55px] lg:py-[75px] lg:px-[61px] rounded-standart w-full  bg-no-repeat relative'  style={{backgroundImage: `url(${achiveBg})` , backgroundSize: 'cover',
    backgroundPosition: 'center center', }}>

      <div className=' w-full h-full  absolute'>
        <BallAnimation containerWidth={1400} containerHeight={500} numBalls={15} />
      </div>

      {achivements.map((el , index) => 
      <div key={index} className='flex  items-startflex-row  lg:flex-col  xl:flex-row xl:items-center gap-[20px]'>
        <div>
          <img src={el.icon}/>
        </div>
        <div className='flex flex-col leading-[36px]'>
          <div className=' font-extrabold text-h2 text-white'>{el.number}</div>
          <div className='text-white font-lato text-h6 font-medium'>{el.title}</div>
        </div>
      </div>)}
    </div>
  )
})


export default AboutShopSuccess