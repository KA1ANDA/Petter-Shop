import { useState, useEffect } from 'react';

const useGetProductPrice = ({ product }) => {
  const [price, setPrice] = useState();
  const [onSalePrice, setOnSalePrice] = useState();

  useEffect(() => {
    const productPrice = () => {
      if (product.sizes && product.sizes.length > 0) {
        // Filter sizes where additionalOnSale is not 0
        const onSaleSizes = product.sizes.filter(size => size.additionalOnSale !== 0);
  
        if (onSaleSizes.length > 0) {
          // If there's any size with additionalOnSale not 0, use its prices from the first matched size
          setPrice(onSaleSizes[0].additionalPrice);
          setOnSalePrice(onSaleSizes[0].additionalOnSale);
        } else {
          // Otherwise, use the price from the first size and set onSalePrice to 0
          setPrice(product.sizes[0].additionalPrice);
          setOnSalePrice(0); // or product.sizes[0].additionalOnSale if you prefer
        }
      } else {
        // If there are no sizes, use the default product price
        setPrice(product.price);
        setOnSalePrice(product.onSalePrice);
      }
    };

    if (product) {
      productPrice();
    }
  }, [product]);

  return { price, onSalePrice };
};

export default useGetProductPrice;
