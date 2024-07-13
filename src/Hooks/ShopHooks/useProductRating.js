import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { arrayUnion, doc, onSnapshot, updateDoc, setDoc, getDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { setRatingValue, setReviewValue } from '../../Redux/Slices/shopFilterSlice';

const ratingsCollection = collection(db, "ratings");

const useProductRating = ({ productId }) => {
  const dispatch = useDispatch();
  const [ratingInfo, setRatingInfo] = useState({ userRating: 0, averageRating: 0 });
  const [ratingsData, setRatingsData] = useState([]);
  const userId = auth.currentUser?.uid;
  const userName = auth.currentUser?.displayName; 

  useEffect(() => {
    if (!productId) return;
  
    const ratingRef = doc(ratingsCollection, productId);
    const unsubscribe = onSnapshot(ratingRef, (doc) => {
      if (doc.exists()) {
        const ratings = doc.data().ratings || [];
        
        const totalRating = ratings.reduce((sum, { userRating }) => sum + userRating, 0);
        const average = ratings.length > 0 ? totalRating / ratings.length : 0;
  
        // Round the average to one decimal place:
        const roundedAverage = average.toFixed(1);
  
        const userRatingData = ratings.find((rating) => rating.userId === userId) || { userRating: 0 };
        setRatingInfo({ userRating: userRatingData.userRating, averageRating: roundedAverage });
        setRatingsData(ratings);
      }
    });
  
    return unsubscribe;
  }, [productId, userId]);

  useEffect(()=>{
    setRatingsData([])
  },[productId])

  const handleRating = async (ratingValue, reviewValue) => {
    const ratingRef = doc(ratingsCollection, productId);
    const docSnap = await getDoc(ratingRef);
  
    const newRating = {
      userId,
      userRating: parseInt(ratingValue),
      uploadTime: new Date(),
      userReview: reviewValue,
      userName
    };
  
    if (docSnap.exists()) {
      const existingRatings = docSnap.data().ratings || [];
  
      // Check if the user already has a rating
      const userRatingIndex = existingRatings.findIndex(rating => rating.userId === userId);
      
      if (userRatingIndex !== -1) {
        // User already rated, update their rating
        existingRatings[userRatingIndex] = newRating;
      } else {
        // New user rating, add to array
        existingRatings.push(newRating);
      }

      const totalRating = existingRatings.reduce((sum, { userRating }) => sum + userRating, 0);
      const average = existingRatings.length > 0 ? totalRating / existingRatings.length : 0;
      const roundedAverage = average.toFixed(1);
  
      await updateDoc(ratingRef, {
        ratings: existingRatings ,
        averageRating:parseInt(roundedAverage)
      });
    } else {
      await setDoc(ratingRef, {
        ratings: [newRating],
        productId,
        averageRating: parseInt(newRating.userRating.toFixed(1))
      });
    }
  };
  
  const handleRatingChange = (ratingValue, reviewValue) => {
    handleRating(ratingValue, reviewValue);
    setRatingInfo(prev => ({ ...prev, userRating: ratingValue }));
    dispatch(setRatingValue(''));
    dispatch(setReviewValue(''));
  };

  return { handleRatingChange, ...ratingInfo , ratingsData};
};

export default useProductRating;
