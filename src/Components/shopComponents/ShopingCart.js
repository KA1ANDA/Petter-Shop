import React, { memo, useEffect, useState } from 'react';
import { auth, db } from '../../config/firebase';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import useAddToCart from '../../Hooks/ShopHooks/useAddToCart';
import useGetSavedProducts from '../../Hooks/ShopHooks/useGetSavedProducts';
import useGetProductPhotos from '../../Hooks/ShopHooks/useGetProductPhotos';
import { NavLink } from 'react-router-dom';
import CartItem from './CartItem';
import Checkout from './Checkout.js';
import { setCheckOutToggle } from '../../Redux/Slices/logedUserSlice.js';
import { IoIosCart } from 'react-icons/io';
import Loader from '../Loader.js';
import { setCartToggle, setCheckoutToggle } from '../../Redux/Slices/shopFilterSlice.js';







const ShopingCart = memo(() => {
 
  const dispatch = useDispatch()
  

  const {listItems , products , handleRemoveItem , subtotal , loading} = useGetSavedProducts({targetArray:'shopCart'})

  
  return (
    <div className='flex shadow-lg shadow-black flex-col absolute gap-[30px] top-20 p-[30px] bg-white rounded-standart border-[1px] border-grayText w-[350px]'>
      {loading ? (
        <div className="flex w-[100px] h-[100px]  m-auto justify-center items-center">
          <Loader />
          
        </div>
      ) : (
        <>
          <div className='overflow-y-auto max-h-[400px] flex flex-col gap-[30px]'>
            {listItems && listItems.length > 0 ? (
              products.map((cartItem) => (
                <CartItem key={cartItem.id} product={cartItem} onRemove={handleRemoveItem} isOpened={false} />
              ))
            ) : (
              <div className='flex flex-col gap-[10px] justify-center items-center'>
                <div className='text-primary border-2 border-primary shadow-md shadow-black p-[20px] rounded-[50%] text-h2'>
                  <IoIosCart />
                </div>
                <div className='font-bold text-h4 text-primary'>No Items Found</div>
              </div>
            )}
          </div>

          <div className='flex justify-between'>
            <div className='text-h6 text-grayText'>Subtotal:</div>
            <div className='text-primary text-h5 font-extrabold'>${subtotal}</div>
          </div>

          <div className='flex flex-col text-center gap-[20px]'>
            <NavLink to='/Cart'>
              <div className='border-2 border-lightPrimary text-primary transition-all duration-300 hover:bg-primary hover:text-white text-h5 font-extrabold rounded-standart p-[10px]'>
                View cart
              </div>
            </NavLink>
            <button
              onClick={() => {dispatch(setCheckoutToggle(true));  dispatch(setCartToggle(false))} }
              className='border-2 border-lightPrimary text-primary transition-all duration-300 hover:bg-primary hover:text-white text-h5 font-extrabold rounded-standart p-[10px] cursor-pointer'
              disabled={listItems.length === 0}
            >
              Checkout
            </button>
          </div>

          
        </>
      )}
    </div>
  );
});


export default ShopingCart


