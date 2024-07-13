import React, { memo, useEffect, useState } from 'react';
import { addDoc, arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import productRaiting from './productRaiting.css'
import useProductRating from '../../../Hooks/ShopHooks/useProductRating';

import { TiStarFullOutline } from "react-icons/ti";
import { useDispatch, useSelector } from 'react-redux';
import { setRatingValue } from '../../../Redux/Slices/shopFilterSlice';


const ProductRaiting = memo(({userRating,handleRatingChange  }) => {
  const dispatch  = useDispatch()
  const {ratingValue} = useSelector((state) => state.shopFilterSlice)

  // const [userRating, setUserRating] = useState(0);
 
  // useEffect(() => {
  //   const fetchRating = async () => {
  //     try {
  //       const ratingRef = doc(ratingsCollection, productId);
  //       const docSnap = await getDoc(ratingRef);

  //       if (docSnap.exists()) {
  //         const existingRatings = docSnap.data().ratings;
  //         const userRatingData = existingRatings.find(rating => rating.userId === userId);
  //         if (userRatingData) {
  //           setUserRating(userRatingData.userRating);
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user rating:", error);
  //     }
  //   };

  //   fetchRating();
  // }, [productId, userId]);



  // const ratingsCollection = collection(db, "ratings");

  // const handleRating = async (newRaiting) => {
  //   try {
  //     const ratingRef = doc(ratingsCollection, productId);

  //     const docSnap = await getDoc(ratingRef);

  //     if (docSnap.exists()) {
  //       // Document exists, check for existing rating by the same user
  //       const existingRatings = docSnap.data().ratings;
  //       const existingUserRatingIndex = existingRatings.findIndex(
  //         (rating) => rating.userId === userId
  //       );

  //       if (existingUserRatingIndex !== -1) {
  //         // Existing rating found, construct a new array without it
  //         const updatedRatings = [
  //           ...existingRatings.slice(0, existingUserRatingIndex),
  //           ...existingRatings.slice(existingUserRatingIndex + 1),
  //         ];

  //         // Update the document with the new array
  //         await updateDoc(ratingRef, { ratings: updatedRatings });
  //       }

  //       // Add the new rating (even if it replaces an existing one)
  //       await updateDoc(ratingRef, {
  //         ratings: arrayUnion({ userId, userRating: parseInt(newRaiting) }),
  //       });
  //     } else {
  //       // Document doesn't exist, create it with the new rating
  //       await setDoc(ratingRef, {
  //         ratings: [
  //           { userId, userRating: parseInt(newRaiting) },
  //         ],
  //         productId: productId,
  //       });
  //     }

  //     console.log("Rating added or updated successfully!");
  //   } catch (error) {
  //     console.error("Error creating or updating rating:", error);
  //   }
  // };

  // const handleRatingChange = (value) => {
  //   setUserRating(value);
  //   handleRating(value)
    
  // };

  
  return(
    
    <div className=''> 
        <div className="rating">
        {[5, 4, 3, 2, 1].map((value) => (
          <React.Fragment key={value}>
            <input
              type="radio"
              id={`star${value}`}
              name="rate"
              value={value}
              checked={ratingValue === value}
              onChange={() => dispatch(setRatingValue(value))}
            />
            <label htmlFor={`star${value}`} title={`text for star ${value}`}>
              <TiStarFullOutline />
            </label>
          </React.Fragment>
        ))}
      </div>  
        
    </div>
    
  )
})


export default ProductRaiting