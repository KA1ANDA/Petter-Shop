import React, { memo } from 'react';
import useGetServiceInfo from '../Hooks/useGetServiceInfo';


const Information = memo(() => {
  

  const service = useGetServiceInfo()





  console.log(service)
  return(
    <div className='bg-orange-200 flex justify-between'>
      <div className='flex flex-col'>
        <div>navigacia</div>
        <div className='flex flex-col'>
          <div>{service ? service?.service : 'Our Services'}</div>
          <div>{service ? service?.description : 'Blandit cursus risus at ultrices. Enim sit amet venenatis urna cursus eget nunc scelerisque'}</div>
        </div>
      </div>
      <div>PHOTO</div>
    </div>
  )
})


export default Information