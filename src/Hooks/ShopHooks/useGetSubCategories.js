import { useState, useEffect } from 'react';
import useGetProducts from './useGetProducts';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryValue, setFilter, setPetCategoryValue } from '../../Redux/Slices/shopFilterSlice';
import { db } from '../../config/firebase';
import { collection, doc, getDocs } from 'firebase/firestore';

const useGetSubCategories = () => {
  
  const categoriesRef = collection(db, 'categories'); 
  const [category, setCategory] = useState('');
  const [subCategories, setSubCategories] = useState();


  
  const fetchNestedSubCategories = async (categoryId) => {
    try {
      const categoryDoc = doc(categoriesRef, categoryId);
      const subCategoriesRef = collection(categoryDoc , 'subCategories')
      const subCategorySnapshots = await getDocs(subCategoriesRef);
      const subCategoryData = subCategorySnapshots.docs.map((doc) => doc.data());
      setSubCategories(subCategoryData);
      setCategory(categoryId)
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };


  return {fetchNestedSubCategories , category , subCategories};
}

export default useGetSubCategories;
