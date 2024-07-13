import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../config/firebase';
import { FaCircleMinus } from "react-icons/fa6";
import ColorDropdown from '../shopComponents/ColorDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { setAvailableColors } from '../../Redux/Slices/shopFilterSlice';

const ProductUpdate = ({productId}) => {
  const dispatch = useDispatch()

  const [addNewSizeToggle, setAddNewSizeToggle] = useState(false);


  const {availableColors} =useSelector(state => state.shopFilterSlice )


  const [newSize, setNewSize] = useState('');
  const [selectedSizeId, setSelectedSizeId] = useState(null);
  const [price, setPrice] = useState(0);
  const [onSalePrice, setOnSalePrice] = useState(0);
  const [onSaleduration, setOnSaleduration] = useState('');
  const [availableOnSpot, setAvailableOnSpot] = useState(false);

  const [withSizes , setWithSizes] = useState([])

  const resetInputValues = () => {
    setNewSize('');
    setPrice(0);
    setOnSalePrice(0);
    setOnSaleduration('');
    setAvailableOnSpot(false);
  };

  
  useEffect(() => {
    // Check if onSalePrice is deleted (set to an empty string)
    if (onSalePrice === '') {
      setOnSalePrice(0);
      setOnSaleduration('');
      // Additional logic if needed to update other fields
    }
  }, [onSalePrice]);



  useEffect(() => {
    const productDocRef = doc(db, 'products', productId);

    const unsubscribe = onSnapshot(productDocRef, (doc) => {
      if (doc.exists()) {
        const productData = doc.data();
        dispatch(setAvailableColors(productData.colors))
        if (productData.sizes.length > 0) {
          setWithSizes(productData.sizes);
        } else {
          setPrice(productData.price || 0);
          setOnSalePrice(productData.onSalePrice || 0);
          setOnSaleduration(productData.onSaleduration || '');
          setAvailableOnSpot(productData.availableOnSpot || false);
        }
      }
    });

    // Cleanup function to unsubscribe from the snapshot listener when the component unmounts
    return () => unsubscribe();
  }, [productId]);
  

  const handleSizeClick = (size) => {

    // Set state based on the clicked size object
    setNewSize(size.size)
    setSelectedSizeId(size.id);
    setPrice(size.additionalPrice || 0);
    setOnSalePrice(size.additionalOnSale || 0);
    setOnSaleduration(size.onSaleduration || '');
    setAvailableOnSpot(size.availableOnSpot || false);
    setAddNewSizeToggle(false)
  };

  const updateFirestore = async () => {
    const productDocRef = doc(db, 'products', productId);

    try {
      if (withSizes.length > 0) {
        // If sizes array is not empty, find the selected object and update it
        const updatedSizes = withSizes.map((size) => {
          if (size.id === selectedSizeId) {
            // Update the selected size object with new values
            const updatedSize = {
              ...size,
              size:newSize,
              additionalPrice: parseInt(price),
              additionalOnSale: parseInt(onSalePrice),
              onSaleduration,
              availableOnSpot,
              isSaleActive: onSalePrice !== 0,
            };
  
            // Check conditions to update isSaleActive
            if (updatedSize.additionalOnSale > 0 && updatedSize.onSaleduration !== '') {
              updatedSize.isSaleActive = true;
            }
  
            return updatedSize;
          }
          return size;
        });

        // Update the entire sizes array in the Firestore document
        await updateDoc(productDocRef, {
          colors: availableColors,
          sizes: updatedSizes,
        });
      } else {
        // If sizes array is empty, update other fields
        const dataToUpdate = {
          price: parseInt(price),
          onSalePrice: parseInt(onSalePrice),
          onSaleduration,
          availableOnSpot,
          isSaleActive: onSalePrice !== 0,
          colors: availableColors,
        };
  
        // Check conditions to update isSaleActive
        if (dataToUpdate.onSalePrice > 0 && dataToUpdate.onSaleduration !== '') {
          dataToUpdate.isSaleActive = true;
        }
  
        await updateDoc(productDocRef, dataToUpdate);
      }
      console.log('Document successfully updated!');
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };


  const handleAddNewSize = () => {
    setAddNewSizeToggle(true)
    resetInputValues()
  }

  const addNewSizeToFirestore = async () => {
    if (newSize.trim() === '') {
      // Do not add empty sizes
      return;
    }

    const productDocRef = doc(db, 'products', productId);

    // Get the current product document data
    const productDocSnapshot = await getDoc(productDocRef);

    if (productDocSnapshot.exists()) {
      const productData = productDocSnapshot.data();

      // Create a new size object
      const newSizeObject = {
        id: `${Date.now()}-${Math.floor(Math.random() * 100000)}`,
        size: newSize,
        additionalPrice: parseInt(price),
        additionalOnSale: parseInt(onSalePrice),
        onSaleduration,
        availableOnSpot,
        isSaleActive: onSalePrice !== 0,
      };

      // Update the Firestore document's sizes array
      const updatedSizes = [...productData.sizes, newSizeObject];

      try {
        await updateDoc(productDocRef, {
          sizes: updatedSizes,
        });

        // Clear the input field after adding the size
        // setNewSize('');
        resetInputValues()
        console.log('New size added to Firestore successfully!');
      } catch (error) {
        console.error('Error updating document: ', error);
      }
    }
  };


  const deleteSizeFromFirestore = async (id) => {
    const productDocRef = doc(db, 'products', productId);

    try {
      if (withSizes.length > 0 && id) {
        // Filter out the selected size from the sizes array
        const updatedSizes = withSizes.filter((size) => size.id !== id);

        // Update the entire sizes array in the Firestore document
        await updateDoc(productDocRef, {
          sizes: updatedSizes,
        });

        // Reset input values after deletion
        resetInputValues();

        console.log('Size successfully deleted from Firestore!');
      }
    } catch (error) {
      console.error('Error deleting size: ', error);
    }
  };


  return (
   <div className='bg-purple-200 p-[20px]'>

        <div className='border-4 border-green-500 rounded-xl p-[20px]'>

          <div>
            <ColorDropdown />
          </div>

          <div className='flex'>
            {withSizes && withSizes.length>0 && (

              <div className='flex gap-[30px] justify-center items-center'>
                {
                  withSizes.map((el) => (
                    <div className='bg-red-200 flex flex-col gap-[20px] cursor-pointer relative'>
                      <div onClick={() => handleSizeClick(el)}>
                        <div>zoma:{el.size}</div>
                        <div>fasi:{el.additionalPrice}</div>
                        <div>fasdaklebuli:{el.additionalOnSale}</div>
                        <div>saili moqmedebs:{el.isSaleActive ? '✔️' : '❌'}</div>
                        <div>dro sailis:{el.onSaleduration}</div>
                        <div>adgilze:{el.availableOnSpot ? '✔️' : '❌'}</div>
                      </div>
                      
                      <div onClick={() => deleteSizeFromFirestore(el.id)} className=' cursor-pointer absolute -right-[15px] -top-[10px] bg-white rounded-[50%] text-red-600 text-[40px]'><FaCircleMinus /></div>
                    </div>
                  ))
                  
                }

                <div onClick={handleAddNewSize} className='text-[50px] font-bold border-2 rounded-[50%] border-black flex justify-center items-center h-fit p-[20px] cursor-pointer'>+</div>
              </div>
              
            )}
          </div>

          {withSizes && withSizes.length>0  && (
            <div>
              <div>ზომა</div>
              <input type='text' value={newSize} onChange={(e) => setNewSize(e.target.value)}></input>
            </div>
          )}
         
          
          <div>
            <div>ფასი</div>
            <input type='number' value={price} onChange={(e) => setPrice(e.target.value)}></input>
          </div>

          <div>
            <div>ფასდაკლებული ფასი</div>
            <input type='number' value={onSalePrice} onChange={(e) => setOnSalePrice(e.target.value)}></input>
          </div>  

          {onSalePrice && 
          <div>
            <div>ფასდაკლების დამთავრების დრო</div>
            <input type='datetime-local' value={onSaleduration} onChange={(e) => setOnSaleduration(e.target.value)}></input>
          </div>  
          }


          <div className='flex gap-[20px]'>
            <div>ადგილზე გვაქვს</div>
            <input type='checkbox' checked={availableOnSpot} onChange={(e) => setAvailableOnSpot(e.target.checked)}></input>
          </div>


          {addNewSizeToggle ? 
            <div>
              <button onClick={addNewSizeToFirestore}>Add new size</button>
            </div>

         :

          <div>
            <button onClick={updateFirestore}>Update Firestore</button>
          </div>
          }
         
        </div>
   
   </div>
  );
};

export default ProductUpdate;
