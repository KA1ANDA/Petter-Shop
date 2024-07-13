  import { collection, getDocs, query } from 'firebase/firestore';
  import React, { memo, useEffect, useState } from 'react';
  import { db, functions } from '../../config/firebase';
  import useGetProducts from '../../Hooks/ShopHooks/useGetProducts';
  import useGetCategories from '../../Hooks/ShopHooks/useGetCategories';
  import Product from '../../Components/shopComponents/Product';
  import useFilterByCategory from '../../Hooks/ShopHooks/useFilterByCategory';
  import useGetSubCategories from '../../Hooks/ShopHooks/useGetSubCategories';
  import { useDispatch, useSelector } from 'react-redux'
  import { setCategoryValue, setPetCategoryValue, setSalesCategory, setSubCategoryValue } from '../../Redux/Slices/shopFilterSlice';
  import PriceRangeSlider from '../../Components/shopComponents/PriceRangeSlider';
  import Pagination from '../../Components/Pagination';
  import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
  import { httpsCallable } from 'firebase/functions';
  import { MdOutlineKeyboardArrowDown } from "react-icons/md";
  import SendEmail from './../../Components/shopComponents/SendEmail'
  import Information from '../../Components/Information';
  import productsBg from './../../Components/shopComponents/Photos/productsBg.png'

  const Products = memo(() => {

    const dispatch = useDispatch()
  
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(() => {
      const pageFromURL = parseInt(searchParams.get('page') || 1);
      // Convert page number from 1-based to 0-based indexing
      return pageFromURL - 1;
    });

    //menu toggles
    const [sortToggle, setSortToggle] = useState(false);



    const [petTypeToggle, setPetTypeToggle] = useState(false);
    const [categoryToggle, setCategoryToggle] = useState(false);
    const [priceRangeToggle, setPriceRangeToggle] = useState(false);
    const [subCategoryToggle, setSubCategoryToggle] = useState(false);


    const [currentSortName, setCurrentSortName] = useState('Sort by latest');
    const [currentSortOption, setCurrentSortOption] = useState('uploadTime-desc');




  
    

    const [sort, setSort] = useState();
    const {categoryValue , petCategoryValue , subCategoryValue, salesCategory } = useSelector(state => state.shopFilterSlice)

  
    const {petCategories, categories} = useGetCategories()
    const {handleCategory , handlePetCategory ,handleSubCategory , handleSalesCategory} = useFilterByCategory()
    const {sortedProducts , filtredProducts , subCategories , productCount} = useGetProducts({
      sortValue: searchParams.get('sort')?.split('-')?.[0],
      sortDirection: searchParams.get('sort')?.split('-')?.[1],

    })

  
    const handleSortChange = (e) => {
      setCurrentSortName(e.target.name)
      setCurrentSortOption(searchParams.get('sort'))
      const selectedSort = e.target.value.split('-');
      setSort({ value: selectedSort[0], direction: selectedSort[1] });
      setSearchParams((prevParams) => {
        const params = {
          ...prevParams,
          sort: selectedSort.join('-')  ,
          page: String(1),
        };
    
        if (categoryValue) params.category = categoryValue;
        if (petCategoryValue) params.petcategory = petCategoryValue;
        if (subCategoryValue) params.subcategory = subCategoryValue;
        if (salesCategory) params.sales = true;
        if (searchParams.has('minPrice')) params.minPrice = searchParams.get('minPrice');
        if (searchParams.has('maxPrice')) params.maxPrice = searchParams.get('maxPrice');
    
        return params;
      });
    };

    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
      setSearchParams((prevParams) => {
        const params = {
          ...prevParams,
          page: String(pageNumber + 1),
        };
    
        if (sort) {
          params.sort = `${sort.value}-${sort.direction}`;
        }
    
        if (categoryValue) params.category = categoryValue;
        if (petCategoryValue) params.petcategory = petCategoryValue;
        if (subCategoryValue) params.subcategory = subCategoryValue;
        if (salesCategory) params.sales = true;
        if (searchParams.has('minPrice')) params.minPrice = searchParams.get('minPrice');
        if (searchParams.has('maxPrice')) params.maxPrice = searchParams.get('maxPrice');
    
        return params;
      });
    };
  
  
    useEffect(() => {
      // Parse the sort value from the URL query parameter
      const sortParam = searchParams.get('sort');
      if (sortParam) {
        const [sortValue, sortDirection] = sortParam.split('-');
        // Set currentSortOption based on the sort value from the URL
        setCurrentSortOption(sortParam);
        // Set currentSortName based on the sort value from the URL
        switch (sortValue) {
          case 'averageRating':
            setCurrentSortName('Sort by average rating');
            break;
          case 'uploadTime':
            setCurrentSortName('Sort by latest');
            break;
          case 'price':
            if (sortDirection === 'asc') {
              setCurrentSortName('Sort by price: low to high');
            } else if (sortDirection === 'desc') {
              setCurrentSortName('Sort by price: high to low');
            }
            break;
          default:
            setCurrentSortName('Sort by latest');
            break;
        }
      }
    }, [searchParams]); 


    useEffect(() => {

      const pageFromURL = parseInt(searchParams.get('page') || 1);
      if (currentPage !== pageFromURL - 1) {
        setCurrentPage(pageFromURL - 1);
      }
    }, [searchParams]); // Only re-run the effect if searchParams changes
    
    // useEffect(() => {
    //   const newPageParam = currentPage + 1;
    //   const currentParam = parseInt(searchParams.get('page') || 1);
    
    //   const params = {
    //     ...Object.fromEntries(searchParams.entries()), // Preserve existing parameters
    //     page: newPageParam,
    //     sort: sort ? `${sort.value}-${sort.direction}` : '',
    //     category: categoryValue || '',
    //     petcategory: petCategoryValue || '',
    //     subcategory: subCategoryValue || '',
    //     sales: salesCategory ? true : '',
    //   };
    
    //   setSearchParams(params);
    // }, [currentPage, sort, categoryValue, petCategoryValue, subCategoryValue, salesCategory]);
    

    const productsPerPage = 9;

    const indexOfLastProduct = (currentPage + 1) * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = (filtredProducts.length > 0 ? filtredProducts : sortedProducts).slice(indexOfFirstProduct, indexOfLastProduct);

    useEffect(() => {
      const newPageParam = currentPage + 1;
    
      const params = {
        ...Object.fromEntries(searchParams.entries()), // Preserve existing parameters
        page: newPageParam,
        sort: sort ? `${sort.value}-${sort.direction}` : 'uploadTime-desc',
        category: categoryValue || '',
        petcategory: petCategoryValue || '',
        subcategory: subCategoryValue || '',
        sales: salesCategory ? true : '',
      };
    
      // Remove empty parameters
      Object.keys(params).forEach((key) => params[key] === '' && delete params[key]);
    
      // Use replace method to update the URL without adding a new history entry
      // setSearchParams(params, { replace: true });  ES GAVTISHE !!!!!!!!
    }, [currentPage, sort, categoryValue, petCategoryValue, subCategoryValue, salesCategory]);

    
    console.log('sortiaaaaaaaaaa' , currentSortName)
    // console.log(filter)

    return(
      <div>
          <Information
       name='Shop'
       description='Blandit cursus risus at ultrices. Enim sit amet venenatis urna cursus eget nunc scelerisque'
       image={productsBg}/>
      
      <div className='flex flex-col w-full px-[15px] 2xl:p-0  2xl:w-[1400px] m-auto gap-[160px] '>
      
    
       
      
        <div className='grid grid-cols-1 lg:grid-cols-12 my-[100px] lg:my-[0px] gap-[60px]  relative '>
          <div className=' order-2 lg:order-1 lg:col-span-8 xl:col-span-9'>

            <div className=' flex   flex-col relative '>
              <div className=' self-end text-h5 w-full sm:w-[280px]  '>
                
              <div className=' flex font-semibold cursor-pointer items-center justify-between  h-[50px] p-[15px] rounded-standart border-[1px] border-lightPrimary' onClick={() => setSortToggle(!sortToggle)}>
                <div>{currentSortName}</div>
                <div><MdOutlineKeyboardArrowDown /></div>    
                </div>

                
                  <div className={` transition-all duration-300  ${sortToggle ? '  opacity-100 ' : ' opacity-0 pointer-events-none'} absolute top-[53px]  z-20 w-full sm:w-[280px]  flex flex-col  border-[1px] border-lightPrimary rounded-standart items-start  bg-white `}  >

                    {/* <div className= {`${currentSortOption === ' ' && 'selectedOption' }hover:bg-[#f6f6f6] w-full h-full rounded-t-standart border-[#f5f5f5] p-[15px]`}> 
                      <button >Sort by popularity</button>
                    </div>
                    */}
                    <button className= {`${currentSortOption === 'averageRating-desc' && 'selectedOption' } hover:bg-[#f6f6f6] w-full h-full border-[1px] text-start border-[#f5f5f5] p-[15px]`} value={'averageRating-desc'} name='Sort by avarage raiting' onClick={handleSortChange}>Sort by avarage raiting</button>

                    <button className= {`${currentSortOption === 'uploadTime-desc' && 'selectedOption' } hover:bg-[#f6f6f6] w-full h-full border-[1px] text-start border-[#f5f5f5] p-[15px]`} value={'uploadTime-desc'} name='Sort by latest' onClick={handleSortChange}>Sort by latest</button>

                    <button className={` ${currentSortOption === 'price-asc' && 'selectedOption' } hover:bg-[#f6f6f6] w-full h-full border-[1px] text-start border-[#f5f5f5] p-[15px] `} value={'price-asc'} name='Sort by price : low to hight' onClick={handleSortChange}>Sort by price : low to hight </button>

                    <button className= {`${currentSortOption === 'price-desc' && 'selectedOption' } hover:bg-[#f6f6f6] w-full h-full  text-start  rounded-b-standart p-[15px] `} value={'price-desc'} name='Sort by price : hight to low' onClick={handleSortChange}>Sort by price : hight to low </button>
                  </div>
              
              </div>
              
            </div>
            
            <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8  gap-y-12 py-[35px]  '>
              {filtredProducts.length === 0 ? (
                <div>Nothing found</div>
              ) : (
              currentProducts.map((product) => (
                <Product key={product.id} product={product} />
                ))
              )}
            </div>

            <div className='  flex justify-start '>
              <Pagination
                productsPerPage={productsPerPage}
                totalProducts={(filtredProducts.length > 0 ? filtredProducts : sortedProducts).length}
                paginate={handlePageChange}
                currentPage={currentPage}
              />
            </div>

            
        
          {/* aq rame vqna da gavasworo */}
            
          </div>


          <div className='   order-1 lg:order-2 lg:col-span-4 xl:col-span-3 flex flex-col gap-[50px] w-full lg:w-auto  h-fit lg:sticky top-0  '>
            <div className={`flex justify-between`}>
              <div onClick={()=>handleSalesCategory(salesCategory)}>Sales</div>
              {salesCategory && <div onClick={() => dispatch(setSalesCategory(false))}>delete</div>}
            </div>
          
            
            <div className={` h-[320px]  ${petTypeToggle && 'h-[80px]' } categoryParent `} >
              

              <div onClick={() => setPetTypeToggle(!petTypeToggle)} className='  flex justify-between items-center text-[25px] cursor-pointer'>
                <div className=' text-h4 font-bold leading-[30px] '>Pet Type</div>
                <div><MdOutlineKeyboardArrowDown /></div>
              </div>

              
              <div  className= {`flex flex-col gap-[20px] transition-all overflow-hidden duration-1000 ease-out  `}>
                {petCategories && petCategories.map((petType) =>

                <div onClick={() => petCategoryValue === petType.id && dispatch(setPetCategoryValue('')) } className={`flex justify-between items-center defaultTextHover  `} > 

                  <div className=' flex items-center gap-[10px] text-h5 font-bold leading-[18px] '>
                  <div className= {`${petCategoryValue === petType.id && 'activeCategory'} w-[16px] h-[16px] rounded-[50%]  border-2 border-lightPrimary`}> </div>
                    <div key={petType.id} onClick={() => handlePetCategory(petType.id , petType.name)} className={`${petCategoryValue === petType.id ? 'bg-red-400' : ''}`}>
                        {petType.name}
                  </div>
      
                </div>

                <div className=' text-h6 font-normal leading-[18px]'>
                      {productCount?.petTypeCounts[petType.id] && (
                        productCount.petTypeCounts[petType.id].count
                      )}
                </div>
                  

                  {/* {petCategoryValue === petType.id && <div onClick={() => dispatch(setPetCategoryValue(''))}>delete</div>} */}

                </div>
                )}
              </div>
            </div>



            <div className={` h-[580px]  ${categoryToggle && 'h-[80px]' } categoryParent  `}>
            
              <div onClick={() => setCategoryToggle(!categoryToggle)} className='  flex justify-between items-center text-[25px] cursor-pointer'>
                <div className=' text-h4 font-bold leading-[30px]'>Categories</div>
                <div><MdOutlineKeyboardArrowDown /></div>
              </div>

              <div  className= {`flex flex-col gap-[20px] transition-all overflow-hidden duration-1000 ease-out  `}>
                {categories && categories.map((category) => 

          

                <div onClick={() => { categoryValue === category.id && dispatch(setCategoryValue(''));dispatch(setSubCategoryValue('')); }} className={`flex justify-between items-center  `}> 

                  <div className=' flex items-center  gap-[10px] text-h5 font-bold leading-[18px] defaultTextHover'>
                    <div className= {`${categoryValue === category.id && 'activeCategory'} w-[16px] h-[16px]  rounded-[50%] border-2 border-lightPrimary`}> </div>
                    <div key={category.id} onClick={() => handleCategory(category.id,category.name)} >
                      {category.name}
                    </div>
                  </div>

                  <div>
                    {productCount?.categoryCounts[category.id] && (
                      productCount.categoryCounts[category.id].count
                    )}
                  </div>

                  {/* {categoryValue === category.id && <div onClick={() =>
                  { 
                    dispatch(setCategoryValue('')); 
                    dispatch(setSubCategoryValue(''));
                  }
                  }>delete</div>} */}
                </div>
                )}
              </div>
            </div>


            <div  className={` h-[230px]  ${priceRangeToggle && 'h-[80px]' } categoryParent  overflow-hidden`} >

              <div onClick={() => setPriceRangeToggle(!priceRangeToggle)} className='  flex justify-between items-center text-[25px] cursor-pointer'>
                <div className=' text-h4 font-bold leading-[30px]'>Price range</div>
                <div><MdOutlineKeyboardArrowDown /></div>
              </div>
              
            
              <PriceRangeSlider/>

            
            
            </div>


          

            {subCategories && categoryValue &&
            <div className={` h-[300px]  ${subCategoryToggle && 'h-[80px]' } categoryParent  overflow-hidden`}>
              {categoryValue && subCategories && 
              <>

                <div onClick={() => setSubCategoryToggle(!subCategoryToggle)} className='  flex justify-between items-center text-[25px] cursor-pointer'>
                  <div className=' text-h4 font-bold leading-[30px]'>Sub Category</div>
                  <div><MdOutlineKeyboardArrowDown /></div>
                </div>    

                <div  className= {`flex flex-col gap-[20px] transition-all overflow-y-auto duration-1000 ease-out   `}>
                  {subCategories.map((subCategory) =>
                  
                <div className={`flex  items-center  gap-[10px] text-h5 font-bold leading-[18px] defaultTextHover `}> 

                  <div className= {`${subCategoryValue === subCategory.id && 'activeCategory'} w-[16px] h-[16px]  rounded-[50%] border-2 border-lightPrimary `}></div>

                  <div key={subCategory.id} onClick={() => handleSubCategory(subCategory.id, subCategory.name)}  >
                    {subCategory.name}
                  </div> 
                </div>
                  ) }
                </div>
              </>  
              }
            {/* className={`${subCategoryValue === subCategory.id ? 'bg-red-400' : ''}`} */}
            </div>
            }
          </div>
        </div>


        <SendEmail />
      </div>
      </div>
    )
  })


  export default Products