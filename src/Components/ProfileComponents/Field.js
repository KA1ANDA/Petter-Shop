import React, { memo, useState} from 'react';
import { RiEdit2Fill } from "react-icons/ri";
import { auth } from '../../config/firebase';
import useGetUserInfo from '../../Hooks/useGetUserInfo';
import { useSelector } from 'react-redux';



const Field = memo(({fieldName ,editState , newValue , setNewValue , setEditState , editNameFunc , valueToDisplay}) => {

  const userData = useGetUserInfo()

  const {isLoged} = useSelector(state => state.logedUserSlice)


  return(  
      <div className='bg-orange-300 flex flex-col gap-[10px]'>
        <div className='flex justify-between items-center'>
          <div>
            <div>{fieldName}</div>
            {editState ? 
              <input value={newValue} onChange={(e) => setNewValue(e.target.value)}></input>
            :
              <div>{valueToDisplay ? valueToDisplay : 'no information found'}</div>
            }
          </div>
          {editState && isLoged ? 
            <button className='bg-green-400 border border-black' onClick={editNameFunc}>Save</button>
          :
            userData.id === auth.currentUser.uid &&
            <div className='text-[20px] cursor-pointer' onClick={() => setEditState(true)}><RiEdit2Fill /></div>
          }  
          
        </div>
        

        
      </div>
 
  )
})


export default Field