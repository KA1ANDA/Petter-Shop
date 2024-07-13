import React, { memo, useEffect, useState } from 'react';
import { auth, db } from '../../config/firebase';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import Product from './Product';
import useGetProductPhotos from '../../Hooks/ShopHooks/useGetProductPhotos';
import { setWishlistToggle } from '../../Redux/Slices/shopFilterSlice';
import { useDispatch } from 'react-redux';
import useAddWishlist from '../../Hooks/ShopHooks/useAddWishlist';
import useAddToCart from '../../Hooks/ShopHooks/useAddToCart';
import useGetSavedProducts from '../../Hooks/ShopHooks/useGetSavedProducts';
import { FaShoppingBasket } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import useGetProductPrice from '../../Hooks/ShopHooks/useGetProductPrice';



const Wishlist = memo(() => {

 
  const dispatch = useDispatch()
  

  const {listItems , products , handleRemoveItem} = useGetSavedProducts({targetArray:'shopWishlist'})


  

  // const [products, setProducts] = useState([]);
  // const [wishlistItems, setWishlistItems] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);


  // useEffect(() => {
  //   const fetchWishlist = async () => {
  //     try {
  //       const querySnapshot = await getDocs(
  //         query(collection(db, 'users'), where('id', '==', auth.currentUser.uid))
  //       );
  //       const userDocSnap = querySnapshot.docs[0]; // Assuming a single document
  //       const wishlistData = userDocSnap.data();
  //       if (wishlistData) {
  //         setWishlistItems(wishlistData.shopWishlist);
  //       } else {
  //         setWishlistItems([]); // Handle empty wishlist
  //       }
  //     } catch (error) {
  //       setError(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchWishlist();
  // }, [auth.currentUser.uid]);


  
  // useEffect(() => {
  //   // ... fetch wishlist data (same as before)

  //   const fetchProducts = async () => {
  //     try {
  //       const productPromises = wishlistItems.map((itemId) =>
  //         getDoc(doc(db, 'products', itemId))
  //       );
  //       const productSnapshots = await Promise.all(productPromises);
  //       const fetchedProducts = productSnapshots.map((docSnap) => ({
  //         id: docSnap.id,
  //         ...docSnap.data(),
  //       }));
  //       setProducts(fetchedProducts);
  //     } catch (error) {
  //       setError(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (wishlistItems.length > 0) {
  //     fetchProducts();
  //   }
  // }, [wishlistItems]);

 

  const handleWishlistCloseToggle = () => {
    dispatch(setWishlistToggle(false))
  }

  // const handleRemoveItem = (productId) => {
  //   // Update local state to remove the deleted item
  //   setWishlistItems((prevItems) => prevItems.filter((item) => item !== productId));
  // };

  // console.log(wishlistItems , products ,'essasasass')
  
  return(
    <div className=' fixed bg-[rgba(9,9,9,0.82)] top-0 bottom-0 left-0 right-0  flex items-center justify-center '>
      <div className='bg-white rounded-standart p-5 flex flex-col gap-[40px]'>
        <div onClick={handleWishlistCloseToggle} className=' self-end px-[10px] text-[25px] font-semibold cursor-pointer'>X</div>
        {listItems && listItems.length > 0 ? (
          products.map((wishlistItem)=> 
          <Item product={wishlistItem} onRemove={handleRemoveItem}/> 
        )
        ) : 
        <div>NO WISHLISTED ITEMS</div>
        }
      </div>
    </div>
  )
})


export default Wishlist


const Item = ({product , onRemove}) => {

  

  const {photoUrls} = useGetProductPhotos({product})
  const {handleWishlistClick} = useAddWishlist({product})
  const {handleAddToCart , isInCart , additionalPrice ,additionalOnSalePrice} = useAddToCart({product})
  const {price , onSalePrice } =useGetProductPrice({product})

  const getPriceDisplay = () => {
    if (price === 0) {
      return onSalePrice === 0 ? price : onSalePrice;
    } else {
      return onSalePrice !== 0 ? onSalePrice : price;
    }
  };

 
    return (
      <div className=' border-black border-2 rounded-standart p-5 flex bg-green-900 gap-[40px] justify-between '>
        
        <img className='w-[150px] h-[150px] rounded-standart' src={photoUrls[0]}/>
        
        
        <div className='bg-red-300'>
          <div className=' font-extrabold text-h4'>{product.title}</div>
          <div className=' font-bold text-h5'>${getPriceDisplay()}</div>
        </div>

        <div className=' gap-[10px] font-bold text-h4 flex flex-col justify-between'>
          

          {isInCart ?      
              <div className='flex gap-[15px] items-center  cursor-pointer bg-lightPrimary   p-3 rounded-standart '>
                <NavLink to='/Cart'><div>View Cart</div></NavLink>
                <div><FaShoppingBasket/></div>
              </div>
            :
              <div onClick={handleAddToCart} className='flex gap-[15px] items-center cursor-pointer bg-primary p-3 rounded-standart'>   
                <div>Add To Cart</div>
                <div ><FaShoppingCart/></div>
              </div>
          }

          <div onClick={() => { handleWishlistClick(); onRemove(product.id); }} className=' text-center cursor-pointer  p-3 rounded-standart  bg-additional'>
            DELETE
          </div>    
        </div>

        
      </div>
    )
}