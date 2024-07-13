import { addDoc, arrayUnion, collection, doc, getDocs, serverTimestamp, updateDoc } from 'firebase/firestore';
import React, { memo, useEffect, useState } from 'react';
import { auth, db, storage } from '../../config/firebase';
import { ref, uploadBytes } from 'firebase/storage';
import useGetCategories from '../../Hooks/ShopHooks/useGetCategories';
import useGetSubCategories from '../../Hooks/ShopHooks/useGetSubCategories';
import { colorOptions } from '../../Variables/shopVariables';
import ColorDropdown from '../shopComponents/ColorDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { setIsSaleActive } from '../../Redux/Slices/shopFilterSlice';
import imageCompression from 'browser-image-compression';
import AddAdminRole from './AddAdminRole';
import './priceFormToggle.css'
import './photoAdd.css'
import { FaCircleMinus } from "react-icons/fa6";
import * as Yup from 'yup';
import { Form, Formik } from 'formik';


const ProductAdd = memo(() => {

  const dispatch = useDispatch()
  
  

  const {categories , petCategories} = useGetCategories()
  const petCategoriesRef = collection(db, 'petTypeCategories'); 
  const categoriesRef = collection(db, 'categories'); 
  // const subCategoriesRef = collection(db, 'petTypeCategories'); 

  const {fetchNestedSubCategories , category , subCategories} = useGetSubCategories()


  const {availableColors , isSaleActive} = useSelector(state => state.shopFilterSlice )

  const [property, setProperty] = useState('');
  // const [propertyValue, setPropertyValue] = useState([]);
  const [sizes, setSizes] = useState([]);



  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [brandName, setBrandName] = useState('');
  const [price, setPrice] = useState(0);
  const [onSalePrice, setOnSalePrice] = useState(0);
  const [onSaleduration, setOnSaleduration] = useState('');

  const [availableOnSpot, setAvailableOnSpot] = useState(false);


   

  const [additionalPrice, setAdditionalPrice] = useState(0);
  const [additionalOnSale, setAdditionalOnSale] = useState(0);

  const [petType, setpetType] = useState('');
  // const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [supplierURL, setSupplierURL] = useState('');



  const [cmSize, setCmSize] = useState({
    length:0,
    width:0
  });
  const [photos, setPhotos] = useState([]);
  const [size, setSize] = useState('XXS');
  const [volume, setVolume] = useState(0);
  const [weight, setWeight] = useState(0);




  useEffect(() => {
    setSizes([])
  },[property])


  useEffect(() => {
    if(onSalePrice>0 || additionalOnSale>0){
      dispatch(setIsSaleActive(true))
     }else{
      dispatch(setIsSaleActive(false))
     }
  },[onSalePrice , additionalOnSale])




  const removePhoto = (index) => {
    const updatedPhotos = [...photos];
    updatedPhotos.splice(index, 1);
    setPhotos(updatedPhotos);
  };


  const addPropertyValue  = (value , measure='') => {
    const sizeObj = {
      id: `${Date.now()}-${Math.floor(Math.random() * 100000)}`,
      size: value + (measure ? ' ' + measure : ''),
      additionalPrice: Number(additionalPrice),
      additionalOnSale: Number(additionalOnSale),
      isSaleActive,
      onSaleduration,
      availableOnSpot
    };
  
 
    setSizes([...sizes, sizeObj]);
    setOnSaleduration('')
  }


  const deleteProperyValue = (index) => {
    const updatedPropertyValue = [...sizes];
    updatedPropertyValue.splice(index, 1);
    setSizes(updatedPropertyValue);
  }


  // const getPhotos = (files) => {
  //   setPhotos((prevPhotos) => [
  //     ...prevPhotos,  // Spread existing photos
  //     ...files      // Spread new files
  //   ]);
  // }

  const getPhotos = async (files) => {
    try {
      const compressedPhotos = [];
  
      for (const file of files) {
        const options = {
          maxSizeMB: 1, // Maximum allowed size in megabytes
          maxWidthOrHeight: 2000, // Maximum width or height of the image
          useWebWorker: true,
        };
  
        const compressedFile = await imageCompression(file, options);
        compressedPhotos.push(compressedFile);
      }
  
      setPhotos((prevPhotos) => [
        ...prevPhotos,
        ...compressedPhotos,
      ]);
    } catch (error) {
      console.error('Error compressing images:', error);
    }
  };
  


  const addProduct = async() => {
    
    try{
      let productData = {
        title,
        description,
        brandName,
        price: Number(price),
        onSalePrice: Number(onSalePrice),
        availableOnSpot,
        petType,
        category,
        subCategory,
        sizes,
        colors: availableColors,
        supplierURL,
        uploadTime: serverTimestamp()
      };
  
      // Check if sizes array has elements
      if (sizes.length > 0) {
        // If sizes array has elements, do not include onSaleduration and isSaleActive
      } else {
        // If sizes array is empty, include onSaleduration and isSaleActive
        productData = {
          ...productData,
          onSaleduration,
          isSaleActive
        };
      }

      const docRef = await addDoc(collection(db, "products"), productData);
      const productId = docRef.id;
      updateDoc(docRef, {id:productId})

      photos.map(async (photo) => {
        const imageRef = ref(storage, `products/${productId}/${photo.name}`);
        await uploadBytes(imageRef, photo);
      })

      const petDocRef = doc(petCategoriesRef, petType);
      
      updateDoc(petDocRef, {categories: arrayUnion(category)})
    }catch(err){
      console.error(err)
    }


  }

  const [isChecked, setIsChecked] = useState(false);

  const handleToggleChange = () => {
    setIsChecked((prevChecked) => !prevChecked);
  };

  console.log(availableOnSpot)


  const initialValues = {
    title: '',
    description: '',
    // Add other initial values here
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    photos: Yup.array()
      .min(1, 'At least one photo is required')
      .required('At least one photo is required'),
    // Add other validations here
  });

  const handleSubmit = (values) => {
    // Handle form submission here
    console.log(values);
  };


  return(   
    <div className=' grid grid-cols-12  bg-lightPrimary rounded-standart p-[20px] gap-[30px] productAddForm'>

      <div className=' col-span-8'>
        <div className=' font-bold text-[25px]'>ატვირთე სურათი</div>
        
        {!photos.length > 0 ? 
        <div className='  w-full flex justify-center items-center h-full'>
          <label className="custum-file-upload " forHtml="file">
            <div class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24"><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path fill="" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" clip-rule="evenodd" fill-rule="evenodd"></path> </g></svg>
            </div>

            <div class="text">
              <span>Click to upload image</span>
            </div>
            <input type='file' id='file' multiple onChange={(e) => getPhotos(e.target.files)}></input>
          </label>
        </div>
        

          :

        <div className='grid grid-cols-3 gap-[30px]'>
          {photos && photos.map((photo,index) =>
            <div className=' relative object-fill'>
              <img className=' max-h-[300px] object-fill rounded-standart' key={index} src={URL.createObjectURL(photo)}/>
              <div className=' text-[red] text-h3 cursor-pointer absolute -top-5 -right-2' onClick={() => removePhoto(index)}> <FaCircleMinus /> </div>
            </div>
          
           
           )}   
        </div>}
        
    
      </div>

      <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      >
      {({ errors, touched }) => (
      <Form className='col-span-4'>
       
       
        <div className=' flex flex-col gap-[20px]  '>
          <div >
            <div>სახელი</div>
            <input  name='title' className={`w-full ${touched.title && errors.title ? 'border-[red]' : ''}`} value={title} onChange={(e) => setTitle(e.target.value)}></input>
            {touched.title && errors.title && <span className=' text-[red]'>{errors.title}</span>}
          </div>  

          <div>
            <div>აღწერა</div>
            <textarea name='description'   className={`resize-none w-full rounded-standart border-2 border-[#cecece] text-h6 leading-[20px] min-h-[100px] px-[20px] focus:outline-none ${touched.description && errors.description ? 'border-[red]' : ''}`} type='textarea' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            {touched.description && errors.description && <span className='text-[red]'>{errors.description}</span>}
          </div> 

          <div className='grid grid-cols-2 gap-[10px]'>
            <div>
              <div>ბრენდი</div>
              <input name='brand' className=' w-full' value={brandName} onChange={(e) => setBrandName(e.target.value)}></input>
            </div>

            <div>
              <div>მომწოდებლის ლინკი</div>
              <input  className=' w-full' onChange={(e) => setSupplierURL(e.target.value)}></input>
            </div> 

            <div>
              <div>ცხოველი</div>
              <select name='petType' className=' w-full' onChange={(e) => setpetType(e.target.value)}>
                {petCategories && petCategories.map((pet) => <option key={pet.id} value={pet.id}>{pet.name}</option>)}      
              </select>
            </div> 



            <div>
              <div>კატეგორია</div>
              <select name='category' className=' w-full' onChange={(e) => fetchNestedSubCategories(e.target.value) }>
              {categories && categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}      
              </select>
            </div>

            <div >
              <div>დამატებითი კატეგორია</div>
              <select name='subCategory' className=' w-full' onChange={(e) => setSubCategory(e.target.value)} >
              {subCategories && subCategories.map((subCategory) => <option key={subCategory.id} value={subCategory.id}>{subCategory.name}</option>)}      
              </select>
            </div>  
          </div>


         

          <div>
            <ColorDropdown />
          </div>
       

        
          
        </div>
        
{/* 
        <div className='  flex flex-col justify-center items-center '>
          <div className=' flex gap-[30px] justify-center items-center font-bold'>
            <div>ზომები არ აქვს </div>

            <label className="switch">
              <input
                name='hasSizes'
                type="checkbox"
                checked={isChecked}
                onChange={handleToggleChange}
              />
              <span className="slider"></span>
            </label>

            <div>ზომები აქვს </div>

          </div>
          
          {!isChecked ?
          <div className=' w-full flex flex-col gap-[20px]'>
            
            <div>
              <div>ფასი</div>
              <input name='price' className='w-full' type='number' value={price} onChange={(e) => setPrice(e.target.value)}></input>
            </div>

            <div>
              <div>ფასდაკლებული ფასი</div>
              <input className='w-full' type='number' value={onSalePrice} onChange={(e) => setOnSalePrice(e.target.value)}></input>
            </div>  

            {onSalePrice > 0 && 
            <div>
              <div>ფასდაკლების დამთავრების დრო</div>
              <input type='datetime-local' className='w-full' value={onSaleduration} onChange={(e) => setOnSaleduration(e.target.value)}></input>
            </div>  
            }


            <div className='flex gap-[20px]'>
              <div>ადგილზე გვაქვს</div>
              <input name='inStock' type='checkbox' value={availableOnSpot} onChange={(e) => setAvailableOnSpot(e.target.checked)}></input>
            </div>
          </div> 

            :
          <div className='rounded-xl w-full flex flex-col gap-[10px]'>
            
            <div className='flex gap-[20px]'>
              <div>
                <input type='radio' id='სიგრძე' name='property' value='length' onChange={(e) => setProperty(e.target.value)}></input>
                <label htmlFor='სიგრძე'>სიგრძე</label>
              </div>  

              <div>
                <input type='radio' id='ზომა' name='property' value='size' onChange={(e) => setProperty(e.target.value)}></input>
                <label htmlFor='ზომა'>ზომა</label>
              </div>  

              <div>
                <input type='radio' id='მოცულობა' name='property' value='volume' onChange={(e) => setProperty(e.target.value)}></input>
                <label htmlFor='მოცულობა'>მოცულობა</label>
              </div>  

              <div>
                <input type='radio' id='წონა' name='property' value='weight' onChange={(e) => setProperty(e.target.value)}></input>
                <label htmlFor='წონა'>წონა</label>
              </div>  
                
            </div>


            <div className='flex gap-[30px]'>
              {sizes && sizes.map((prop, index) =>
                <div 
                  key={index}
                  id={index}
                  onClick={() => deleteProperyValue(index)}
                  className='flex flex-col   text-[15px] border-2 border-lightPrimary rounded-standart font-bold cursor-pointer'>
                  <div>Size: {prop.size},</div>
                  <div>Price: {prop.additionalPrice} </div>
                  <div>Sale: {prop.additionalOnSale}</div>
                
                </div>
              )}
            </div>

          

            <div className='flex flex-col'>
              
              {property === 'length' ? (
                <div className='flex flex-col gap-[20px]'>
                  <div className='flex items-center gap-[15px]'>
                    <input className='w-full' type='number' placeholder='სმ' value={cmSize.length} onChange={(e) => setCmSize({ ...cmSize, length: e.target.value})}></input>
                      X
                    <input className='w-full' type='number' placeholder='სმ' value={cmSize.width} onChange={(e) => setCmSize({...cmSize, width: e.target.value})}></input> 
                  </div>
                  
                  <div className='flex flex-col gap-[10px]'>
                    <div>
                      <div>aditional Price</div>
                      <input className='w-full' placeholder='ფასი' value={additionalPrice} onChange={(e) => setAdditionalPrice(e.target.value)}></input>
                    </div>
                    <div>
                      <div>aditional on-Sale Price</div>
                      <input className='w-full' placeholder='ფასდაკლებული' value={additionalOnSale} onChange={(e) => setAdditionalOnSale(e.target.value)}></input>
                    </div> 
                  </div>
                  

                  <div className='flex gap-[10px]'>
                    {additionalOnSale && 
                    <div>
                      <div>ფასდაკლების დამთავრების დრო</div>
                      <input type='datetime-local' value={onSaleduration} onChange={(e) => setOnSaleduration(e.target.value)}></input>
                    </div>  
                    }   

                    <div className='flex gap-[20px]'>
                      <div>ადგილზე გვაქვს</div>
                      <input type='checkbox' value={availableOnSpot} onChange={(e) => setAvailableOnSpot(e.target.checked)}></input>
                    </div>
                  </div>
                  
                

                  <button onClick={() => addPropertyValue(`${cmSize.length}X${cmSize.width}`)}>add Property</button>
                </div>
                  
              ) : property === 'size' ? (
                <div className='flex flex-col gap-[10px]'>
                  <select onChange={(e) => setSize(e.target.value)}>
                    <option value='XXS'>XXS</option>
                    <option value='XS'>XS</option>
                    <option value='S'>S</option>
                    <option value='M'>M</option>
                    <option value='L'>L</option>
                    <option value='XL'>XL</option>
                  </select>
                  <div>
                    <div>aditional Price</div>
                    <input className='w-full' placeholder='ფასი' value={additionalPrice} onChange={(e) => setAdditionalPrice(e.target.value)}></input>
                  </div>
                  <div>
                    <div>aditional on-Sale Price</div>
                    <input className='w-full' placeholder='ფასდაკლებული' value={additionalOnSale} onChange={(e) => setAdditionalOnSale(e.target.value)}></input>
                  </div>    

                    
                  {additionalOnSale > 0 && 
                  <div>
                    <div>ფასდაკლების დამთავრების დრო</div>
                    <input type='datetime-local' value={onSaleduration} onChange={(e) => setOnSaleduration(e.target.value)}></input>
                  </div>  
                  }   

                  <div className='flex gap-[20px]'>
                    <div>ადგილზე გვაქვს</div>
                    <input type='checkbox' value={availableOnSpot} onChange={(e) => setAvailableOnSpot(e.target.checked)}></input>
                  </div>
                  <button onClick={() => addPropertyValue(size)}>add Property</button>
                </div>
                
              ) : property === 'volume' ? (
                <div className='flex flex-col gap-[10px]'>
                  <input type='number' placeholder='oz' value={volume} onChange={(e) => setVolume(e.target.value)}></input>
                  <div>
                    <div>aditional Price</div>
                    <input className='w-full' placeholder='ფასი' value={additionalPrice} onChange={(e) => setAdditionalPrice(e.target.value)}></input>
                  </div>
                  <div>
                    <div>aditional on-Sale Price</div>
                    <input className='w-full' placeholder='ფასდაკლებული' value={additionalOnSale} onChange={(e) => setAdditionalOnSale(e.target.value)}></input>
                  </div>    
                    
                  {additionalOnSale > 0 && 
                  <div>
                    <div>ფასდაკლების დამთავრების დრო</div>
                    <input type='datetime-local' value={onSaleduration} onChange={(e) => setOnSaleduration(e.target.value)}></input>
                  </div>  
                  }   

                  <div className='flex gap-[20px]'>
                    <div>ადგილზე გვაქვს</div>
                    <input type='checkbox' value={availableOnSpot} onChange={(e) => setAvailableOnSpot(e.target.checked)}></input>
                  </div>
                  <button onClick={() => addPropertyValue(volume , 'oz')}>add Property</button>
                </div>
              
                
              ) : property === 'weight' ? (
            
                <div className='flex flex-col gap-[10px]'>
                  <input type='number' placeholder='გრ' value={weight} onChange={(e) => setWeight(e.target.value)}></input>
                  <div>
                    <div>aditional Price</div>
                    <input  className='w-full' placeholder='ფასი' value={additionalPrice} onChange={(e) => setAdditionalPrice(e.target.value)}></input>
                  </div>
                  <div>
                    <div>aditional on-Sale Price</div>
                    <input className='w-full' placeholder='ფასდაკლებული' value={additionalOnSale} onChange={(e) => setAdditionalOnSale(e.target.value)}></input>
                  </div>  
                    
                  {additionalOnSale >0 && 
                  <div>
                    <div>ფასდაკლების დამთავრების დრო</div>
                    <input type='datetime-local' value={onSaleduration} onChange={(e) => setOnSaleduration(e.target.value)}></input>
                  </div>  
                  }


                  <div className='flex gap-[20px]'>
                    <div>ადგილზე გვაქვს</div>
                    <input type='checkbox' value={availableOnSpot} onChange={(e) => setAvailableOnSpot(e.target.checked)}></input>
                  </div>     
                  <button onClick={() => addPropertyValue(weight , 'g')}>add Property</button>
                </div>
              ):(
                  <p>აირჩიე ზომა </p>
              )}

            
            </div>
          </div> }
        </div> */}


        <div className=' self-end'>
          <button className=' addToCartBtn' onClick={addProduct}>Add product</button>
        </div> 

      </Form>)}


      </Formik>

     





      
    

    </div>
  )
})


export default ProductAdd