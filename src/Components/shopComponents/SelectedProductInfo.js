import React, { memo, useEffect, useState } from 'react';
import useGetSelectedProduct from '../../Hooks/ShopHooks/useGetSelectedProduct';
import useGetProductPhotos from '../../Hooks/ShopHooks/useGetProductPhotos';
import useAddToCart from '../../Hooks/ShopHooks/useAddToCart';
import { auth } from '../../config/firebase';
import ProductRaiting from './Raiting/ProductRaiting';
import useProductRating from '../../Hooks/ShopHooks/useProductRating';
import AverageRating from './Raiting/AverageRating';
import { NavLink } from 'react-router-dom';
import ProductPrice from './ProductPrice';
import useGetProductPrice from '../../Hooks/ShopHooks/useGetProductPrice';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentOnSalePrice, setCurrentPrice, setOtherSaleDurations } from '../../Redux/Slices/shopFilterSlice';
import SelectedProductSlider from './Swiper/SelectedProductSlider';
import SaleTimeDuration from './SaleTimeDuration';
import ShippingInfoAlert from './ShippingInfoAlert';
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { FaPaw } from "react-icons/fa6";
import Loader from '../Loader'; // Ensure you have a Loader component

const SelectedProductInfo = memo(() => {
  const dispatch = useDispatch();
  const [x, setX] = useState();
  const [y, setY] = useState();
  const [scale, setScale] = useState();
  const { currentPrice, currentOnSalePrice, selectedSlideSrc } = useSelector(state => state.shopFilterSlice);
  const [currentColor, setCurrentColor] = useState('');
  const [availableOnSpot, setAvailableOnSpot] = useState();
  const { selectedProduct, category, subCategory, loading } = useGetSelectedProduct();
  const { photoUrls } = useGetProductPhotos({ product: selectedProduct });
  const { handleAddToCart, productQuantity, isInCart, handleProperty, quantity, handleColor, handleQuantityDecrement, handleQuantityIncrement } = useAddToCart({ product: selectedProduct });
  const { averageRating, ratingsData } = useProductRating({ productId: selectedProduct?.id });
  const [selectedSize, setSelectedSize] = useState(null);
  const [shippingInfoAlert, setShippingInfoAlert] = useState(false);

  const handleSizes = (property, additionalPrice, additionalOnSale, onSaleduration, availableOnSpot) => {
    handleProperty(property);
    dispatch(setCurrentPrice(additionalPrice));
    dispatch(setCurrentOnSalePrice(additionalOnSale));
    dispatch(setOtherSaleDurations(onSaleduration));
    setAvailableOnSpot(availableOnSpot);
  };

  useEffect(() => {
    if (selectedProduct && selectedProduct.colors) {
      setCurrentColor(selectedProduct.colors[0]?.name);
    }
  }, [selectedProduct]);

  useEffect(() => {
    if (selectedProduct && selectedProduct.sizes.length > 0) {
      setSelectedSize(selectedProduct?.sizes[0].id);
    }
  }, [selectedProduct]);

  useEffect(() => {
    dispatch(setOtherSaleDurations(''));
  }, [selectedProduct]);

  useEffect(() => {
    const productPrice = () => {
      if (selectedProduct && selectedProduct.sizes.length > 0) {
        dispatch(setCurrentPrice(selectedProduct.sizes[0].additionalPrice));
        dispatch(setCurrentOnSalePrice(selectedProduct.sizes[0].additionalOnSale));
        dispatch(setOtherSaleDurations(selectedProduct.sizes[0].onSaleduration));
        setAvailableOnSpot(selectedProduct.sizes[0].availableOnSpot);
      } else {
        dispatch(setCurrentPrice(selectedProduct.price));
        dispatch(setCurrentOnSalePrice(selectedProduct.onSalePrice));
        setAvailableOnSpot(selectedProduct.availableOnSpot);
      }
    };

    if (selectedProduct) {
      productPrice();
    }
  }, [selectedProduct]);

  const imageZoom = (e) => {
    const x = e.clientX - e.target.offsetLeft;
    const y = e.clientY - e.target.offsetTop;
    setX(x);
    setY(y);
    setScale(2);
    e.target.addEventListener('mouseleave', handleMouseLeave);
  };

  const handleMouseLeave = () => {
    setScale(1); // Reset the scale to its default value
  };

  if (loading ) {
    return <div className=' w-[400px] h-[400px] m-auto'><Loader /></div>;
  }

 
  return( 

    <>
      
      {selectedProduct && photoUrls &&  
      <div className=' grid grid-cols-1 lg:grid-cols-2 gap-[40px]   '>

        <div className=' flex flex-col lg:flex-row gap-[30px]  lg:min-h-[540px] lg:max-h-[600px] bg-white'>
          <div className=' order-2 lg:order-1 relative w-full   lg:min-w-[160px] lg:max-w-[160px] '>
            <SelectedProductSlider photoUrls={photoUrls}/>
          </div>
          <div className='order-1 lg:order-2 self-center max-w-[600px] lg:self-start xl:self-auto  overflow-hidden ' >
            
            <img src={selectedSlideSrc ? selectedSlideSrc:photoUrls[0]} className=' rounded-standart  object-cover h-[100%] w-[100%]'  onMouseMove={(e) => imageZoom(e)}  style={{ 
            transformOrigin: `${x}px ${y}px`, 
            transform: `scale(${scale})`, 
            }} />
             
          </div>
        </div>
        

        <div className='flex flex-col gap-[30px] lg:justify-between  '>
          {/* <SaleTimeDuration product={selectedProduct}/> */}
          <div className=' text-h3 lg:text-h2 font-extrabold leading-[46px]'>{selectedProduct.title}</div>
          <div className=' text-h5 font-lato font-normal leading-[26px]'>{selectedProduct.description}</div>
          <div className='flex  gap-[23px] text-h5 font-bold leading-[25px] ]'>
            <div className='flex gap-[10px]'>
              <div className='hidden sm:block'>{averageRating}</div>
              <AverageRating averageRating={averageRating}/>
            </div>
            <div>{ratingsData.length} Reviews</div>
          </div>
          {/* <div className='flex'>
            <div className={`${onSalePrice && 'text-gray-400 line-through'}`}>${price}</div>
            {onSalePrice>0 && <div>${onSalePrice}</div>}
          </div> */}
          

          <div className=' text-h3'>
            <ProductPrice  price={currentPrice} onSalePrice={currentOnSalePrice} />
          </div>
         
          
          <div className='flex flex-col sm:flex-row gap-[40px]'>
            <div className='flex gap-[17px] items-center'>
              <div className=' text-h5 font-bold gap-[17px]'>Qty:</div>
              <div className=' flex  items-center rounded-standart border-2 border-grayText px-[10px] '>
                <input className=' rounded-standart text-center py-[20px]  w-[50px] text-[20px] font-extrabold' type='number' value={quantity}  readOnly/>
                <div className=' flex flex-col gap-[10px]'>
                  <div className=' cursor-pointer' onClick={handleQuantityIncrement}><IoIosArrowUp /></div>
                  <div  className=' cursor-pointer' onClick={handleQuantityDecrement}><IoIosArrowDown /></div>
                </div>
              </div>

              
              
            </div>
            <div className=' '>
              {isInCart ? 
              <div className='flex flex-col sm:flex-row gap-[20px]'>
                <NavLink to='/Cart'><div className=' text-center  cursor-pointer addToCartBtn'>View cart</div></NavLink>
                <div onClick={handleAddToCart} className=' text-center  bg-additional text-[20px] leading-[30px] p-[20px] cursor-pointer font-nunito rounded-standart font-extrabold text-white'>Remove from cart</div>
              </div>
              :
              <div className='addToCartBtn flex  justify-center gap-[10px] items-center' onClick={handleAddToCart}>
                <div className=' text-secondary'><FaPaw /></div>
                <div>Add to cart</div>
              </div>
              }
            </div>
          </div>

          <div className=' relative' onClick={() => setShippingInfoAlert(!shippingInfoAlert)}>
            <ShippingInfoAlert availableOnSpot={availableOnSpot}/>
            {shippingInfoAlert && <div className=' text-primary font-extrabold px-[35px] py-[20px] z-10 absolute  shadow-md shadow-black bg-lightPrimary rounded-standart '>
              შიპინგის შესახებ ინფორმაცია :
              <ul className=' list-disc'>
                <li>1-3 დღე - ნიშნავს პროდუქტი არის ადგილზე და თქვენამდე მიწოდება მოხდება მოცემულ დროის ინტერვალში</li>
                <li>10-15 დღე -  ნიშნავს პროდუქტი არ არის ადგილზე და მისი ჩამოტანა და თქვენამდე მიწოდება მოხდება მოცემულ დროის ინტერვალში</li>
              </ul>
              <div className=' text-h6 mt-[10px] text-[#FF0000]'>დამატებითი ინფორმაციისათვის მოგვწერეთ პირადში</div>
            </div>}
            
          </div>
          
          {selectedProduct.sizes.length > 0 && 
          <div className='flex flex-col gap-[10px] '>
            <div>Sizes:</div>
            <div className='flex gap-[20px] justify-start'>
              {selectedProduct.sizes && selectedProduct.sizes.map((property) => 
              <div onClick={()=>{handleSizes(property , property.additionalPrice,property.additionalOnSale ,property.onSaleduration , property.availableOnSpot ) ; setSelectedSize(property.id)}}  className={`shadow-sm shadow-black hover:scale-110  hover:shadow-md hover:shadow-black transition-all duration-300 cursor-pointer text-h5 font-bold p-[10px] rounded-standart text-black ${
                selectedSize === property.id
                  ? 'bg-primary border-[2px] border-primary text-white shadow-md shadow-black scale-110'
                  : 'bg-lightPrimary border-[2px] border-primary shadow-sm shadow-black'
              }`}
            >
                <div>{property.size}</div>        
              </div>)}
            </div>
           
          </div>}

          {selectedProduct.colors.length > 0 && 
          <div className='flex flex-col gap-[10px] '>
            {currentColor ? <div>Color:{currentColor}</div> : <div>Available Colors:</div>}

            <div className=' flex gap-[30px] bg-lightPrimary rounded-standart w-fit border-2 border-primary p-[20px]'>
              {selectedProduct.colors && selectedProduct.colors.map((color) => 
                 
              <div onClick={()=> (handleColor(color) , setCurrentColor(color.name))} style={{ backgroundColor: color.value }} className={` border-black border-[1px] w-[20px] h-[20px] rounded-[50%] cursor-pointer shadow-sm shadow-black hover:scale-150  hover:shadow-md hover:shadow-black transition-all duration-300 ${
                currentColor === color.name
                  && 'scale-150  shadow-md shadow-black  '
                  
              }`}></div>
              )}
            </div>
           
          </div>}

          <div className='text-h5'>
            <div className='flex gap-[20px]'>
              <div className=' font-bold'>Category:</div>
              <div className=' font-normal'>{category}</div>
            </div>
            <div  className='flex gap-[20px]'>
              <div className='font-bold'>Sub Category:</div>
              <div className=' font-normal'>{subCategory}</div>
            </div>
            
          </div>
        </div>
       
        
      </div>
      }
       
    </>
  )
})


export default SelectedProductInfo