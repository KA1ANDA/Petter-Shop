import { arrayRemove, arrayUnion, collection, doc, getDoc, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { auth, db } from '../../config/firebase';

const useGetSavedProducts = ({ targetArray }) => {
  const [products, setProducts] = useState([]);
  const [listItems, setListItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if(auth.currentUser?.emailVerified){
      const unsubscribe = onSnapshot(
        query(collection(db, 'users'), where('id', '==', auth.currentUser?.uid)),
        (querySnapshot) => {
          const userDocSnap = querySnapshot.docs[0]; // Assuming a single document
          const listData = userDocSnap?.data();
          if (listData) {
            setListItems(listData[targetArray]);
          } else {
            setListItems([]); // Handle empty targetArray
          }
          // Simulate a delay to make loading visible
          setTimeout(() => {
            setLoading(false);
          }, 1000); // 300ms delay
        },
        (error) => {
          setError(error);
          // Simulate a delay to make loading visible
          setTimeout(() => {
            setLoading(false);
          }, 1000); // 300ms delay
        }
      );
  
      return () => unsubscribe();
    }
    
  }, [auth.currentUser, targetArray]);

  useEffect(() => {
    if (listItems.length > 0) {
      const fetchProducts = async () => {
        try {
          setLoading(true); // Set loading state before fetching products
          const productPromises = listItems.map((item) =>
            targetArray === 'shopCart' ? getDoc(doc(db, 'products', item.id)) : getDoc(doc(db, 'products', item))
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
          // Simulate a delay to make loading visible
          setTimeout(() => {
            setLoading(false);
          }, 1000); // 300ms delay
        }
      };
      fetchProducts();
    } else {
      setProducts([]);
      setLoading(false); // Stop loading state if no listItems
    }
  }, [listItems, targetArray]);

  useEffect(() => {
    if (products.length > 0) {
      const calculatedSubtotal = products.reduce((total, product) => {
        const matchingItem = listItems.find((item) => item.id === product.id);

        let itemPrice = 0;
        if (targetArray === 'shopCart') {
          if (matchingItem && matchingItem.property?.additionalPrice !== undefined && matchingItem.property?.additionalPrice !== null) {
            itemPrice = matchingItem.property.additionalOnSale && matchingItem.property.additionalOnSale !== 0 ? matchingItem.property.additionalOnSale : matchingItem.property.additionalPrice;
          } else {
            itemPrice = product.onSalePrice && product.onSalePrice !== 0 ? product.onSalePrice : product.price;
          }
        } else {
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

  const handleRemoveItem = (productId) => {
    setListItems((prevItems) => prevItems.filter((item) => {
      return targetArray === 'shopCart' ? item.id !== productId : item !== productId;
    }));

    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));

    setSubtotal((prevSubtotal) => {
      const removedProduct = products.find((product) => product.id === productId);
      const removedQuantity = listItems.find((item) => item.id === productId)?.quantity ?? 0;
      return prevSubtotal - removedProduct.price * removedQuantity;
    });
  };

  return { listItems, products, subtotal, loading, error, handleRemoveItem };
};

export default useGetSavedProducts;
