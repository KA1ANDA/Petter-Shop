import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { setSelectedSlideSrc } from '../../Redux/Slices/shopFilterSlice';
import { useDispatch, useSelector } from 'react-redux';

const useGetSelectedProduct = () => {
  const dispatch = useDispatch();
  const { selectedProductId } = useSelector(state => state.shopFilterSlice);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  const location = useLocation();
  const pathname = location.pathname;
  const productId = useMemo(() => {
    const match = pathname.match(/\/Products\/([^\/]+)/);
    return match ? match[1] : null;
  }, [pathname]);

  console.log(productId, 'MOVIDA DA RA UNDA VER GAVIGE', selectedProductId);

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        const docRef = doc(db, 'products', productId !== null ? productId : selectedProductId);
        const docSnap = await getDoc(docRef);
        const productData = docSnap.data();

        const categoryDocRef = doc(db, 'categories', productData.category);
        const categoryDocSnap = await getDoc(categoryDocRef);
        const categoryName = categoryDocSnap.data().name;
        setSelectedProduct(productData);

        const categoriesRef = collection(db, 'categories');
        const categoryDoc = doc(categoriesRef, productData.category);
        const subCategoriesRef = collection(categoryDoc, 'subCategories');
        const subCategoryDocRef = doc(subCategoriesRef, productData.subCategory);
        const subCategorySnapshot = await getDoc(subCategoryDocRef);
        const subCategoryData = subCategorySnapshot.data().name;
        setSubCategory(subCategoryData);

        setCategory(categoryName);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    if (productId !== 'Products' || selectedProductId) {
      fetchProductById();
      dispatch(setSelectedSlideSrc(''));
    }
  }, [productId, selectedProductId]);

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

    if (selectedProduct) {
      fetchProducts();
    }
  }, [selectedProduct]);

  return { selectedProduct, category, subCategory, similarProducts, loading };
};

export default useGetSelectedProduct;
