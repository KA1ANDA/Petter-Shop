import React, { memo } from 'react';
import SelectedProductInfo from '../../Components/shopComponents/SelectedProductInfo';
import ProductReviews from '../../Components/shopComponents/ProductReviews';
import SimilarProducts from '../../Components/shopComponents/SimilarProducts';





const SelectedProductPage = memo(() => {

 

  return(
    <div className='h-[100%] flex flex-col w-full px-[15px] 2xl:p-0  2xl:w-[1400px] m-auto gap-[100px] mt-[50px]  xl:mt-[150px] '>
      <SelectedProductInfo/>
      <ProductReviews/>
      <SimilarProducts />
    </div>
  )
})


export default SelectedProductPage