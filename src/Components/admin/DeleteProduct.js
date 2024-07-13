import React from 'react';
import { deleteDoc, doc, getDocs, updateDoc, arrayRemove, collection, query, where } from 'firebase/firestore';
import { db, storage } from '../../config/firebase';
import { deleteObject, listAll, ref } from 'firebase/storage';

import { MdDeleteForever } from "react-icons/md";

const DeleteProduct = ({ productId }) => {
  const deleteProduct = async () => {
    const productRef = doc(db, 'products', productId);

    try {
      await deleteDoc(productRef);
      // const storageRef = storage.ref(`products/${productId}`);
      // await storageRef.delete();

      const ratingsQuery = query(collection(db, 'ratings'), where('productId', '==', productId));
      const ratingsSnapshot = await getDocs(ratingsQuery);

      ratingsSnapshot.forEach(async (ratingDoc) => {
        await deleteDoc(ratingDoc.ref);
      });

      console.log('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product', error);
    }
  };

 

const removeReferenceFromUserField = async (userRef, fieldName) => {
  try {
    const userDocs = await getDocs(userRef);

    if (!userDocs.empty) {
      userDocs.forEach(async (userDoc) => {
        const userData = userDoc.data();

        console.log('Checking user:', userDoc.id, 'Product ID:', productId, 'User Data:', userData[fieldName]);

        const updatedField = userData[fieldName]?.filter(value => {
          if (typeof value === 'object') {
            // For arrays containing objects, remove the object with 'id' equal to productId
            return value.id !== productId;
          } else {
            // For arrays containing strings, remove the string equal to productId
            return value !== productId;
          }
        }) || [];

        if (updatedField.length !== userData[fieldName]?.length) {
          console.log(`Product found in ${fieldName} for user ${userDoc.id}`);

          // Update the user document with the modified array
          await updateDoc(userDoc.ref, { [fieldName]: updatedField });
          console.log(`Reference removed from ${fieldName} for user ${userDoc.id} successfully`);
        }
      });
    } else {
      console.error('No users found');
    }
  } catch (error) {
    console.error(`Error removing reference from ${fieldName}`, error);
  }
};

// ...



const deleteFolderInStorage = async () => {
  try {
     const folderRef = ref(storage, `products/${productId}`);

     const listResult = await listAll(folderRef);
 
  
     await Promise.all(
       listResult.items.map(async (itemRef) => {
         await deleteObject(itemRef);
       })
     );
     
    console.log(`Folder '${productId}' deleted from storage successfully`);
  } catch (error) {
    console.error(`Error deleting folder from storage: ${productId}`, error);
  }
};

  

  const handleDeleteProduct = async () => {
    await deleteProduct();

    // Search all users for references to the deleted product in 'shopCart' and 'shopWishlist'
    const usersRef = collection(db, 'users');
    await removeReferenceFromUserField(usersRef, 'shopCart');
    await removeReferenceFromUserField(usersRef, 'shopWishlist');
    // Add more fields as needed

    deleteFolderInStorage()
  };

  return (
    <div  onClick={handleDeleteProduct}>
      <MdDeleteForever/>
    </div>
  );
};

export default DeleteProduct;
