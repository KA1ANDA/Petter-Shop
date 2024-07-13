import { arrayRemove, arrayUnion, collection, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { auth, db } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';


const useAddWishlist = ({product}) => {
  
  const [isWishlisted, setIsWishlisted] = useState(false);
  const navigate = useNavigate()


  const {isLoged} = useSelector(state => state.logedUserSlice)
  const q = isLoged ? query(collection(db, 'users'), where('id', '==', auth.currentUser.uid)) : null; // Construct query only if logged in

  useEffect(() => {
    if (!isLoged) return; // Exit early if user is not logged in

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0];
        const wishlist = docRef.data()?.shopWishlist || [];
        setIsWishlisted(wishlist.includes(product.id));
      }
    });

    return () => unsubscribe(); // Cleanup function to unsubscribe when the component unmounts
  }, [isLoged, q, product.id]); // Add userQuery as a dependency



const handleWishlistClick = async () => {

  if (!isLoged) return navigate('/Login');
  getDocs(q).then((querySnapshot) => {
    const userDoc = querySnapshot.docs[0].ref;
    updateDoc(userDoc, {
      shopWishlist: !isWishlisted ? arrayUnion(product.id) : arrayRemove(product.id),
    });
    setIsWishlisted(!isWishlisted);
  });

  
};

  return {handleWishlistClick , isWishlisted };
}

export default useAddWishlist;
