import React, { memo } from 'react';
import HorizontalSwiper from './Swiper/HorizontalSwiper';
import useGetSelectedProduct from '../../Hooks/ShopHooks/useGetSelectedProduct';
import useGetProducts from '../../Hooks/ShopHooks/useGetProducts';




const TopRatedProductsSlider = memo(() => {

  const {highRatedProducts} = useGetProducts({
    sortValue: undefined,
    sortDirection: undefined,
  })

  return(
    <div className=''>
      <HorizontalSwiper products={highRatedProducts} title='Popular Products'  miniTitle='OUR REVIEWS'/>
    </div>
  )
})


export default TopRatedProductsSlider