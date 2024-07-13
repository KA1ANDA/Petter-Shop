import React, { memo } from 'react';
import ShopThumbnail from '../../Components/shopComponents/ShopThumbnail';
import ByPetTypeCatgories from '../../Components/shopComponents/ByPetTypeCatgories';
import { useSelector } from 'react-redux';
import TopRatedProductsSlider from '../../Components/shopComponents/TopRatedProductsSlider';
import VerticalProductGroups from '../../Components/shopComponents/VerticalProductGroups';
import Offers from '../../Components/shopComponents/Offers';
import AboutShopSuccess from '../../Components/shopComponents/AboutShopSuccess';
import SendEmail from '../../Components/shopComponents/SendEmail';





const ShopLandingPage = memo(() => {

 

  return(
    <div className='  h-[100%] flex flex-col w-full px-[15px] 2xl:p-0  2xl:w-[1400px] m-auto gap-[160px] mt-[50px]  xl:mt-[150px]  '>

     
      
      <ShopThumbnail/>
      <AboutShopSuccess/>
      <ByPetTypeCatgories />
      <TopRatedProductsSlider/>
      <Offers/>
      <VerticalProductGroups />
      <SendEmail />
      
    </div>
  )
})


export default ShopLandingPage