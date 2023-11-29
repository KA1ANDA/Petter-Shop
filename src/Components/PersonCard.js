import React, { memo } from 'react';


const PersonCard = memo(({name , about , photo}) => {

  return(
    <div className=' bg-pink-400 flex flex-col '>
      <img className='w-[100px] h-[100px] object-cover self-center' src={photo}/>
      <div className='text-[20px] font-bold'>{name}</div>
      <div className='flex gap-[30px]'>
        <div>salary</div>
        <div>region</div>
      </div>
      <div>{about}</div>  
    </div>
  )
})


export default PersonCard