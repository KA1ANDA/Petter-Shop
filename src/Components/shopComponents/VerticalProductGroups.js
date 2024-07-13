import React, { memo, useEffect, useState } from 'react';
import HorizontalSwiper from './Swiper/HorizontalSwiper';
import useGetSelectedProduct from '../../Hooks/ShopHooks/useGetSelectedProduct';
import useGetProducts from '../../Hooks/ShopHooks/useGetProducts';
import AverageRating from './Raiting/AverageRating';
import ProductPrice from './ProductPrice';
import useGetProductPhotos from '../../Hooks/ShopHooks/useGetProductPhotos';
import useProductRating from '../../Hooks/ShopHooks/useProductRating';
import useGetProductPrice from '../../Hooks/ShopHooks/useGetProductPrice';
import { Link } from 'react-router-dom';




const VerticalProductGroups = memo(() => {



  const {sortedProducts , products} = useGetProducts({
    sortValue: 'averageRating',
    sortDirection: 'desc',
  })


  const { sortedProducts: latestProducts } = useGetProducts({
    sortValue: 'uploadTime',
    sortDirection: 'desc',
  });


  const hasOnSale = (product) => {
    const onSaleSize = product.sizes.find((size) => size.additionalOnSale !== 0);
    return !!product.onSalePrice || !!onSaleSize;
  };

  // Filter products based on the condition
  const onSaleProducts = products.filter(hasOnSale); {onSaleProducts &&
            onSaleProducts.map((product) => <Item key={product.id} product={product} />)}


            

  return(
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-[30px] ' >
      <div className=' flex flex-col gap-[40px] '>
        <div className='text-h3 font-extrabold'>Top Rated Products</div>
        <div className='flex flex-col gap-[30px] '>
          {sortedProducts && sortedProducts.slice(0, 3).map(product => <div className=' flex flex-col gap-[30px]'><Item key={product.id} product={product}/> <hr className=' text-[#ede8f8]' /></div> )}
        </div>
      </div>

      <div className='flex flex-col gap-[40px]'>
        <div className='text-h3 font-extrabold'>On Sale Products</div>
        <div  className='flex flex-col gap-[30px]'>
        {onSaleProducts &&
            onSaleProducts.slice(0, 3).map((product) =><div className=' flex flex-col gap-[30px]'> <Item key={product.id} product={product} /> <hr  className=' text-[#ede8f8]'/> </div>)}
        </div>
      </div>


      <div className=' flex flex-col gap-[40px]'>
        <div className='text-h3 font-extrabold'>New Products</div>
        <div  className='flex flex-col gap-[30px]'>
          {latestProducts && latestProducts.slice(0, 3).map(product => <div className=' flex flex-col gap-[30px]'><Item product={product}/> <hr  className=' text-[#ede8f8]'/></div>)}
        </div>
      </div>
    </div>
  )
})









const Item = memo(({product}) => {

  const {price , onSalePrice } =useGetProductPrice({product})

  const {photoUrls} = useGetProductPhotos({product})
  const {averageRating} = useProductRating({productId:product?.id}) 

  
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); 

  return(
    <Link to={`Products/${product.id}`}>
      <div className={`${onSalePrice && !isMobile ? 'sale' : ''} relative z-0 flex  gap-[30px] max-h-[110px] `}>
        <div className={`relative w-[115px] h-[115px] ${onSalePrice && isMobile ? 'sale' : ''}`}>
          <img className='  w-full h-full object-cover rounded-standart ' src={photoUrls[0]}/>
        </div>
        <div className='flex flex-col gap-[10px] max-w-[130px]'>
          <div className='flex flex-col gap-[5px]'>
            <div className=' max-w-[175px] truncate sm:whitespace-normal sm:overflow-visible sm:text-wrap sm:max-w-full  text-h4 font-extrabold leading-[30px] defaultTextHover' >{product.title}</div>
            <div>
              <AverageRating averageRating={averageRating}/>
            </div>
          </div>
          
          <div className='text-[22px]'>
            <ProductPrice  price={price} onSalePrice={onSalePrice}  />
          </div>    
        </div>
      </div>
    </Link>
  )
})


export default VerticalProductGroups