import React, { memo, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SelectedProductInfo from '../../Components/shopComponents/SelectedProductInfo';
import ProductReviews from '../../Components/shopComponents/ProductReviews';
import SimilarProducts from '../../Components/shopComponents/SimilarProducts';
import Loader from '../../Components/Loader';


const SelectedProductPage = memo(() => {
  const location = useLocation(); // Get the current URL
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Simulate a loading delay or wait for any necessary data fetching here
    setTimeout(() => {
      setLoading(false);
    }, 1000); // Adjust the delay as needed
  }, [location.pathname]); // Trigger the effect on URL path changes

  return (
    <div className='h-[100%] flex flex-col w-full px-[15px] 2xl:p-0 2xl:w-[1400px] m-auto gap-[100px] mt-[50px] xl:mt-[150px]'>
      {loading ? (
        <div className='flex w-[400px] h-[400px] m-auto justify-center items-center'>
          <Loader />
        </div>
      ) : (
        <>
          <SelectedProductInfo />
          <ProductReviews />
          <SimilarProducts />
        </>
      )}
    </div>
  );
});

export default SelectedProductPage;
