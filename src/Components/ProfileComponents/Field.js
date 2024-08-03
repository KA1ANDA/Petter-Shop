import React, { memo, useState} from 'react';
import { RiEdit2Fill } from "react-icons/ri";
import { auth } from '../../config/firebase';
import useGetUserInfo from '../../Hooks/useGetUserInfo';
import { useSelector } from 'react-redux';



const Field = memo(({fieldName ,editState , newValue , setNewValue , setEditState , editNameFunc , valueToDisplay}) => {

  const userData = useGetUserInfo()

  const {isLoged} = useSelector(state => state.logedUserSlice)


  return(  
     
        <div className='grid grid-cols-2 grid-rows-2  gap-[30px] sm:gap-[0px] sm:grid-rows-1 sm:grid-cols-3 justify-center items-center relative border-b-2 border-primary  p-[15px]  '>

          <div className= ' font-bold text-h6 md:text-h4 ' >{fieldName}</div>

          
            
            {editState ? 
              <input className=' outline-1 outline-primary' value={newValue} onChange={(e) => setNewValue(e.target.value)}></input>
            :
              <div className='font-bold text-h6 md:text-h4 '>{valueToDisplay ? valueToDisplay : 'no information found'}</div>
            }
          

          {editState && isLoged ? 
            <button className='text-h6 md:text-h5 flex gap-[20px] sm:absolute col-span-2 right-0 px-[10px] md:px-[20px] justify-center items-center cursor-pointer  bg-lightPrimary border-2 rounded-standart h-fit p-[5px] hover:bg-primary hover:text-white' onClick={editNameFunc}>Save</button>
          :
            userData?.id === auth.currentUser.uid &&
            <div className='text-h6 md:text-h5 flex gap-[20px] sm:absolute col-span-2 right-0 px-[10px] md:px-[20px] justify-center items-center cursor-pointer  bg-lightPrimary border-2 rounded-standart h-fit p-[5px] hover:bg-primary hover:text-white' onClick={() => setEditState(true)}> 
              <div>Edit</div>
              <div><RiEdit2Fill /></div>  
            </div>
          }  
          
        </div>
        

        
      
 
  )
})


export default Field