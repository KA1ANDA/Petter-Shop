import React, { memo, useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation'
// import './swiper.css';
import './horizontalSwiper.css'
// import required modules
import { Navigation } from 'swiper/modules';

import Product from '../Product';

import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";


const HorizontalSwiper = memo(({ products , miniTitle , title }) => {

  const [hideNavigation, setHideNavigation] = useState(false);


  const swiperRef = useRef(null);


  useEffect(() => {
    const handleResize = () => {
      // Update state to hide navigation on 1200px or wider screens
      setHideNavigation(window.innerWidth <= 1200);
    };

    // Add event listener to handle window resize
    window.addEventListener('resize', handleResize);

    // Initial check on component mount
    handleResize();

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  

  const goNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const goPrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };


  const breakpoints = {
    // Define responsive breakpoints
    570: { slidesPerView: 2},
    990: { slidesPerView: 3 },
    1200: { slidesPerView: 4 }
  };

  return (
    <>
    <div className=' flex justify-center md:justify-between items-center'>

      <div className=' flex flex-col  text-center md:text-start'>
        <div className='text-primary text-h6 font-bold '>{miniTitle}</div>
        <div className='text-h3  md:text-h2  font-extrabold'>{title}</div>
      </div>
      

      
      {!hideNavigation && (
      <div className="flex gap-[25px] custom-navigation text-h4 font-normal text-grayText ">
          <button  className='hover:text-primary transition-all duration-300' onClick={goPrev} >
            <FaArrowLeft />
          </button>
          <button className='hover:text-primary transition-all duration-300' onClick={goNext} >
            <FaArrowRight/>
          </button>
      </div>)}

    </div>
      

      <Swiper
        breakpoints={breakpoints} 
        spaceBetween={30}
        navigation={{ nextEl: '.next-button', prevEl: '.prev-button' }} // Add custom navigation
        modules={[Navigation]}
        className="horizontalSwiper"
        ref={swiperRef}
      >
        {products
          ? products.map((product, index) => (
              <SwiperSlide key={index}>
                <div className=' h-fit'>
                  <Product product={product} />
                </div>
               
              </SwiperSlide>
            ))
          : <div>araferi araaaaa</div>}
      </Swiper>
    </>
  );
});

export default HorizontalSwiper
