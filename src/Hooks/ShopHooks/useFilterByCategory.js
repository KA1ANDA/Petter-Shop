import { useState, useEffect } from 'react';
import useGetProducts from './useGetProducts';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryValue, setFilter, setPetCategoryValue, setSalesCategory, setSubCategoryValue } from '../../Redux/Slices/shopFilterSlice';
import useGetSubCategories from './useGetSubCategories';
import { useSearchParams } from 'react-router-dom';

const useFilterByCategory = () => {
  // const [filter , setFilter] = useState()
  // const {fetchNestedSubCategories , subCategories} = useGetSubCategories()

  const dispatch = useDispatch()
  // const {categoryValue , petCategoryValue } = useSelector(state => state.shopSlice)

  // const {filtredProducts} = useGetProducts({
  //   categoryValue,
  //   petCategoryValue
  // })



  const [searchParams, setSearchParams] = useSearchParams();


  const handleCategory = (id) => {
    dispatch(setCategoryValue(id));
    dispatch(setSubCategoryValue(''));
  
    // Get existing search parameters
    const existingSearchParams = Object.fromEntries(searchParams.entries());
  
    // Update search parameters when category is selected
    setSearchParams({
      ...existingSearchParams,
      category: id,
    });
  };
  
  const handlePetCategory = (id) => {
    dispatch(setPetCategoryValue(id));
  
    // Get existing search parameters
    const existingSearchParams = Object.fromEntries(searchParams.entries());
  
    // Update search parameters when pet category is selected
    setSearchParams({
      ...existingSearchParams,
      petcategory: id,
    });
  };
  

  const handleSubCategory = (id) => {
    dispatch(setSubCategoryValue(id));
  
    // Get existing search parameters
    const existingSearchParams = Object.fromEntries(searchParams.entries());
  
    // Update search parameters when subcategory is selected
    setSearchParams({
      ...existingSearchParams,
      subcategory: id,
    });
  };
  
  const handleSalesCategory = () => {
    dispatch(setSalesCategory(true));
  
    // Get existing search parameters
    const existingSearchParams = Object.fromEntries(searchParams.entries());
  
    // Update search parameters when sales category is selected
    setSearchParams({
      ...existingSearchParams,
      sales: true,
    });
  };

  useEffect(() => {
    const updateFilterFromURL = (paramName, actionCreator) => {
      const paramValue = searchParams.get(paramName);
      if (paramValue) {
        dispatch(actionCreator(paramValue));
      }
    };
  
    // const updateSearchParams = (paramName, paramValue) => {
    //   const existingSearchParams = Object.fromEntries(searchParams.entries());
    //   setSearchParams({
    //     ...existingSearchParams,
    //     [paramName]: paramValue,
    //   });
    // };
  
    if (searchParams.has('category')) {
      updateFilterFromURL('category', setCategoryValue);
    } else {
      dispatch(setCategoryValue(''));
    }
  
    if (searchParams.has('petcategory')) {
      updateFilterFromURL('petcategory', setPetCategoryValue);
    } else {
      dispatch(setPetCategoryValue(''));
    }
  
    if (searchParams.has('subcategory')) {
      updateFilterFromURL('subcategory', setSubCategoryValue);
    } else {
      dispatch(setSubCategoryValue(''));
    }
  
    if (searchParams.get('sales') === 'true') {
      dispatch(setSalesCategory(true));
    } else {
      dispatch(setSalesCategory(false));
    }
  }, [searchParams]);


  return {handleCategory , handlePetCategory , handleSubCategory ,handleSalesCategory };
}

export default useFilterByCategory;
