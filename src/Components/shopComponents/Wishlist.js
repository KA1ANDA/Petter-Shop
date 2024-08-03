import React, { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { HiOutlineHeart } from "react-icons/hi2";
import { IoHeartCircleSharp } from 'react-icons/io5';
import { FaShoppingBasket, FaTrash, FaShoppingCart } from "react-icons/fa";
import useGetSavedProducts from '../../Hooks/ShopHooks/useGetSavedProducts';
import { setWishlistToggle } from '../../Redux/Slices/shopFilterSlice';
import useAddWishlist from '../../Hooks/ShopHooks/useAddWishlist';
import useAddToCart from '../../Hooks/ShopHooks/useAddToCart';
import useGetProductPhotos from '../../Hooks/ShopHooks/useGetProductPhotos';
import useGetProductPrice from '../../Hooks/ShopHooks/useGetProductPrice';
import Loader from '../Loader';

const Wishlist = memo(() => {
  const dispatch = useDispatch();
  const { listItems, products, handleRemoveItem, loading } = useGetSavedProducts({ targetArray: 'shopWishlist' });

  const handleWishlistCloseToggle = () => {
    dispatch(setWishlistToggle(false));
  };

  return (
    <div className='fixed bg-[rgba(9,9,9,0.82)] top-0 bottom-0 left-0 right-0 z-[9999] flex items-center justify-center'>
      <div className='bg-white rounded-standart mx-[15px] overflow-y-auto w-full lg:w-[900px] p-5 flex flex-col gap-[40px]'>
        <div onClick={handleWishlistCloseToggle} className='self-end px-[10px] text-[25px] font-semibold cursor-pointer'>X</div>
        <div className='bg-white rounded-standart max-h-[600px] overflow-y-auto p-5 flex flex-col gap-[40px]'>
          {loading ? (
            <div className="flex w-[200px] h-[200px]  m-auto  justify-center items-center">
              <Loader />
            </div>
          ) : listItems && listItems.length > 0 ? (
            products.map((wishlistItem) => (
              <Item key={wishlistItem.id} product={wishlistItem} onRemove={handleRemoveItem} />
            ))
          ) : (
            <div className='font-extrabold flex flex-col justify-center items-center gap-[20px] text-primary bg-lightPrimary rounded-standart p-[20px] sm:p-[50px] border-2 border-primary'>
              <div className='text-[120px] text-primary flex justify-center'>
                <HiOutlineHeart />
              </div>
              <div className='text-h5 sm:text-h2'>Wishlist is empty</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default Wishlist;

const Item = ({ product, onRemove }) => {
  const { photoUrls } = useGetProductPhotos({ product });
  const { handleWishlistClick } = useAddWishlist({ product });
  const { handleAddToCart, isInCart } = useAddToCart({ product });
  const { price, onSalePrice } = useGetProductPrice({ product });

  const getPriceDisplay = () => (price === 0 ? (onSalePrice === 0 ? price : onSalePrice) : (onSalePrice !== 0 ? onSalePrice : price));

  return (
    <div className='border-black bg-lightPrimary shadow-lg shadow-black border-2 rounded-standart p-5 flex justify-center flex-col sm:grid lg:grid-cols-3 sm:grid-cols-[2fr,2fr,1fr] gap-[40px] relative'>
      <div className='absolute text-h1 text-primary -top-7 -left-4 bg-white rounded-[50%] w-fit shadow-md shadow-black'>
        <IoHeartCircleSharp />
      </div>

      <div className='flex items-center justify-center'>
        {photoUrls.length > 0 ? (
          <img className='border-2 border-primary shadow-sm shadow-black w-[150px] h-[150px] flex rounded-standart' src={photoUrls[0]} alt={product.title} />
        ) : (
          <div className='border-2 border-primary shadow-sm shadow-black w-[150px] h-[150px] flex rounded-standart bg-grayText animate-pulse'></div>
        )}
      </div>

      <div className='flex flex-col justify-center items-center sm:justify-normal sm:items-start'>
        <div className='font-extrabold text-h4'>{product.title}</div>
        <div className='font-bold text-h5'>${getPriceDisplay()}</div>
      </div>

      <div className='gap-[10px] font-bold text-h4 flex flex-col justify-between'>
        {isInCart ? (
          <div className='flex gap-[15px] items-center cursor-pointer bg-[#98FB98] justify-center shadow-black shadow-md hover:shadow-lg hover:shadow-black hover:scale-110 transition-all duration-300 text-white p-3 rounded-standart'>
            <NavLink to='/Cart' className='hidden lg:block'>
              <div>View Cart</div>
            </NavLink>
            <div><FaShoppingBasket /></div>
          </div>
        ) : (
          <div onClick={handleAddToCart} className='text-white flex gap-[15px] justify-center shadow-black shadow-md hover:shadow-lg hover:shadow-black hover:scale-110 transition-all duration-300 items-center cursor-pointer bg-primary p-3 rounded-standart'>
            <div className='hidden lg:block w-fit'>Add To Cart</div>
            <div><FaShoppingCart /></div>
          </div>
        )}

        <div onClick={() => { handleWishlistClick(); onRemove(product.id); }} className='shadow-black hover:shadow-lg hover:shadow-black shadow-md hover:scale-110 transition-all duration-300 text-white flex gap-[15px] items-center justify-center text-center cursor-pointer p-3 rounded-standart bg-additional'>
          <div className='hidden lg:block w-fit'>DELETE</div>
          <div><FaTrash /></div>
        </div>
      </div>
    </div>
  );
};
