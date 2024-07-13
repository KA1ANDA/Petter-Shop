import React, { useState, useEffect } from 'react';
import { db } from '../../config/firebase';
import { doc , updateDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';

const SaleTimeDuration = ({ product }) => {
  const [remainingTime, setRemainingTime] = useState();

  const { otherSaleDurations } = useSelector(state => state.shopFilterSlice);

 

  const calculateRemainingTime = () => {
    const now = new Date();

    const saleEndDate = otherSaleDurations !== '' ? new Date(otherSaleDurations) : new Date(product.onSaleduration);

    // Ensure that the saleEndDate is in the future
    if (saleEndDate <= now) {
      return 'Sale ended';
    }

    const remainingTime = saleEndDate - now;

    // Calculate remaining time in milliseconds, seconds, minutes, hours, and days
    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const updatedRemainingTime = calculateRemainingTime();
      setRemainingTime(updatedRemainingTime); // Use updatedRemainingTime here

      if (updatedRemainingTime === 'Sale ended') {
        // updateFirestoreProduct();
        clearInterval(timer); // Stop the interval after sale ends
      }
    }, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(timer);
  }, [product, otherSaleDurations]);
  

  // AM KODS AXLA VER VIYENEB ES UNDA MOXDES FIREBASE FUNQCIEBIDAN !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // const updateFirestoreProduct = async () => {
  //   const docRef = doc(db, "products", product.id);
  
  //   if (otherSaleDurations) {
  //     // If otherSaleDurations is true, update the sizes array in the Firestore document
  //     await updateDoc(docRef, {
  //       sizes: product.sizes.map((size) => {
  //         // Check if the size object has the specified onSaleduration value
  //         if (size.onSaleduration === otherSaleDurations) {
  //           // Update the specific size object within the sizes array
  //           return {
  //             ...size,
  //             isSaleActive: false,
  //             additionalOnSale: 0,
  //             onSaleduration: null,
  //           };
  //         }
  //         return size; // Return unchanged size object if onSaleduration doesn't match
  //       }),
  //     });
  //   } else {
  //     // If otherSaleDurations is not true, update the entire document
  //     await updateDoc(docRef, {
  //       isSaleActive: false,
  //       onSaleduration: null,
  //       onSalePrice: 0,
  //     });
  //   }
  
  //   console.log('Product updated successfully');
  // };

  return (
    <div>
      <p>Remaining Time: {remainingTime}</p>
    </div>
  );
};

export default SaleTimeDuration;
