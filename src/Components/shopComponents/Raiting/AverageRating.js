import React, { memo, useEffect, useState } from 'react';
import { addDoc, arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import avarageRating from './avarageRating.css'
import { TiStarFullOutline, TiStarHalfOutline, TiStarOutline } from "react-icons/ti";

const Star = ({ type }) => {
  if (type === 'full') {
    return <TiStarFullOutline className="star filled" />;
  } else if (type === 'half') {
    return <TiStarHalfOutline className="star half" />;
  } else {
    return <TiStarOutline className="star" />;
  }
};

const AverageRating = memo(({ averageRating }) => {
  // Initialize stars
  let fullStars = 0, halfStar = 0, emptyStars = 5;

  // Update star counts if averageRating is provided and is greater than 0
  if (averageRating) {
    fullStars = Math.floor(averageRating);
    halfStar = averageRating % 1 >= 0.5 ? 1 : 0;
    emptyStars = 5 - fullStars - halfStar;
  }

  return (
    <div className="star-rating colo">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} type="full" />
      ))}
      {halfStar > 0 && <Star key="half" type="half" />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} type="empty" />
      ))}
    </div>
  );
});

export default AverageRating;