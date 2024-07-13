import React, { memo } from 'react';
import HorizontalSwiper from './Swiper/HorizontalSwiper';
import useGetSelectedProduct from '../../Hooks/ShopHooks/useGetSelectedProduct';




const SimilarProducts = memo(() => {

  const {similarProducts} = useGetSelectedProduct()

  return(
    <div className=''>
      <HorizontalSwiper products={similarProducts} title='Similar Products'  miniTitle=''/>
    </div>
  )
})


export default SimilarProducts