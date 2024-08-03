import React, { memo, useEffect, useState } from 'react';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import AverageRating from './Raiting/AverageRating';
import profileDefault from './Photos/profileDefault.png';

const Review = memo(({ review }) => {
  const [imageURL, setImageURL] = useState(profileDefault);

  useEffect(() => {
    const fetchImageURL = async () => {
      const storage = getStorage();
      const imageRef = ref(storage, `profileImages/${review.userId}`); // Adjust path as needed

      try {
        const url = await getDownloadURL(imageRef);
        setImageURL(url);
      } catch (error) {
        console.error('Error fetching profile image:', error);
        // The default image is already set, so no need to set it again
      }
    };

    fetchImageURL();
  }, [review.userId]);

  return (
    <div className='grid grid-cols-1 lg:grid-cols-4 bg-bgGray gap-[10px] rounded-standart font-lato leading-[23px] py-[30px] px-[20px] shadow-md shadow-black'>
      <div className='lg:col-span-1 flex flex-col gap-[10px] items-start lg:justify-center lg:items-center'>
        <div className='min-w-[80px] max-w-[80px] rounded-[50%] overflow-hidden flex items-center justify-center'>
          <img src={imageURL} alt='Profile' />
        </div>
        <div className='text-h6 font-bold lg:truncate lg:max-w-[80px]'>{review.userName}</div>
      </div>
      <div className='lg:col-span-3 flex flex-col gap-[10px] w-full'>
        <div className='flex flex-col justify-start sm:flex-row sm:justify-between sm:items-center'>
          <div className='text-h6 font-normal'>
            {review.uploadTime.toDate().toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
          <div><AverageRating averageRating={review.userRating} /></div>
        </div>
        <div className=''>
          <div className='text-h6 font-normal'>{review.userReview}</div>
        </div>
      </div>
    </div>
  );
});

export default Review;
