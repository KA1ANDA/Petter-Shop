import { collection, doc, getDoc, getDocs,  } from 'firebase/firestore'; 
import { db } from '../../config/firebase';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { setSelectedSlideSrc } from '../../Redux/Slices/shopFilterSlice';
import { useDispatch } from 'react-redux';



const useGetSelectedProduct = () => {

  const dispatch = useDispatch()
  
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [category, setCategory] = useState('')
  const [subCategory, setSubCategory] = useState('')
  const [similarProducts, setSimilarProducts] = useState([]);



  
  const location = useLocation()

  const pathname = location.pathname;
  const productId = pathname.split('/').pop();



  

  useEffect(() => {

    if(productId){
      const fetchProductById = async () => {
        try {
          const docRef = doc(db, 'products', productId);
          const docSnap = await getDoc(docRef);
          const productData = docSnap.data();

          
          // Fetch category name
          const categoryDocRef = doc(db, 'categories', productData.category);
          const categoryDocSnap = await getDoc(categoryDocRef);
          const categoryName = categoryDocSnap.data().name;
          setSelectedProduct(productData);

          //fetch sub category

          
            const categoriesRef = collection(db, 'categories'); 
            const categoryDoc = doc(categoriesRef, productData.category);
            const subCategoriesRef = collection(categoryDoc , 'subCategories')
            const subCategoryDocRef = doc(subCategoriesRef, productData.subCategory);
            const subCategorySnapshot = await getDoc(subCategoryDocRef);
            const subCategoryData = subCategorySnapshot.data().name;
            setSubCategory(subCategoryData)
          
         
         
  
          setCategory(categoryName)
      
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      };

      fetchProductById()
      dispatch(setSelectedSlideSrc(''));
    }

 
  },[productId])

   useEffect(() => {
      
      const fetchProducts = async () => {
        const productsRef = collection(db, 'products');
        const productsSnapshot = await getDocs(productsRef);
        const productsData = productsSnapshot.docs.map(doc => doc.data());
        const filteredSimilarProducts = productsData.filter(
          (product) => product.subCategory === selectedProduct?.subCategory
        );
        setSimilarProducts(filteredSimilarProducts.filter(product => product.id !== selectedProduct.id));
      };
  
      fetchProducts();

      
    }, [selectedProduct]);
  

 
  return {selectedProduct , category , subCategory , similarProducts};
}

export default useGetSelectedProduct;
