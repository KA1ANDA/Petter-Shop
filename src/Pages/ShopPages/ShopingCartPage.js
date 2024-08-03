import React, { memo, useState } from 'react';
import CartItem from '../../Components/shopComponents/CartItem';
import useGetSavedProducts from '../../Hooks/ShopHooks/useGetSavedProducts';
import { FaPaw } from "react-icons/fa6";
import Checkout from '../../Components/shopComponents/Checkout';
import { IoIosCart } from 'react-icons/io';
import Loader from '../../Components/Loader';


const ShopingCartPage = memo(() => {
  const { listItems, products, handleRemoveItem, subtotal, loading } = useGetSavedProducts({ targetArray: 'shopCart' });
  const [checkoutToggle, setCheckoutToggle] = useState(false);

  return (
    <div className='flex flex-col gap-[35px] w-full px-[15px] 2xl:p-0 2xl:w-[1400px] m-auto mt-[50px] xl:mt-[150px]'>
      <div className='text-h3 sm:text-h2 lg:text-h1 font-extrabold'>Your Cart</div>
      <div className='hidden lg:grid grid-cols-6 justify-between text-h6 font-bold text-grayText border-b-[1px] pb-[35px] border-grayText'>
        <div className=''></div>
        <div className='text-center'>PRODUCT</div>
        <div className='text-center'>SIZE</div>
        <div className='text-center'>PRICE</div>
        <div className='text-center'>QUANTITY</div>
        <div className='text-center'>TOTAL</div>
      </div>
      {loading ? (
        <div className="flex w-[100px] h-[100px]  m-auto justify-center items-center">
           <Loader />
        </div>
       
      ) : (
        listItems && listItems.length > 0 ? (
          products.map((cartItem) => 
            <CartItem key={cartItem.id} product={cartItem} onRemove={handleRemoveItem} isOpened={true} />
          )
        ) : (
          <div className='flex flex-col gap-[30px] justify-center items-center rounded-standart border-2 border-primary my-[50px] shadow-lg shadow-black bg-lightPrimary p-[50px] sm:p-[100px]'>
            <div className='text-primary border-2 border-primary shadow-md shadow-black p-[20px] rounded-[50%] text-h1'>
              <IoIosCart />
            </div>
            <div className='font-bold text-h6 sm:text-h3 text-primary'>No Items Found</div>
          </div>
        )
      )}

      <div className='grid grid-cols-1 sm:grid-cols-2'>
        <div className='order-2 lg:order-1'></div>
        <div className='order-1 lg:order-1 flex flex-col gap-[40px]'>
          <div className='flex flex-col gap-[20px]'>
            <div className='text-h3 lg:text-h2 font-extrabold'>Cart totals</div>
            <div className='grid grid-cols-2 gap-[30px] items-center'>
              <div className='text-h5 font-bold text-grayText'>Total: </div>
              <div className='text-h4 font-extrabold'>${subtotal}</div>
            </div>
          </div>
          
          <div onClick={() => setCheckoutToggle(true)} className='w-full hover:shadow-xl hover:-translate-y-[3px] hover:bg-additional transition-all duration-300 cursor-pointer items-center justify-center gap-[10px] rounded-standart bg-primary py-[20px] text-h4 font-extrabold text-white flex'>
            <div className='text-secondary'>
              <FaPaw />
            </div>
            <button disabled={!listItems.length > 0}>
              Checkout
            </button>
          </div>
        </div>
      </div>
      {checkoutToggle && <Checkout setCheckoutToggle={setCheckoutToggle} />}
    </div>
  );
});

export default ShopingCartPage;
