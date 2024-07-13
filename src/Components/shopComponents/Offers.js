import React, { memo } from 'react';
import bgImage from './Photos/offerImgThumbnail.jpg'
import dogOne from './Photos/offerImgDogOne.png'
import dogTwo from './Photos/offerImgDogTwo.png'
import { NavLink } from 'react-router-dom';
import useGetCategories from '../../Hooks/ShopHooks/useGetCategories';
import { BsArrowRight } from "react-icons/bs";

const Offers = memo(() => {

  const {categories} = useGetCategories()


  const clothesCategoryId = categories.find(category => category.name === 'Clothes')?.id;

  return(
    <div className=' grid grid-cols-1 lg:grid-cols-[2fr_1fr]  gap-[30px] '>
       <div  className=" px-[30px] lg:px-[60px] pt-[60px] pb-[115px] rounded-standart   bg-no-repeat  flex justify-start items-center" style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center left', // Positioning the background image at center-left
        }}>
        <div className='flex flex-col w-[100%] gap-[20px] '>
          <div className=' self-start md:self-end rounded-standart bg-primary px-[30px] py-[20px] text-[20px] xl:text-h4 font-extrabold leading-8 text-white'>Up to 40% Off</div>
          <div className='relative w-full sm:w-[300px] flex flex-col gap-[30px]'>
            <div className=' flex flex-col gap-[15px]'>
              <div className=' text-h3 md:text-h2 font-extrabold text-left leading-[46px]'>Сheck Out Our Specials</div>
              <div className=' text-h5 leading-[26px] font-normal'>Massa placerat duis ultricies lacus. Aliquet bibendum enim facilisis gravida neque convallis</div>
            </div>
            
            <NavLink to={{ pathname: '/Shop/Products', search: '?sales=true' }} ><div className='shopNowBtnLink '>
              <div className='text'>Shop Now</div>
              <div className='icon'><BsArrowRight /></div>
            </div></NavLink>        
          </div>
        </div>
        
      </div>

      <div className=' grid grid-cols-1 gap-[30px]  '>
        <div className='bg-secondary grid grid-cols-2 items-center rounded-standart  relative pt-[52px] pl-[30px] pb-[41px]'>
         
          <div className='flex flex-col  gap-[20px]'>
            <div className='text-offerText font-extrabold leading-[36px] w-[230px] '>Luxury Fashion Collection</div>
            <NavLink to={{ pathname: '/Shop/Products', search: `?category=${clothesCategoryId}` }}>
            <div className='shopNowBtnLink '>
              <div className='text'>Shop Now</div>
              <div className='icon'><BsArrowRight /></div>
            </div>
            </NavLink>
          </div> 
          
         
    
          <img className='absolute right-0 bottom-0 w-[150px] sm:w-fit lg:w-[150px] xl:w-fit '  src={dogTwo}/> 
        </div>

        <div className='bg-secondary grid grid-cols-2 items-center rounded-standart relative pt-[52px] pl-[30px] pb-[41px]'>
          <div className='flex flex-col  gap-[20px]'>
            <div className='text-offerText font-extrabold leading-[36px] w-[200px]'>Shop What’s Trending</div>
            <div className='shopNowBtnLink '>
              <div className='text'>Shop Now</div>
              <div className='icon'><BsArrowRight /></div>
            </div>
          </div>      
          <img className='absolute right-0 bottom-0 w-[140px] sm:w-fit lg:w-[140px] xl:w-fit' src={dogOne}/> 
        </div>
      </div>
    </div>
  )
})


export default Offers