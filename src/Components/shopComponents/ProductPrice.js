import React, { memo, useEffect, useState } from 'react';




const ProductPrice = memo(({product ,price,onSalePrice,setOnSalePrice,setPrice,textSize}) => {



  


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
   
    <div className='flex gap-4 font-extrabold  leading-6' >
      <div className={`${onSalePrice ? 'text-grayText line-through' : 'text-primary'}`}>${price}</div>
      {onSalePrice>0 && <div className='text-primary'>${onSalePrice}</div>}
    </div>
      
   
  )
})


export default ProductPrice