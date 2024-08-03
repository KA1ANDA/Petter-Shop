import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryValue, setFilter, setPetCategoryValue, setSalesCategory, setSubCategoryValue } from '../../Redux/Slices/shopFilterSlice';
import { useSearchParams } from 'react-router-dom';

const useFilterByCategory = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryValue = useSelector(state => state.shopFilterSlice.categoryValue);
  const petCategoryValue = useSelector(state => state.shopFilterSlice.petCategoryValue);
  const subCategoryValue = useSelector(state => state.shopFilterSlice.subCategoryValue);

  const handleCategory = useCallback((id) => {
    if (categoryValue === id) {
      dispatch(setCategoryValue(''));
      dispatch(setSubCategoryValue(''));
      const existingSearchParams = Object.fromEntries(searchParams.entries());
      delete existingSearchParams.category;
      delete existingSearchParams.subcategory;
      setSearchParams(existingSearchParams);
    } else {
      dispatch(setCategoryValue(id));
      dispatch(setSubCategoryValue(''));
      const existingSearchParams = Object.fromEntries(searchParams.entries());
      setSearchParams({
        ...existingSearchParams,
        category: id,
        page: '1', // Reset to the first page
      });
    }
  }, [categoryValue, searchParams, dispatch, setSearchParams]);

  const handlePetCategory = useCallback((id) => {
    if (petCategoryValue === id) {
      dispatch(setPetCategoryValue(''));
      const existingSearchParams = Object.fromEntries(searchParams.entries());
      delete existingSearchParams.petcategory;
      setSearchParams(existingSearchParams);
    } else {
      dispatch(setPetCategoryValue(id));
      const existingSearchParams = Object.fromEntries(searchParams.entries());
      setSearchParams({
        ...existingSearchParams,
        petcategory: id,
        page: '1', // Reset to the first page
      });
    }
  }, [petCategoryValue, searchParams, dispatch, setSearchParams]);

  const handleSubCategory = useCallback((id) => {
    if (subCategoryValue === id) {
      dispatch(setSubCategoryValue(''));
      const existingSearchParams = Object.fromEntries(searchParams.entries());
      delete existingSearchParams.subcategory;
      setSearchParams(existingSearchParams);
    } else {
      dispatch(setSubCategoryValue(id));
      const existingSearchParams = Object.fromEntries(searchParams.entries());
      setSearchParams({
        ...existingSearchParams,
        subcategory: id,
        page: '1', // Reset to the first page
      });
    }
  }, [subCategoryValue, searchParams, dispatch, setSearchParams]);

  const handleSalesCategory = useCallback((sale) => {
    dispatch(setSalesCategory(sale));
    const existingSearchParams = Object.fromEntries(searchParams.entries());
    setSearchParams({
      ...existingSearchParams,
      sales: sale ? 'true' : '',
      page: '1', // Reset to the first page
    });
  }, [searchParams, dispatch, setSearchParams]);

  useEffect(() => {
    const updateFilterFromURL = (paramName, actionCreator) => {
      const paramValue = searchParams.get(paramName);
      if (paramValue) {
        dispatch(actionCreator(paramValue));
      }
    };

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
  }, [searchParams, dispatch]);

  return { handleCategory, handlePetCategory, handleSubCategory, handleSalesCategory };
}

export default useFilterByCategory;
