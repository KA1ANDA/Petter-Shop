import React, { memo, useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation'

import './swiper.css';

// import required modules
import { Navigation } from 'swiper/modules';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedSlideSrc } from '../../../Redux/Slices/shopFilterSlice';

import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

const SelectedProductSlider = memo(({photoUrls}) => {
  const dispatch = useDispatch()
  const swiperRef = useRef(null);
  const {selectedSlideSrc} = useSelector(state => state.shopFilterSlice)
  const [isMobile, setIsMobile] = useState(false);

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


  const handleSlideClick = (slideIndex) => {
    // Get the src value of the clicked slide
    const clickedSlideSrc = photoUrls[slideIndex];
    
    // Set the src value in the state
    dispatch(setSelectedSlideSrc(clickedSlideSrc));

  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024); // Adjust the breakpoint as needed
    };

    // Initial check on mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  console.log(selectedSlideSrc)

  return (
    <>
    { !isMobile && 
      <button  className=' transition-all duration-300  z-50 absolute right-[45%] top-[20px]  text-h4' onClick={goPrev} >
        <IoIosArrowUp />
      </button> }
      <Swiper
        loop={true}
        direction={isMobile ? 'horizontal' : 'vertical'}
        slidesPerView={3}
        spaceBetween={30}
        navigation={isMobile ? false : { nextEl: '.next-button', prevEl: '.prev-button' }}
        modules={[Navigation]}
        ref={swiperRef}
        className="selectedProductSwiper"
      >


        {photoUrls && 
          photoUrls.map((photo , index) => <SwiperSlide key={index}>
            <img className=' object-cover'  onClick={() => handleSlideClick(index)} src={photo}/>
          </SwiperSlide>)
        }
        

       { isMobile && 
       <>
       <button  className=' transition-all duration-300 absolute top-[50%]  -rotate-90 z-50 text-h4' onClick={goPrev} >
          <IoIosArrowUp />
        </button>
       
        <button className=' transition-all duration-300 absolute top-[50%] -rotate-90 right-0 text-h4 z-50   '  onClick={goNext} >
          <IoIosArrowDown/>
        </button>
       </>
       
       
       }
      
      </Swiper>
      { !isMobile && 
          <button className=' transition-all duration-300 absolute right-[45%] text-h4 z-50 bottom-[20px]  '  onClick={goNext} >
            <IoIosArrowDown/>
          </button>}
        
    </>
  );
})

export default SelectedProductSlider
