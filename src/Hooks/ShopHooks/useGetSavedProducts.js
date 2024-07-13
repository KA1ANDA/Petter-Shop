import { arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { auth, db } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';
import useAddToCart from './useAddToCart';


const useGetSavedProducts = ({targetArray }) => {

  
  const [products, setProducts] = useState([]);
  const [listItems, setListItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  
  useEffect(() => {
    
    const unsubscribe = onSnapshot(
      query(collection(db, 'users'), where('id', '==', auth.currentUser?.uid)),
      (querySnapshot) => {
        const userDocSnap = querySnapshot.docs[0]; // Assuming a single document
        const listData = userDocSnap.data();
        if (listData) {
          setListItems(listData[targetArray]);
        } else {
          setListItems([]); // Handle empty wishlist
        }
      },
      (error) => {
        setError(error);
      }
    );
  
    return () => unsubscribe(); 
  }, [ auth.currentUser , targetArray]);

 
  useEffect(() => {
    if (products.length > 0) {
      const calculatedSubtotal = products.reduce((total, product) => {
        const matchingItem = listItems.find((item) => item.id === product.id);
  
        let itemPrice = 0;
        if (targetArray === 'shopCart') {
          // Check if additionalPrice field is empty or not
          if (matchingItem && matchingItem.property?.additionalPrice !== undefined && matchingItem.property?.additionalPrice !== null) {
            // Use additionalOnSale if not zero, otherwise use additionalPrice
            itemPrice = matchingItem.property.additionalOnSale && matchingItem.property.additionalOnSale !== 0 ? matchingItem.property.additionalOnSale : matchingItem.property.additionalPrice;
          } else {
            // Use onSalePrice if not zero, otherwise use price
            itemPrice = product.onSalePrice && product.onSalePrice !== 0 ? product.onSalePrice : product.price;
          }
        } else {
          // For other arrays (not shopCart), just use the product price
          itemPrice = product.price;
        }
  
        const quantity = matchingItem ? matchingItem.quantity : 0;
        return total + itemPrice * quantity;
      }, 0);
  
      setSubtotal(calculatedSubtotal);
    } else {
      setSubtotal(0); // Reset subtotal if no products
    }
  }, [products, listItems, targetArray]);
  
  useEffect(() => {
    // ... fetch wishlist data (same as before)

    const fetchProducts = async () => {
      try {
        const productPromises = listItems.map((itemId) =>
          targetArray==='shopCart' ? getDoc(doc(db, 'products', itemId.id)) : getDoc(doc(db, 'products', itemId))
        );
        const productSnapshots = await Promise.all(productPromises);
        const fetchedProducts = productSnapshots.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));
        setProducts(fetchedProducts);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (listItems.length > 0) {
      fetchProducts();
    }
  }, [listItems]);


  const handleRemoveItem = (productId) => {
    // Update local state to remove the deleted item
     // Update local state to remove the deleted item from listItems
     setListItems((prevItems) => prevItems.filter((item) => {
      return targetArray === 'shopCart' ? item.id !== productId : item !== productId;
    }));

    // Also update the products state to reflect this change
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
    setSubtotal((prevSubtotal) => {
      const removedProduct = products.find((product) => product.id === productId);
      const removedQuantity = listItems.find((item) => item.id === productId)?.quantity ?? 0;
      return prevSubtotal - removedProduct.price * removedQuantity;
    });
  };


  return {listItems , products , subtotal ,handleRemoveItem};
}

export default useGetSavedProducts;
