import React, { memo } from 'react';
import CartItem from '../../Components/shopComponents/CartItem';
import useGetSavedProducts from '../../Hooks/ShopHooks/useGetSavedProducts';
import useAddToCart from '../../Hooks/ShopHooks/useAddToCart';
import { FaPaw } from "react-icons/fa6";




const ShopingCartPage = memo(() => {


  const {listItems , products , handleRemoveItem, subtotal } = useGetSavedProducts({targetArray:'shopCart'})

  return(
    <div className='  flex flex-col gap-[35px] w-full px-[15px] 2xl:p-0  2xl:w-[1400px] m-auto  mt-[50px]  xl:mt-[150px]   '>
      <div className=' text-h1 font-extrabold'>Your Cart</div>
      <div className=' hidden lg:grid grid-cols-6 justify-between  text-h6 font-bold text-grayText border-b-[1px] pb-[35px] border-grayText'>
        <div></div>     
        <div>PRODUCT</div>
        <div>Size</div>
        <div>PRICE</div>
        <div>QUANTITY</div>
        <div>TOTAL</div>  
      </div>
      {listItems && listItems.length > 0 ? (
          products.map((cartItem)=> 
          <CartItem product={cartItem}  onRemove={handleRemoveItem} isOpened={true}/> 
        )
        ) : 
        <div>NO ITEMS FOUND</div>
        }

      <div className='  grid grid-cols-1  sm:grid-cols-2'>
        <div className='order-2 lg:order-1'></div>
        <div className=' order-1 lg:order-1 flex flex-col gap-[40px]  '>
          <div className=' flex flex-col gap-[20px]'>
            <div className='  text-h3 lg:text-h2 font-extrabold'>Cart totals</div>
            <div className='grid grid-cols-2 gap-[30px] items-center '>
              <div className='text-h5 font-bold text-grayText'>Total: </div>
              <div className='text-h4 font-extrabold'>${subtotal}</div>
            </div>
          </div>
          
          <div className=' hover:shadow-xl hover:-translate-y-[3px] hover:bg-additional transition-all duration-300 cursor-pointer items-center justify-center gap-[10px] rounded-standart bg-primary py-[20px] text-h4 font-extrabold text-white  flex'>
            <div className=' text-secondary '>
              <FaPaw />
            </div>
            
            <div>
              Checkout
            </div>
            
            </div>
        </div>
      </div>
     
    </div>
  )
})


export default ShopingCartPage