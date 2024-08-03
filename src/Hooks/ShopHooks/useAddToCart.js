import { arrayRemove, arrayUnion, collection, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth, db } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';
import { setInCartChanges } from '../../Redux/Slices/shopFilterSlice';
import { setLogInToggle } from '../../Redux/Slices/logedUserSlice';


  const useAddToCart = ({product}) => {

    const dispatch = useDispatch()
  
    const [additionalPrice, setAdditionalPrice] = useState(0);
    const [additionalOnSalePrice, setAdditionalOnSalePrice] = useState(0);

    const [isInCart, setIsInCart] = useState(false);
    const [productQuantity, setProductQuantity] = useState(1);
    const [quantity , setQuantity] = useState(1)
    const [property , setProperty] = useState({})
    const [size , setSize] = useState('')
    const [color , setColor] = useState({})

    const navigate = useNavigate()

   
    
    const {isLoged} = useSelector(state => state.logedUserSlice)
    const q = isLoged && auth.currentUser?.emailVerified  ? query(collection(db, 'users'), where('id', '==', auth.currentUser?.uid)) : null; // Construct query only if logged in


    useEffect(() => {

      if(product){
        const onSaleSizes = product.sizes?.filter(size => size.additionalOnSale !== 0);
        if(onSaleSizes.length > 0){
          setProperty(onSaleSizes[0])
          console.log(onSaleSizes,'ki')
        }else{
          setProperty({})
          console.log(onSaleSizes,'ara')
        }
       
      }
     
  
      
    },[product])



    useEffect(() => {
    if (!isLoged) return; // Exit early if user is not logged in

    if(product){
      if(q){
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const docRef = querySnapshot.docs[0];
          if (docRef) {
            const cart = docRef.data()?.shopCart || [];
            setIsInCart(cart.some(item => item.id === product.id));
  
            const cartItem = cart.find((item) => item.id === product.id);
            
            if (cartItem) {
                setProductQuantity(cartItem.quantity);
                setSize(cartItem.property?.size || '-')
                setAdditionalPrice(cartItem.property?.additionalPrice || 0);
                setAdditionalOnSalePrice(cartItem.property?.additionalOnSale || 0);
                
                
                  
                if (cartItem.color && Object.keys(cartItem.color).length > 0) {
                  setColor(cartItem.color);
                } else if (product.colors && product.colors.length > 0) {
                  setColor(product.colors[0]);
                } else {
                  setColor({}); // Or some default value if no colors are available
                }
            
                
            }
          }  
        });
        return () => unsubscribe();
      }
      
    }

   
    
    }, [isLoged,  product , quantity , property ]); // Add userQuery as a dependency

      //ro rame aq q wavshale

    const handleAddToCart= async () => {

    if (!isLoged) {
       return dispatch(setLogInToggle(true))
    };
    
    if(product){
      getDocs(q).then((querySnapshot) => {
        const userDoc = querySnapshot.docs[0].ref;
        if (isInCart) {
          getDocs(q).then((querySnapshot) => {
            const userDoc = querySnapshot.docs[0].ref;
            const currentCart = querySnapshot.docs[0].data().shopCart || [];
            const newCart = currentCart.filter((item) => item.id !== product.id);
            updateDoc(userDoc, { shopCart: newCart });
          });
        } else {
          const propertyToAdd = property && Object.keys(property).length > 0 ? property : null;
          if(propertyToAdd){
            updateDoc(userDoc, {
              shopCart: arrayUnion({ id: product.id, quantity,property: propertyToAdd , color }),
            });
          }else{

            if(product.sizes[0]){
              updateDoc(userDoc, {
                shopCart: arrayUnion({ id: product.id, quantity,property: product.sizes[0] , color }),
              });   
            }else{
              updateDoc(userDoc, {
                shopCart: arrayUnion({ id: product.id, quantity , color }),
              });  
            }
          }

         
         

        }
        setIsInCart(!isInCart);
      });
    }
  };

  

  // const handleQuantity = (quantityValue) => {
  //   setQuantity(quantityValue)
  // }


  const handleQuantityIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
    console.log('miemata')
  }
  
  const handleQuantityDecrement = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
      console.log('daaklda')

    }
  }

  const handleProperty = (propertyValue) => {
    setProperty(propertyValue);
  }

  const handleColor = (color) => {
    setColor(color || '-')
  }


  const updateQuantity = async (newQUantityValue) => {
    const querySnapshot = await getDocs(q);
    const userDoc = querySnapshot.docs[0].ref;
  
    // Retrieve the current cart items
    const currentCart = querySnapshot.docs[0].data().shopCart || [];
  
    // Find the index of the item to update
    const indexToUpdate = currentCart.findIndex((item) => item.id === product.id);
  
    // Update the quantity of the item at the found index
    if (indexToUpdate !== -1) {
      currentCart[indexToUpdate].quantity = newQUantityValue;
  
      // Update the cart in Firestore
      await updateDoc(userDoc, { shopCart: currentCart });
    }

  };

  


  return {isInCart , handleAddToCart , productQuantity  , updateQuantity , handleProperty , additionalPrice , additionalOnSalePrice  ,quantity , property, size , handleColor , color , handleQuantityIncrement , handleQuantityDecrement};
}

export default useAddToCart;
