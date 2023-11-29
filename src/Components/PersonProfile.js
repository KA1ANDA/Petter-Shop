import React, { memo, useEffect, useState} from 'react';
import {auth} from '../config/firebase'
import useUserDocRef from '../Hooks/useUserDocRef';
import useGetUserInfo from '../Hooks/useGetUserInfo';
import { updateDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import Field from './ProfileComponents/Field';



const PersonProfile = memo(({profilePictureLoading , setImageUpload , uploadImage , docRef }) => {


  const userData = useGetUserInfo()

  const [nameEdit , setNameEdit] = useState(false)
  const [bioEdit , setBioEdit] = useState(false)



  const [nameValue , setNameValue] = useState(auth.currentUser.displayName)
  const [bioValue , setBioValue] = useState('')




  const editName = () => {
    // updateDoc(docRef, {displayName:nameValue}) 
    updateProfile(auth.currentUser, {displayName:nameValue}).then(() => {
      updateDoc(docRef, {displayName:auth.currentUser.displayName})
    })
    setNameEdit(false)
  }


  const editBio = () => {
    updateDoc(docRef, {about:bioValue})
    setBioEdit(false)
  }


  
  const setWorkSchedule = (index , isFree) => {
   
    const updatedWorkDates = [...userData.workDates];
    updatedWorkDates[index].isFree = !isFree;

  updateDoc(docRef, {
    workDates: updatedWorkDates,
  });
  }

  
  const setReadyToWork = () => {
    updateDoc(docRef, {readyToWork:true})
  }


  useEffect(()=>{
    if(userData){
      setBioValue(userData.about)
    }
  },[userData])
  return(
    <div className='bg-purple-400 grid grid-cols-2  '>
      <div className='bg-red-300 m-auto flex flex-col  items-center'>
        <div className=' rounded-[50%] overflow-hidden w-[200px] h-[200px] border border-black'>
          {profilePictureLoading ? 
            <div> loading ... </div>
            :
            <img src={auth.currentUser.photoURL} />
          }
          
        </div>
        <input type='file' onChange={(e) => setImageUpload(e.target.files[0])}></input>
        <button onClick={uploadImage}>Upload Image</button>
      </div>




      <div className='bg-orange-300 flex flex-col gap-[10px]'>
        {/* <div className='flex justify-between items-center'>
          <div>
            <div>სახელი</div>
            {nameEdit ? 
              <input value={nameValue} onChange={(e) => setNameValue(e.target.value)}></input>
            :
              <div>{auth.currentUser.displayName}</div>
            }
          </div>
          {nameEdit ? 
            <button className='bg-green-400 border border-black' onClick={editName}>Save</button>
          :
            <div className='text-[20px] cursor-pointer' onClick={() => setNameEdit(true)}><RiEdit2Fill /></div>
          }  
          
        </div> */}

        <Field  fieldName='სახელი' editState={nameEdit}  newValue={nameValue}  setNewValue={setNameValue} setEditState={setNameEdit} editNameFunc={editName} valueToDisplay={auth.currentUser.displayName}/>
        
        <div>
          <div>თანხა</div>
          <ul>
            <li>30 წუთი - </li>
            <li>45 წუთი -</li>
            <li>60 წუთი -</li>
          </ul>     
        </div>
        
        <div>
          <div>სამუშაო გრაფიკი</div>
          <ul className='flex gap-[10px]'>


          {userData ? (
            userData?.workDates?.map((date , index) => (
              <li onClick={() => setWorkSchedule(index , date.isFree)} key={index} className={` cursor-pointer border text-white border-black p-[5px] ${date.isFree ? "bg-green-700" : "bg-red-700" }`}>
                {date.name}
              </li>
          ))
          ) : (
            <div>Loading...</div>
          )}
        

          </ul>
        </div>
        
        
        <Field  fieldName='შესახებ' editState={bioEdit}  newValue={bioValue}  setNewValue={setBioValue} setEditState={setBioEdit} editNameFunc={editBio} valueToDisplay={bioValue}/>
        
        

        <div>
          <div>კომენტარები</div>
          <div></div>
        </div>

        
        

        

        
      </div>


      <div className=' bg-lime-400 flex flex-col gap-[10px]'>

        <div>
          <div>დაბადების თარიღი</div>
          <div></div>
        </div>
        

        <div>
          <div>ლოკაცია</div>
          <div></div>
        </div>

        <div>
          <div>ტელეფონის ნომერი</div>
          <div></div>
        </div>

        <div>
          <div>რეიტინგი</div>
          <div></div>
        </div>


        <div>
          <div>დასაქმების ტიპი</div>
          <div>{userData?.activity}</div>
        </div>
        

        
      </div>
      
      <button className='bg-green-200 p-[10px] text-[20px] m-[30px] border-2 border-black rounded-[20px]' onClick={setReadyToWork}>Start Working</button>
    </div>
    
  )
})


export default PersonProfile