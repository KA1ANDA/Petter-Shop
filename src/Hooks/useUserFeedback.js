import { useState } from 'react';
import { db } from '../config/firebase';
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';

const useUserFeedback = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const addEmail = async (email) => {
    setLoading(true);
    try {
      const feedbackDocRef = doc(db, 'feedback', 'wantEmailNotifications'); // Get the feedback document reference
      const feedbackDoc = await getDoc(feedbackDocRef);

      if (feedbackDoc.exists()) {
        await updateDoc(feedbackDocRef, {
          emails: arrayUnion(email),
        });
        setLoading(false);
      } else {
        throw new Error('Feedback document does not exist');
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };




  const addWishAboutServices = async (wish) => {
    setLoading(true);
    try {
      const feedbackDocRef = doc(db, 'feedback', 'aboutServicesWishes'); // Get the feedback document reference
      const feedbackDoc = await getDoc(feedbackDocRef);

      if (feedbackDoc.exists()) {
        await updateDoc(feedbackDocRef, {
          wishes: arrayUnion(wish),
        });
        setLoading(false);
      } else {
        throw new Error('Feedback document does not exist');
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return { addEmail,addWishAboutServices, error, loading };
};

export default useUserFeedback;
