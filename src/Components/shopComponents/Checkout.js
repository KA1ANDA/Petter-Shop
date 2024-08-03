import React, { memo, useEffect, useState } from 'react';

import useGetSavedProducts from '../../Hooks/ShopHooks/useGetSavedProducts';
import CartItem from './CartItem';
import ShippingAddress from './ShippingAddress';
import useGetUserInfo from '../../Hooks/useGetUserInfo';
import { IoIosCart } from 'react-icons/io';
import { setCartToggle, setCheckoutToggle } from '../../Redux/Slices/shopFilterSlice';
import { useDispatch } from 'react-redux';
import Loader from '../Loader';


const Checkout = memo(() => {
  const dispatch = useDispatch()
  const userData = useGetUserInfo()
  const {listItems , products , handleRemoveItem , subtotal , loading} = useGetSavedProducts({targetArray:'shopCart'})

  const activeAddress = userData?.shippingAddress?.find((address) => address.activeAddress);

  const [toggleNewAddress , setToggleNewAddress] = useState(false)

  console.log('activeAddress:', activeAddress);
  console.log('toggleNewAddress:', toggleNewAddress);

  console.log(listItems)
  return(
    <div className='fixed top-0 bottom-0 left-0 right-0 bg-[rgba(9,9,9,0.82)]  z-[999]   overflow-hidden flex justify-center items-center '>
      <div className='grid pb-[20px] xl:pb-[0px] h-full xl:h-[950px]  grid-cols-1 overflow-y-auto xl:overflow-hidden xl:grid-cols-12 rounded-standart w-full  xl:w-[1500px]  bg-white relative'>

        <div  onClick={() => dispatch(setCheckoutToggle(false))} className='self-end text-[25px] cursor-pointer absolute top-0  right-0  px-[20px] py-[10px] font-bold '>X</div>

        <div className=' order-2 xl:order-1 mt-[50px] xl:mt-0  xl:overflow-y-auto flex  justify-between flex-col col-span-8 gap-[30px] p-[20px] sm:px-[70px]' >
          <div className=' flex  flex-col gap-[30px]  '>
            <div className=' flex flex-col gap-[20px]'>
              <div className=' font-extrabold text-h4 sm:text-h3'>Contact Informaton</div>
              <div>
                <input className='signInInput w-full' placeholder='Email' />
              </div>
            </div>
          
            {activeAddress && !toggleNewAddress ? 
              <div className=' flex flex-col gap-[30px]'>
                <div className=' font-extrabold text-h4 sm:text-h3'>Selected Shipping Address</div>
                <div className='flex flex-col justify-center rounded-standart shadow shadow-black'>
                               
                              <div className=' bg-primary text-white grid grid-cols-1 md:grid-cols-3  text-center font-bold rounded-t-standart'>
                                <div className='hidden md:block'>მიმღები</div>
                                <div>მისამართი</div>
                                <div className='hidden md:block'>ტელეფონის ნომერი</div>
                              </div>

                              <div  className=' cursor-pointer bg-lightPrimary grid grid-cols-1 md:grid-cols-3 justify-center items-center p-[10px] rounded-b-standart'>
                                <div className=' flex-col  hidden md:flex' >
                                  <div className='text-center'>{activeAddress.firstName}</div>
                                  <div className='text-center'>{activeAddress.lastName}</div>
                                </div>
                                <div className='flex flex-col text-start w-full'>
                                  <div className=' '>{activeAddress.city} , {activeAddress.address}, {activeAddress.district}</div>
                                  <div className=' '>{activeAddress.additionalAddressInfo}</div> 
                                </div>
                                <div className='text-center hidden md:block'>{activeAddress.phoneNumber}</div>       
                              </div>
                              
        
      </div>
                <div className=' bg-primary text-white font-bold p-[10px] cursor-pointerhover:bg-white hover:text-primary border-2 border-primary hover:bg-lightPrimary rounded-standart text-center cursor-pointer' onClick={() => setToggleNewAddress(true)}>ახალი მისამართის გამოყენება</div>
              </div>

              :
              <div className=' flex flex-col gap-[30px]'>
                <ShippingAddress />
                {activeAddress &&  <div  className=' bg-primary text-white font-bold p-[10px] cursor-pointerhover:bg-white hover:text-primary border-2 border-primary hover:bg-lightPrimary rounded-standart text-center cursor-pointer' onClick={() => setToggleNewAddress(false)}>შენახული მისამართის გამოყენება</div>}
              
              </div>
              
            }
          

            
            
            

            <div>
              <div className=' font-extrabold text-h4 sm:text-h3'>Additional information</div>
              <textarea className='signInInput w-full resize-none ' placeholder='Write something if needed ...'> </textarea>
            </div>
          </div>

          <div className='flex gap-[20px]  items-center'>
            <div className='addToCartBtn text-h6 sm:text-h5'>Continue to shipping</div>
            <div className=' underline text-h6 sm:text-h5 font-extrabold'>Return to cart</div>
          </div>
          
        </div>

        <div className=' mt-[50px] order-1 xl:order-2  flex  flex-col rounded-standart  mx-[20px] sm:mx-[70px] xl:m-0 xl:my-0 gap-[30px] p-[20px] sm:p-[70px]  xl:col-span-4 border border-primary lg:border-none bg-lightPrimary h-full xl:rounded-r-standart justify-between'>
          <div className='flex flex-col gap-[30px] max-h-[600px]   overflow-auto '>
          {loading ? (
              <div className="flex m-auto w-[200px] h-[200px] justify-center items-center">
                <Loader />
              </div>
            ) : (
              listItems && listItems.length > 0 ? (
                products.map((cartItem) =>
                  <CartItem key={cartItem.id} product={cartItem} onRemove={handleRemoveItem} isOpened={false} />
                )
              ) : (
                <div className='flex flex-col gap-[10px] justify-center items-center'>
                  <div className='text-primary border-2 border-primary shadow-md shadow-black p-[20px] rounded-[50%] text-h2'>
                    <IoIosCart />
                  </div>
                  <div className='font-bold text-h4 text-primary'>No Items Found</div>
                </div>
              )
            )}
          </div>
          <div className=' flex flex-col gap-[30px]'>
            <div className=' border-y-[1px]  border-black py-[20px]'>
              <div className='flex justify-between font-semibold'>
                <div>Subtotal</div>
                <div className=' font-bold'>${subtotal}</div>
              </div>
              <div className='flex justify-between font-semibold'>
                <div>Shipping</div>
                <div className=' font-bold'>5$</div>
              </div>
            </div>
            
            <div className='flex justify-between font-semibold'>
              <div>Total</div>
              <div className=' font-extrabold text-h4' >${subtotal}</div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
})


export default Checkout