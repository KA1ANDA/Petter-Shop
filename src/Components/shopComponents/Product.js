import { getDownloadURL, getStorage, listAll, ref } from 'firebase/storage';
import React, { memo, useEffect, useState } from 'react';
import { IoMdHeartEmpty } from "react-icons/io";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoMdHeart } from "react-icons/io";
import { auth, db } from '../../config/firebase';
import { arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import useAddWishlist from '../../Hooks/ShopHooks/useAddWishlist';
import useGetProductPhotos from '../../Hooks/ShopHooks/useGetProductPhotos';
import useAddToCart from '../../Hooks/ShopHooks/useAddToCart';
import { FaShoppingBasket } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import useGetSelectedProduct from '../../Hooks/ShopHooks/useGetSelectedProduct';
import { Link, NavLink } from 'react-router-dom';
import AverageRating from './Raiting/AverageRating';
import useProductRating from '../../Hooks/ShopHooks/useProductRating';
import ProductPrice from './ProductPrice';
import useGetProductPrice from '../../Hooks/ShopHooks/useGetProductPrice';
import DeleteProduct from '../admin/DeleteProduct';
import { MdOutlineModeEdit } from "react-icons/md";
import ActionsWithProductBar from './ActionsWithProductBar';



const Product = memo(({product}) => {
 
  // const [price, setPrice] = useState();
  // const [onSalePrice, setOnSalePrice] = useState();
  const {price , onSalePrice } =useGetProductPrice({product})

  const {photoUrls} = useGetProductPhotos({product})
  const {averageRating} = useProductRating({productId:product?.id}) 
  

  


  // useEffect(() => {
  //   const productPrice = () => {
  //     if (product.sizes && product.sizes.length > 0) {
  //       // Find the first size object where additionalOnSale is not 0
  //       const onSaleSize = product.sizes.find(size => size.additionalOnSale !== 0);
  
  //       if (onSaleSize) {
  //         // If there's a size with additionalOnSale not 0, use its prices
  //         setPrice(onSaleSize.additionalPrice);
  //         setOnSalePrice(onSaleSize.additionalOnSale);
  //       } else {
  //         // Otherwise, use the price from the first size and set onSalePrice to 0
  //         setPrice(product.sizes[0].additionalPrice);
  //         setOnSalePrice(0); // or product.sizes[0].additionalOnSale if you prefer
  //       }
  //     } else {
  //       // If there are no sizes, use the default product price
  //       setPrice(product.price);
  //       setOnSalePrice(product.onSalePrice);
  //     }
  //   };
  //   productPrice();
  // }, [product]);



  return(
    <div className='relative'>
    
        <div >
          <div className={`${onSalePrice && 'sale'}  relative z-0 flex flex-col gap-4`}>
            <div className='relative productImg'>
            <Link to={`/Products/${product.id}`}>
              <img className='rounded-standart' src={photoUrls[0]}/>
            </Link>  
              <ActionsWithProductBar product={product} /> 
            </div>
            <div className='flex flex-col justify-center items-center'>
              <Link to={`/Products/${product.id}`}>
                <div className=' text-h4 font-extrabold leading-8 relative z-10 defaultTextHover'>{product.title}</div>
              </Link>
              <div>
                <AverageRating averageRating={averageRating}/>
              </div>
              {/* <div className='flex'>
                <div className={`${onSalePrice && 'text-gray-400 line-through'}`}>${price}</div>
                {onSalePrice>0 && <div>${onSalePrice}</div>}
              </div> */}
              <div className=' text-[22px]'>
                <ProductPrice  price={price} onSalePrice={onSalePrice}  />
              </div>
            </div>
            
          
          </div>
        </div>
    
     
    
    
    </div>
   
   
  )
})


export default Product