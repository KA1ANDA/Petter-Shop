import React, { memo, useState} from 'react';
import { FaShoppingBasket, FaShoppingCart } from 'react-icons/fa';
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';
import { MdOutlineModeEdit, MdOutlineRemoveRedEye } from 'react-icons/md';
import DeleteProduct from '../admin/DeleteProduct';
import useAddWishlist from '../../Hooks/ShopHooks/useAddWishlist';
import useAddToCart from '../../Hooks/ShopHooks/useAddToCart';
import ProductUpdate from '../admin/ProductUpdate';
import { useDispatch, useSelector } from 'react-redux';
import { setFastProductShow, setSelectedProductId } from '../../Redux/Slices/shopFilterSlice';




const ActionsWithProductBar = memo(({product}) => {

  const dispatch = useDispatch()
  const {isAdmin} = useSelector( state => state.logedUserSlice)

  const {handleWishlistClick , isWishlisted} = useAddWishlist({product})
  const {handleAddToCart , isInCart} = useAddToCart({product})

  const [productUpdateToggle , setProductUpdateToggle] = useState(false)
  
   
  return (
   
      <div className='text-white absolute -bottom-12 right-0 left-0 flex justify-around  text-[35px] productPopUp '>
        <div onClick={handleWishlistClick} className='productPopUpBtn delay-75'>{isWishlisted ? <IoMdHeart/> : <IoMdHeartEmpty/> }</div>
        <div onClick={handleAddToCart} className='productPopUpBtn delay-100'>{isInCart ? <FaShoppingBasket/>:<FaShoppingCart/>}</div>
        <div onClick={() => {dispatch(setFastProductShow(true)) ; dispatch(setSelectedProductId(product.id));}} className=' productPopUpBtn delay-150'><MdOutlineRemoveRedEye/></div>
       
        
        {isAdmin && 
        <>
          <div onClick={() => setProductUpdateToggle(true)} className=' productPopUpBtn delay-200'><MdOutlineModeEdit/></div>
          <div className=' productPopUpBtn delay-300'>  <DeleteProduct productId={product.id}/></div>
        </>
      
        }
        {productUpdateToggle && (
           <div className=' fixed top-0 bottom-0 left-0  right-0 bg-[rgba(9,9,9,0.82)] flex justify-center items-center z-[999]'>
              <div className=' flex flex-col  text-black'>
                <div onClick={() => setProductUpdateToggle(false)} className='flex justify-end text-white cursor-pointer '> X </div>
                <ProductUpdate productId={product.id}/>
              </div>
           </div>
        )}
      </div>
    
  )
 
});


export default ActionsWithProductBar