// produqtebi yvela gamovitano da mere filtrit da sortit davareturnoimport { useState, useEffect } from 'react';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'; // Assuming you're using Firebase
import { db } from '../../config/firebase';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useGetSubCategories from './useGetSubCategories';

const useGetProducts = ({ sortValue ,sortDirection }) => {
  
  const productsRef = collection(db, 'products'); 
  const {categoryValue , petCategoryValue , subCategoryValue , filterByPriceValue , salesCategory} = useSelector(state => state.shopFilterSlice)
  const [products , setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [highRatedProducts, setHighRatedProducts] = useState([]);

  const [sortedProducts , setSortedProducts] = useState([])
  const [filtredProducts , setFiltredProducts] = useState([])
  const [productCount , setProductCount] = useState()


  const {fetchNestedSubCategories , subCategories} = useGetSubCategories()



  useEffect(() => {
    const getCategoryProductCounts = async () => {
    const productsSnapshot = await getDocs(collection(db, 'products'));
    const counts = {
      categoryCounts: {},
      petTypeCounts: {},
    };

    // Fetch category names
    const categoriesSnapshot = await getDocs(collection(db, 'categories'));
    const categoryNames = {};
    categoriesSnapshot.forEach((doc) => {
      categoryNames[doc.id] = doc.data().name;
    });

    
    // Fetch petType names
    const petTypesSnapshot = await getDocs(collection(db, 'petTypeCategories'));
    const petTypeNames = {};
    petTypesSnapshot.forEach((doc) => {
      petTypeNames[doc.id] = doc.data().name;
    });

    productsSnapshot.forEach((doc) => {
      const category = doc.data().category;
      const petType = doc.data().petType;

      // Category counts
      if (!counts.categoryCounts[category]) {
        counts.categoryCounts[category] = { count: 1, name: categoryNames[category] };
      } else {
        counts.categoryCounts[category].count++;
      }


      // PetType counts
      if (!counts.petTypeCounts[petType]) {
        counts.petTypeCounts[petType] = { count: 1, name: petTypeNames[petType] };
      } else {
        counts.petTypeCounts[petType].count++;
      }
    });

   
  

    return setProductCount(counts);
  };

  getCategoryProductCounts();

 
  },[])
  
///PRODUQTEBI

  useEffect(() => {

    const fetchData = async () => {
      const Snapshot = await getDocs(productsRef);
      setProducts(Snapshot.docs.map((doc) => doc.data()));
      
    }

    fetchData()
  },[])

  //high rating products 

  useEffect(() => {
    const fetchHighRatedProducts = async () => {
      try {
        const ratingsSnapshot = await getDocs(ratingsRef);
        const highRatedProducts = [];

        ratingsSnapshot.forEach((doc) => {
          const productId = doc.id;
          const averageRating = doc.data().averageRating;

          // Filter products with average rating between 4 and 5
          if (averageRating >= 4 && averageRating <= 5) {
            const product = products.find((product) => product.id === productId);
            if (product) {
              highRatedProducts.push(product);
            }
          }
        });

        setHighRatedProducts(highRatedProducts);
      } catch (error) {
        console.error('Error fetching high-rated products:', error);
      }
    };

    fetchHighRatedProducts();
  }, [products]);


// /SORT
  // useEffect(() => {
  //   // const sortedProducts = products.sort((a, b) => a[sortValue] - b[sortValue]);
    
  //   const updatedProducts = [...products].sort((a, b) => {
  //     if (sortDirection === 'asc') {
  //       return a[sortValue] - b[sortValue];
  //     } else {
  //       return b[sortValue] - a[sortValue];
  //     }
  //   });
  //   setSortedProducts(updatedProducts)
    
    
  // },[products , sortValue , sortDirection])

  
  const ratingsRef = collection(db, 'ratings');
  const [averageRatings, setAverageRatings] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(productsRef);
      setProducts(querySnapshot.docs.map((doc) => doc.data()));
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchAverageRatings = async () => {
      try {
        const ratingsSnapshot = await getDocs(ratingsRef);
        const averageRatings = {};
        ratingsSnapshot.forEach((doc) => {
          averageRatings[doc.id] = doc.data().averageRating;
        });
        setAverageRatings(averageRatings);
      } catch (error) {
        console.error('Error fetching ratings:', error);
      }
    };

    fetchAverageRatings();
  }, []);

  useEffect(() => {
    const updatedProducts = [...products].sort((a, b) => {
      if (sortValue === 'averageRating') {
        const aRating = averageRatings[a.id] || 0; // Handle products without ratings
        const bRating = averageRatings[b.id] || 0;
        return sortDirection === 'desc' && bRating - aRating;
      } else if (sortValue === 'price') {
        const getEffectivePrice = (product) => {
          if (product.sizes && product.sizes.length > 0) {
            const firstSize = product.sizes[0];
            if (product.price === 0 && product.onSalePrice === 0) {
              return firstSize.additionalOnSale && firstSize.additionalOnSale !== 0
                ? firstSize.additionalOnSale
                : firstSize.additionalPrice;
            } else {
              return product.onSalePrice && product.onSalePrice !== 0
                ? product.onSalePrice
                : product.price;
            }
          } else {
            return product.onSalePrice && product.onSalePrice !== 0
              ? product.onSalePrice
              : product.price;
          }
        };
  
        return sortDirection === 'asc' ? getEffectivePrice(a) - getEffectivePrice(b) : getEffectivePrice(b) - getEffectivePrice(a);
      } else if (sortValue === 'uploadTime') {
        return sortDirection === 'desc' && b.uploadTime - a.uploadTime;
      } else {
        // Handle any other sort values if needed
        return 0;
      }
    });
    setSortedProducts(updatedProducts);
  }, [products, sortValue, sortDirection, averageRatings]);
///GAFILTVRA

useEffect(() => {
  const filteredProducts = sortedProducts.filter((product) => {

    const onSaleSize = product.sizes.find(size => size.additionalOnSale !== 0);

    let effectivePrice;

    if (product.sizes && product.sizes.length > 0) {
      // If sizes exist, check if price and onSalePrice are zero
      const firstSize = product.sizes[0];
      if (product.price === 0 && product.onSalePrice === 0) {
        // Use additionalOnSale if it exists and is not zero; otherwise, use additionalPrice
        effectivePrice = firstSize.additionalOnSale && firstSize.additionalOnSale !== 0 ? firstSize.additionalOnSale : firstSize.additionalPrice;
      } else {
        // If price or onSalePrice is not zero, use the existing logic
        effectivePrice = product.onSalePrice && product.onSalePrice !== 0 ? product.onSalePrice : product.price;
      }
    } else {
      // If no sizes, use the existing price/onSalePrice logic
      effectivePrice = product.onSalePrice && product.onSalePrice !== 0 ? product.onSalePrice : product.price;
    }

    return (
      (!categoryValue || product.category === categoryValue) &&
      (!petCategoryValue || product.petType === petCategoryValue) &&
      (!subCategoryValue || product.subCategory === subCategoryValue) &&
      (effectivePrice >= filterByPriceValue[0] && effectivePrice <= filterByPriceValue[1]) &&
      (!salesCategory || !!product.onSalePrice || !!onSaleSize)
    );
  });

  setFiltredProducts(filteredProducts);
  fetchNestedSubCategories(categoryValue);


}, [categoryValue, petCategoryValue, subCategoryValue, sortedProducts, filterByPriceValue, salesCategory]);



  const fetchProductById = async (id) => {
    try {
      const docRef = doc(db, 'products', id);
      const docSnap = await getDoc(docRef);
      const productData = docSnap.data();
      setSelectedProduct(productData);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

 
  return {sortedProducts , filtredProducts, subCategories , productCount , selectedProduct ,  fetchProductById , products , highRatedProducts };
}

export default useGetProducts;
