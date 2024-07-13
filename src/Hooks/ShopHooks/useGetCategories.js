import { useState, useEffect } from 'react';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore'; // Assuming you're using Firebase
import { db } from '../../config/firebase';

const useGetCategories = () => {
  const petCategoriesRef = collection(db, 'petTypeCategories'); 
  const categoriesRef = collection(db, 'categories'); 

  const [petCategories, setPetCategories] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const petCategoriesSnapshot = await getDocs(petCategoriesRef);
        setPetCategories(petCategoriesSnapshot.docs.map((doc) => doc.data()));

        const categoriesSnapshot = await getDocs(categoriesRef);
        setCategories(categoriesSnapshot.docs.map((doc) => doc.data()));
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Handle errors as needed, e.g., display an error message
      }
    };


    
    

    fetchData();

    const cleanPetCategoryCategories = async () => {
      const productCategoryIds = []; // Collect unique product category IDs
  
      try {
        const productsSnapshot = await getDocs(collection(db, 'products'));
        productsSnapshot.forEach((doc) => {
          productCategoryIds.push(doc.data().category);
        });
  
        const petCategoriesSnapshot = await getDocs(petCategoriesRef);
        petCategoriesSnapshot.forEach((petCategoryDoc) => {
          const docRef = doc(db, 'petTypeCategories', petCategoryDoc.id);
          const categories = petCategoryDoc.data().categories.filter((categoryId) => productCategoryIds.includes(categoryId));
          updateDoc(docRef, { categories });
        });
      } catch (error) {
        console.error('Error cleaning pet category categories:', error);
      }
    };
  
    cleanPetCategoryCategories();
  }, []);


  

  

  return { petCategories, categories };
}

export default useGetCategories;
