import React, { memo, useEffect, useState } from 'react';
import useGetProductPhotos from '../../Hooks/ShopHooks/useGetProductPhotos';
import useAddToCart from '../../Hooks/ShopHooks/useAddToCart';
import useGetProductPrice from '../../Hooks/ShopHooks/useGetProductPrice';
import { RxCross2 } from "react-icons/rx";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from 'react-router-dom';

const CartItem = memo(({ product, onRemove, isOpened }) => {

  
  const { photoUrls } = useGetProductPhotos({ product });
  const { handleAddToCart, productQuantity , updateQuantity ,additionalPrice , additionalOnSalePrice , size , color} = useAddToCart({ product });
  const [localQuantity, setLocalQuantity] = useState();



  const [productPrice , setProductPrice] = useState({
    price:0,
    onSalePrice:0
  })

  useEffect(()=>{
    const getPriceDisplay = () => {
      if (product.price === 0) {
        setProductPrice({
          price:additionalPrice,
          onSalePrice:additionalOnSalePrice
        })
        // return additionalOnSalePrice === 0 ? additionalPrice : additionalOnSalePrice;
      } else {
        setProductPrice({
          price:product.price,
          onSalePrice:product.onSalePrice
        })
        // return product.onSalePrice !== 0 ? product.onSalePrice : product.price;
      }
    };


    getPriceDisplay()
  },[additionalOnSalePrice , additionalPrice])

  useEffect(() => {
    setLocalQuantity(productQuantity);
  }, [productQuantity]);

  const handleLocalQuantityChange = (newQuantity) => {
    setLocalQuantity(newQuantity);
    // handleQuantity(newQuantity);
  };


  // const getPriceDisplay = () => {
  //   if (product.price === 0) {
  //     setProductPrice({
  //       price:additionalPrice,
  //       onSalePrice:additionalOnSalePrice
  //     })
  //     // return additionalOnSalePrice === 0 ? additionalPrice : additionalOnSalePrice;
  //   } else {
  //     setProductPrice({
  //       price:product.onSalePrice,
  //       onSalePrice:product.price
  //     })
  //     // return product.onSalePrice !== 0 ? product.onSalePrice : product.price;
  //   }
  // };

  // const {price , onSalePrice } =useGetProductPrice({product})
 
  const handleQuantityIncrement = () => {
    setLocalQuantity(prevQuantity => prevQuantity + 1);
 
  }
  
  const handleQuantityDecrement = () => {
    if (localQuantity > 1) {
      setLocalQuantity(prevQuantity => prevQuantity - 1);
   

    }
  }
 
  console.log(productPrice)

  return (
    <div className='flex  justify-between text-h4 font-extrabold '>
      {isOpened ? (
        <div className='grid gap-[30px] lg:gap-0 grid-cols-1 lg:grid-cols-6  w-full  items-center border-b-[1px] pb-[35px] border-grayText  '>
          <div onClick={() => { handleAddToCart(); onRemove(product.id); }} className='w-full cursor-pointer flex justify-center text-center   text-primary bg-lightPrimary rounded-standart  lg:w-fit p-[5px] text-h3 lg:text-h4 simpleHover'>
            <RxCross2 />
          </div>
          <Link to={`/Products/${product.id}`}>
            <div className='flex items-center bg-white max-w-[480px] gap-[15px]'>
              {photoUrls.length > 0 ? 
              <img className='w-[100px]  rounded-standart' src={photoUrls[0]} />
              :
              <div className=' h-[100px]   rounded-standart  bg-grayText animate-pulse  '></div>
              }
              
              <div className=' flex flex-col gap-[5px]'>
                <div className=' text-primary'>{product.title}</div>
                {color && 
                  <div className=' text-h5 font-normal font-lato'>
                    <div>color : {color.name}</div>
                  </div>
                }
              </div>
            
            </div>
          </Link>
          
          
          <div className=' flex justify-between items-center '>
            <div className='block lg:hidden text-h6 font-bold text-grayText'>SIZE</div>
            <div className=' m-0 lg:m-auto'>{size}</div>
          </div>
          
          
          {/* <div>${getPriceDisplay()}</div> */}

          <div className='flex gap-[10px] justify-between items-center'>
            <div className='block lg:hidden text-h6 font-bold text-grayText'>PRICE</div>
            <div className='flex gap-[15px] m-0 lg:m-auto'>
              <div className={`${!productPrice.onSalePrice && 'hidden' } order-1`}>${productPrice.onSalePrice}</div>
              <div className={`${productPrice.onSalePrice && 'text-grayText line-through'}`}>${productPrice.price}</div>
            </div>        
          </div>

          {/* <div>
            <input
              type='number'
              value={localQuantity}
              onChange={(e) => handleLocalQuantityChange(parseInt(e.target.value))}
            />
          </div> */}

            <div className='flex gap-[17px] items-center justify-between  '>
              <div className='block lg:hidden text-h6 font-bold text-grayText'>QUANTITY</div>
              <div className='flex gap-[20px] items-center m-0 lg:m-auto'>
                <div className=' text-h5 font-bold gap-[17px]'>Qty:</div>
                  <div className=' flex  items-center rounded-standart border-2 border-grayText px-[10px] '>
                    <input className=' rounded-standart text-center py-[20px]  w-[50px] text-[20px] font-extrabold' type='number' value={localQuantity}  readOnly/>
                    <div className=' flex flex-col gap-[10px]'>
                      <div className=' cursor-pointer' onClick={handleQuantityIncrement}><IoIosArrowUp /></div>
                      <div  className=' cursor-pointer' onClick={handleQuantityDecrement}><IoIosArrowDown /></div>
                    </div>
                </div>
              </div>
              
              
            </div>
          
          
          
          {/* <div>${getPriceDisplay()*localQuantity}</div> */}
          <div className='flex  justify-between items-center'>
            <div className='block lg:hidden text-h6 font-bold text-grayText'>TOTAL</div>
            <div className='m-0 lg:m-auto'>${(productPrice.onSalePrice ? productPrice.onSalePrice : productPrice.price) * localQuantity}</div>
          </div>
          
          {productQuantity && localQuantity != productQuantity &&
            <div className=' lg:col-span-6 text-center rounded-standart bg-primary py-[20px] text-white my-[20px] hover:bg-additional transition-all duration-300 '>
              <button className='w-full' onClick={()=>updateQuantity(localQuantity)}>save changes</button>
            </div>
          }
          
        </div>
      ) : (
        <div className=' flex gap-[20px] w-full justify-between items-center '>
          
          <Link to={`Products/${product.id}`}>
            <div className='flex items-center gap-[20px]'>
              {photoUrls.length > 0  ? 
               <img className='w-[90px] rounded-standart ' src={photoUrls[0]} />
                :
                <div className=' h-[90px] w-[90px]  rounded-standart  bg-grayText animate-pulse  '></div>
              }
           
              <div className='bg-red-300'>
                <div className=' text-h5 text-wrap  text-ellipsis overflow-hidden max-h-[100px]'>{product.title}</div>
                <div className='flex text-primary text-h6 items-center gap-[5px]'>
                  <div>{productQuantity}</div>
                  <div><RxCross2 /></div>
                  {/* <div>${getPriceDisplay()}</div> */}
                  <div className='flex gap-[10px]'>
                    <div className={`${!productPrice.onSalePrice && 'hidden' } order-1`}>${productPrice.onSalePrice}</div>
                    <div className={`${productPrice.onSalePrice && 'text-grayText line-through'}`}>${productPrice.price}</div>
                  </div>
                </div>
              </div>
              
            </div>
          </Link>
          
          <div onClick={() => { handleAddToCart(); onRemove(product.id); }} className=' text-h5 text-grayText hover:text-primary transition-all duration-300 cursor-pointer   p-[10px]'>
              <RxCross2 /> 
            </div>
        </div>
      )}
    </div>
  );
});

export default CartItem;