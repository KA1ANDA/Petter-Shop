import React, { memo, useEffect, useState } from 'react';
import useGetCategories from '../../Hooks/ShopHooks/useGetCategories';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import useFilterByCategory from '../../Hooks/ShopHooks/useFilterByCategory';
import { NavLink } from 'react-router-dom';
import { setCategoryValue, setPetCategoryValue } from '../../Redux/Slices/shopFilterSlice';
import { useDispatch } from 'react-redux';


const ByPetTypeCatgories = memo(() => {
 
  const {petCategories} = useGetCategories()

  console.log(petCategories , 'gggggggggggg')
  return(
    <div className='bg-white flex flex-col gap-[20px]  '>
      <div className='flex flex-col items-start md:justify-center md:items-center'>
        <div className=' text-primary text-h6 font-bold '>OUR CATEGORY</div>
        <div className=' text-h3  md:text-h2 font-extrabold'>Explore by Pet Type</div>
      </div>

      <div className='  grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3 gap-[30px]'>
        {petCategories && petCategories.map((petCategorie) => 
        <div   style={{ borderColor: `${petCategorie.color}` , backgroundImage: `url(${petCategorie.decorURL})`,
        backgroundSize: 'contain',
        backgroundPosition: ' right', }} className=' bg-no-repeat  border-2  grid grid-cols-1  sm:grid-cols-2 rounded-standart  justify-start relative'  >
          <div className={` ${petCategorie.margin && ` relative -left-[10px]`} hidden sm:block   `}>
            <img src={petCategorie.photoURL}/>
          </div>
          
          <div className='  m-7 flex flex-col gap-5 z-40  '>
            <div className=' text-h4 font-extrabold'>Shop {petCategorie.name}</div>
            <ul className=' grid grid-cols-2 gap-x-[45px] gap-y-[10px] list-disc text-h6 font-normal leading-5'>
              {petCategorie.categories ?
                petCategorie.categories.map((categorie) => <AsyncCategoryName categoryId={categorie} petId={petCategorie.id} />)
                :
                <div>No Categorie Found</div>
              }
            </ul>

            
          </div>

          {/* <div className=''>
            <img className='absolute  right-0  bottom-0 rounded-br-standart' src={petCategorie.decorURL}/> 
          </div> */}
        </div>
        )}
      </div>
     
    </div>
  )
})



const AsyncCategoryName = memo(({ categoryId , petId}) => {

  const dispatch = useDispatch()


  const [categoryName, setCategoryName] = useState("Loading...");
  // const [categoryId , setCategoryId] = useState()
  // const [petId , setPetId] = useState()

  const {handleCategory , handlePetCategory} = useFilterByCategory()

  const setByPetTypeCategories = () => {
    if (categoryId && petId) {
          // handleCategory(categoryId);
          // handlePetCategory(petId);
          dispatch(setCategoryValue(categoryId));
          dispatch(setPetCategoryValue(petId));
        } 
      
  }

  useEffect(() => {
    const categoryRef = doc(db, 'categories', categoryId);
    getDoc(categoryRef)
      .then((docSnapshot) => {
        if (docSnapshot.exists) {
          const categoryData = docSnapshot.data();
          setCategoryName(categoryData.name);
        } else {
          setCategoryName("Category not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching category:", error);
        setCategoryName("Error fetching category");
      });
  }, [categoryId]);

  return <li className='liHover'>
    <NavLink  to={{
    pathname: '/Shop/Products',
    search: `?category=${categoryId}&petcategory=${petId}`, // Include both category and petcategory in the URL
  }} onClick={setByPetTypeCategories}><div>{categoryName}</div></NavLink>
  </li> 
});


export default ByPetTypeCatgories