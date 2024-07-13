import React, { memo, useEffect, useState } from 'react';
import { arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, query, updateDoc, where} from 'firebase/firestore';
import ProductRaiting from './Raiting/ProductRaiting';
import useProductRating from '../../Hooks/ShopHooks/useProductRating';
import useGetSelectedProduct from '../../Hooks/ShopHooks/useGetSelectedProduct';
import { useDispatch, useSelector } from 'react-redux';
import { setReviewValue } from '../../Redux/Slices/shopFilterSlice';
import Review from './Review';
import { FaPaw } from "react-icons/fa6";



const ProductReviews = memo(() => {
  const dispatch = useDispatch()
  const {selectedProduct} = useGetSelectedProduct()

  const {averageRating,userRating,handleRatingChange , ratingsData} = useProductRating({productId:selectedProduct?.id}) 


  const {ratingValue , reviewValue} = useSelector((state) => state.shopFilterSlice)

  

  console.log(ratingsData)
  return(
 
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-[30px]  border-[1px] border-grayText rounded-standart p-[30px] lg:p-[50px]'>
      <div className=' flex flex-col gap-[30px]  '>
        <div className=' text-h4 font-extrabold leading-[30px]'>Customer Questions & Answers</div>
        {ratingsData ? 
        <>
          {ratingsData.map(review => <Review key={review.id} review={review}/>)}
        </>

        :

        <div>No Reviews</div>
        }
      </div>

      <div className=' flex flex-col  gap-[30px] '>
        <div className=' text-h4 font-extrabold leading-[30px]'>Add a review</div>

        <div className=' flex flex-col  items-start  max-h-[600px] overflow-auto'>
          <div className=' text-h6 font-bold' >Your rating *</div>
          <div className=''>
            <ProductRaiting averageRating={averageRating} userRating={userRating} handleRatingChange={handleRatingChange} />
          </div>
         
        </div>

        <div>
          <div className=' text-h6 font-bold'>Your review *</div>
          <textarea maxLength='300' className=' h-[135px] w-full resize-none rounded-standart border-[1px] border-grayText overflow-auto' draggable value={reviewValue} onChange={(e) => dispatch(setReviewValue(e.target.value))}></textarea>
        </div>

        <div>
          <button className=' flex  gap-[10px] items-center addToCartBtn hover:bg-additional transition-all duration-300' onClick={()=> handleRatingChange(ratingValue , reviewValue )}>
            <div className=' text-secondary'><FaPaw /></div>
            <div>Send a review</div>
            </button>
        </div>

      </div>
      
    </div>
  
   
  )
})


export default ProductReviews