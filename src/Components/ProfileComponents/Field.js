import React, { memo, useState} from 'react';
import { RiEdit2Fill } from "react-icons/ri";
import { auth } from '../../config/firebase';



const Field = memo(({fieldName ,editState , newValue , setNewValue , setEditState , editNameFunc , valueToDisplay}) => {



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
          {editState ? 
            <button className='bg-green-400 border border-black' onClick={editNameFunc}>Save</button>
          :
            <div className='text-[20px] cursor-pointer' onClick={() => setEditState(true)}><RiEdit2Fill /></div>
          }  
          
        </div>
        

        
      </div>
 
  )
})


export default Field