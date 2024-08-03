import React, { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setReviewValue, setRatingValue } from '../../Redux/Slices/shopFilterSlice';
import ProductRaiting from './Raiting/ProductRaiting';
import useProductRating from '../../Hooks/ShopHooks/useProductRating';
import useGetSelectedProduct from '../../Hooks/ShopHooks/useGetSelectedProduct';
import Review from './Review';
import { FaPaw } from "react-icons/fa6";
import { MdReviews } from 'react-icons/md';
import Loader from '../Loader';
import { setLogInToggle } from '../../Redux/Slices/logedUserSlice';

const ProductReviews = memo(() => {
  const dispatch = useDispatch();
  const { selectedProduct } = useGetSelectedProduct();

  const {isLoged} = useSelector(state => state.logedUserSlice)
  const { averageRating, userRating, handleRatingChange, ratingsData, loading } = useProductRating({ productId: selectedProduct?.id });

  const { ratingValue, reviewValue } = useSelector((state) => state.shopFilterSlice);
  const [errorMessage, setErrorMessage] = useState('');

  const handleReviewSubmit = () => {
    if (!isLoged) {
      return dispatch(setLogInToggle(true))
   };
    if (ratingValue > 0) {
      handleRatingChange(ratingValue, reviewValue);
      setErrorMessage(''); // Clear error message if validation passes
    } else {
      setErrorMessage('Rating cannot be 0. Please select a rating.');
    }
  };

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-[30px] border-[1px] border-grayText rounded-standart p-[30px] lg:p-[50px] shadow-lg shadow-black'>
      <div className='flex flex-col gap-[30px] '>
        <div className='text-h4 font-extrabold leading-[30px]'>Customer Questions & Answers</div>
        {loading ? (
          <div className='flex w-[200px] h-[200px] m-auto justify-center items-center'>
            <Loader />
          </div>
        ) : ratingsData.length > 0 ? (
          <div className='flex flex-col gap-[30px] max-h-[400px] p-[10px] overflow-y-auto'>
            {ratingsData.map(review => <Review key={review.id} review={review} />)}
          </div>
        ) : (
          !loading && !ratingsData.length > 0 ? (
            <div className='flex flex-col gap-[10px] m-auto justify-center items-center'>
              <div className='text-primary border-2 border-primary shadow-md shadow-black p-[20px] rounded-[50%] text-h2'>
                <MdReviews />
              </div>
              <div className='font-bold text-h4 text-primary'>No Reviews Found</div>
            </div>
          ):
          <div className='flex w-[200px] h-[200px] m-auto justify-center items-center'>
            <Loader />
          </div>
        )}
      </div>

      <div className='flex flex-col gap-[30px]'>
        <div className='text-h4 font-extrabold leading-[30px]'>Add a review</div>

        <div className='flex flex-col items-start max-h-[600px] overflow-auto'>
          <div className='text-h6 font-bold'>Your rating *</div>
          <div className=''>
            <ProductRaiting userRating={userRating} handleRatingChange={handleRatingChange} />
          </div>
        </div>

        {errorMessage && <div className=' text-additional font-bold'>{errorMessage}</div>}

        <div>
          <div className='text-h6 font-bold'>Your review *</div>
          <textarea
            maxLength='300'
            className='h-[135px] w-full resize-none rounded-standart border-[1px] border-grayText overflow-auto'
            draggable
            value={reviewValue}
            onChange={(e) => dispatch(setReviewValue(e.target.value))}
          ></textarea>
        </div>

        <div>
          <button
            className='flex gap-[10px] items-center addToCartBtn hover:bg-additional transition-all duration-300'
            onClick={handleReviewSubmit}
            disabled={loading} // Disable the button while loading
          >
            <div className='text-secondary'><FaPaw /></div>
            <div>Send a review</div>
          </button>
          {loading && (
            <div className='mt-[10px] text-primary'>
              Submitting your review...
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default ProductReviews;
