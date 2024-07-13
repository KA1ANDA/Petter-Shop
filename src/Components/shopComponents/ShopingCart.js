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







const ShopingCart = memo(() => {
 
  const [checkoutToggle , setCheckoutToggle] = useState(false)

  const {listItems , products , handleRemoveItem , subtotal} = useGetSavedProducts({targetArray:'shopCart'})

  
  return(
    <div className='  flex flex-col absolute gap-[30px]  top-20  p-[30px] bg-white rounded-standart border-[1px] border-grayText w-[350px]'>
     {listItems && listItems.length > 0 ? (
          products.map((cartItem)=> 
          <CartItem product={cartItem}  onRemove={handleRemoveItem} isOpened={false}/> 
        )
        ) : 
        <div>NO ITEMS FOUND</div>
        }

      <div className=' flex justify-between '>
        <div className=' text-h6 text-grayText '> Subtotal:</div>
        <div className=' text-primary text-h5 font-extrabold'>${subtotal}</div>
       
      </div>

      <div className=' flex flex-col text-center gap-[20px]'>
        <NavLink to='/Cart'><div className=' border-2 border-lightPrimary text-primary transition-all duration-300 hover:bg-primary hover:text-white text-h5 font-extrabold rounded-standart p-[10px]'>View cart</div></NavLink>
        <div onClick={() => setCheckoutToggle(true)} className=' border-2 border-lightPrimary text-primary transition-all duration-300 hover:bg-primary hover:text-white text-h5 font-extrabold rounded-standart p-[10px] cursor-pointer' >Checkout</div>
      </div>

      {checkoutToggle && 
        <Checkout />
      }
    </div>
  )
})


export default ShopingCart


