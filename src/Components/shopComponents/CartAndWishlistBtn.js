import React, { memo, useEffect, useState } from 'react';
import useGetSavedProducts from '../../Hooks/ShopHooks/useGetSavedProducts';
import { IoMdHeart } from 'react-icons/io';
import { FaShoppingCart } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const CartAndWishlistBtn = memo(({handleWishlistToggle , handleCartToggle, toggleMenu , setToggleMenu}) => {

  const {listItems} = useGetSavedProducts({targetArray:'shopWishlist'})
 
  return(
    <div className= {`${toggleMenu ? 'visible flex flex-col  sm:flex-row ' : 'hidden'} sm:flex gap-[20px]  `}>
              <div className='group w-full  simpleHover  flex items-center cursor-pointer  px-[16px] py-[8px] rounded-standart  border-[1px] border-grayText gap-[10px] ' onClick={() => {handleWishlistToggle() ; toggleMenu && setToggleMenu(false)} }>
                <div className='text-[20px] group-hover:text-white transition-all duration-300  text-primary '><IoMdHeart/></div>
                <div className='text-h5 font-bold'>({listItems.length} item)</div>
              </div>

              <CartButton  handleCartToggle={handleCartToggle} toggleMenu={toggleMenu} setToggleMenu={setToggleMenu}/>
  </div>  
  )
})




export default CartAndWishlistBtn




const CartButton = ({ handleCartToggle , toggleMenu , setToggleMenu}) => {

  const {listItems} = useGetSavedProducts({targetArray:'shopCart'})
  return !toggleMenu ? (
    // Handle redirect when toggleMenu is true
    <div className='group simpleHover px-[16px] py-[8px] w-full rounded-standart border-[1px] border-grayText'>
      <div className='flex cursor-pointer gap-[10px] items-center' onClick={handleCartToggle}>
        <div className='text-[20px] group-hover:text-white transition-all duration-300 text-primary'><FaShoppingCart /></div>
        <div className='text-h5 font-bold'>({listItems.length} item)</div>
      </div>
    </div>
  ) : (
    // Render NavLink for navigation when toggleMenu is false
    <NavLink to='/Cart' className='w-full'>
      <div className='group simpleHover px-[16px] py-[8px] rounded-standart border-[1px] border-grayText'>
        <div className='flex cursor-pointer gap-[10px] items-center ' onClick={() => setToggleMenu(false)} >
          <div className='text-[20px] group-hover:text-white transition-all duration-300 text-primary'><FaShoppingCart /></div>
          <div className='text-h5 font-bold'>({listItems.length} item)</div>
        </div>
      </div>
    </NavLink>
  );
};
