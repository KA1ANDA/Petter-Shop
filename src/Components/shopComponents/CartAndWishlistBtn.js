import React, { memo, useEffect, useState } from 'react';
import useGetSavedProducts from '../../Hooks/ShopHooks/useGetSavedProducts';
import { IoMdHeart } from 'react-icons/io';
import { FaShoppingCart } from 'react-icons/fa';

const CartAndWishlistBtn = memo(({handleWishlistToggle , handleCartToggle}) => {

  const {listItems} = useGetSavedProducts({targetArray:'shopWishlist'})
 
  return(
    <div className=' hidden sm:flex gap-[20px]'>
              <div className='group  simpleHover  flex items-center cursor-pointer  px-[16px] py-[8px] rounded-standart  border-[1px] border-grayText gap-[10px] ' onClick={handleWishlistToggle}>
                <div className='text-[20px] group-hover:text-white transition-all duration-300  text-primary '><IoMdHeart/></div>
                <div className='text-h5 font-bold'>({listItems.length} item)</div>
              </div>

              <CartButton  handleCartToggle={handleCartToggle}/>
  </div>  
  )
})




export default CartAndWishlistBtn




const CartButton = ({ handleCartToggle }) => {

  const {listItems} = useGetSavedProducts({targetArray:'shopCart'})
  return (
    <div className='group simpleHover px-[16px] py-[8px] rounded-standart border-[1px] border-grayText'>
      <div className='flex cursor-pointer gap-[10px] items-center' onClick={handleCartToggle}>
        <div className='text-[20px] group-hover:text-white transition-all duration-300 text-primary'><FaShoppingCart /></div>
        <div className='text-h5 font-bold'>({listItems.length} item)</div>
      </div>
    </div>
  );
};
