import { useState, useEffect } from 'react';
import { auth, db } from '../../config/firebase';
import { addDoc, arrayRemove, arrayUnion, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { setShippingAddress } from '../../Redux/Slices/shopFilterSlice';
import { v4 as uuidv4 } from 'uuid';

const useShippingAddress = () => {

  const dispatch = useDispatch()
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const addShippingAddress = async (address) => {
    setLoading(true);
    try {
      const userDocRef = doc(db, 'users', auth.currentUser.uid); // Get the user's document reference
      const userDoc = await getDoc(userDocRef);
  
      if (userDoc.exists()) {
        const existingAddresses = userDoc.data().shippingAddress || [];
        const isFirstAddress = existingAddresses.length === 0;
        const newAddress = { 
          ...address, 
          id: uuidv4(), 
          activeAddress: isFirstAddress 
        }; // Add a unique id to the address and set activeAddress
  
        await updateDoc(userDocRef, {
          shippingAddress: arrayUnion(newAddress),
        });
  
        dispatch(setShippingAddress({
          city: '',
          district: '',
          firstName: '',
          lastName: '',
          address: '',
          additionalAddressInfo: '',
          phoneNumber: '',
          type: ''
        }));
  
        setLoading(false);
      } else {
        throw new Error('User document does not exist');
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };



  const deleteShippingAddress = async (addressId) => {
    setLoading(true);
    try {
      const userDocRef = doc(db, 'users', auth.currentUser.uid); // Get the user's document reference
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userAddresses = userDoc.data().shippingAddress || [];
        const addressToDelete = userAddresses.find(addr => addr.id === addressId);
        if (addressToDelete) {
          await updateDoc(userDocRef, {
            shippingAddress: arrayRemove(addressToDelete),
          });
          setLoading(false);
        } else {
          throw new Error('Address not found');
        }
      } else {
        throw new Error('User document does not exist');
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };



  const setActiveAddress = async (addressId) => {
    setLoading(true);
    try {
      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userAddresses = userDoc.data().shippingAddress || [];
        const updatedAddresses = userAddresses.map(addr => ({
          ...addr,
          activeAddress: addr.id === addressId
        }));

        await updateDoc(userDocRef, {
          shippingAddress: updatedAddresses,
        });
      } else {
        throw new Error('User document does not exist');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  


  return { addShippingAddress,deleteShippingAddress,setActiveAddress, error, loading };
};

export default useShippingAddress;
