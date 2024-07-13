import React, { memo } from 'react';
import { IoMdHome } from 'react-icons/io';
import { MdApartment, MdOutlineWork } from 'react-icons/md';
import useGetSavedProducts from '../../Hooks/ShopHooks/useGetSavedProducts';
import CartItem from './CartItem';


const Checkout = memo(() => {

  const {listItems , products , handleRemoveItem , subtotal} = useGetSavedProducts({targetArray:'shopCart'})

  console.log(listItems)
  return(
    <div className='fixed top-0 bottom-0 left-0 right-0 bg-[rgba(9,9,9,0.82)] overflow-hidden flex justify-center items-center '>
      <div className='grid grid-cols-12 rounded-standart w-[1500px]  bg-white '>
        <div className=' flex flex-col col-span-8 gap-[30px] p-[70px]' >
          <div className=' flex flex-col gap-[20px]'>
            <div className=' font-extrabold text-h3'>Contact Informaton</div>
            <div>
              <input className='signInInput w-full' placeholder='Email' />
            </div>
          </div>
         
          <div className=' flex flex-col gap-[20px]'>
            <div className=' font-extrabold text-h3'>Shipping Address</div>
            <div className=' flex flex-col gap-[10px]'>
              <input className='signInInput w-full' placeholder='City' />
              <div className='flex gap-[10px]'>
                <input className='signInInput w-full' placeholder='First Name' />
                <input className='signInInput w-full' placeholder='Last Name' />
              </div>
              <input className='signInInput w-full' placeholder='Address' />
              <div className='flex justify-around'>
                <div className='flex flex-col gap-[10px]'>
                  <div className=' flex flex-col items-center'>
                    <div className=' text-h2 text-primary'><MdApartment /></div>         
                    <div>korpusi</div>
                  </div>
                  <input type='radio'/>
                </div>
                <div className='flex flex-col gap-[10px]'>
                  <div className=' flex flex-col items-center'>
                    <div className=' text-h2 text-primary'><IoMdHome/></div>                   
                    <div>saxli</div>
                  </div>
                  <input type='radio'/>
                </div>
                <div className='flex flex-col gap-[10px]'>
                  <div className=' flex flex-col items-center'>
                    <div className=' text-h2 text-primary'><MdOutlineWork /></div>                   
                    <div>samsaxuri</div>
                  </div>
                  <input type='radio'/>
                </div>
              </div>
              <input className='signInInput w-full' placeholder='Phone' />
            </div>
          </div>

          <div className='flex gap-[20px] items-center'>
            <div className='addToCartBtn'>Continue to shipping</div>
            <div className=' underline text-h5 font-extrabold'>Return to cart</div>
          </div>
          
        </div>
        <div className=' flex flex-col gap-[30px] p-[70px] col-span-4 bg-lightPrimary h-full rounded-r-standart'>
          <div className='flex flex-col gap-[30px] max-h-[600px] overflow-auto'>
                {listItems && listItems.length > 0 ? (
                products.map((cartItem)=> 
                <CartItem product={cartItem}  onRemove={handleRemoveItem} isOpened={false}/> 
              )
              ) : 
              <div>NO ITEMS FOUND</div>
              }
          </div>
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
  )
})


export default Checkout