import React, { memo, useEffect, useState} from 'react';
import {auth, functions} from '../config/firebase'
import useUserDocRef from '../Hooks/useUserDocRef';
import useGetUserInfo from '../Hooks/useGetUserInfo';
import { updateDoc } from 'firebase/firestore';
import { signOut, updateProfile } from 'firebase/auth';
import Field from './ProfileComponents/Field';
import OrderService from './OrderService';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { setSelectedUserId } from '../Redux/Slices/usersSlice';
import useGetNotification from '../Hooks/useGetNotification';
import { httpsCallable } from 'firebase/functions';



const PersonProfile = memo(({profilePictureLoading , setImageUpload , uploadImage , docRef }) => {

  const dispatch = useDispatch()
  const userData = useGetUserInfo()

  const {selectedUserId} = useSelector(state => state.usersSlice)
  // var selectedUserId =  localStorage.getItem("selectedUserId");
  // const {displayName} = useSelector(state => state.logedUserSlice)


  

  const [nameEdit , setNameEdit] = useState(false)
  const [bioEdit , setBioEdit] = useState(false)





  const [nameValue , setNameValue] = useState(auth.currentUser?.displayName)
  const [bioValue , setBioValue] = useState('')



  const [orderToggle , setOrderToggle] = useState(false)
  const [soloWalk , setSoloWalk] = useState(false)
  const [groupWalk , setGroupWalk] = useState(false)




  const handleDeleteAccount = async () => {
    try {
      const deleteUserFunction = httpsCallable(functions, 'deleteUserAndProfileImage');
      await deleteUserFunction();
      window.location.reload();
    } catch (error) {
      console.error("Error deleting account:", error.message);
      // Handle error here
    }
  };
  


  const orderSoloWalk = () => {
    setOrderToggle(true)
    setSoloWalk(true)
  }


  const orderGroupWalk = () => {
    setOrderToggle(true)
    setGroupWalk(true)
  }

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
   
    const updatedWorkDates = [...userData.walking.workDates];
    updatedWorkDates[index].isFree = !isFree;

    updateDoc(docRef, {
      walking:{
        ...userData.walking,
        workDates: updatedWorkDates
      }
      ,
    });
  }

  
  const setReadyToWork = () => {
    updateDoc(docRef, {readyToWork:true})
  }


  


  const { id } = useParams();

  useEffect(() => {
    if(id){
      localStorage.setItem('selectedUserId', id); 
      console.log('udris')
    }else{
      localStorage.setItem('selectedUserId', auth.currentUser.uid); 
      // dispatch(setSelectedUserId(auth.currentUser.uid))
      console.log('ar udris')

    }
  },[id])



  useEffect(()=>{
    if(userData){
      setNameValue(userData.displayName)    
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
            <img src={userData.photo} />
          }
          
        </div>
        <input type='file' onChange={(e) => setImageUpload(e.target.files[0])}></input>
        <button onClick={uploadImage}>Upload Image</button>
      </div>



      <div>
        <div className='text-[20px] font-bold'>ზოგადი ინფო</div>

        <Field  fieldName='სახელი' editState={nameEdit}  newValue={nameValue}  setNewValue={setNameValue} setEditState={setNameEdit} editNameFunc={editName} valueToDisplay={nameValue}/>


        <div>
          <div>დაბადების თარიღი</div>
          <div></div>
        </div>

        <div>
          <div>Email</div>
          <div></div>
        </div>



        <div>
          <div>დასაქმების ტიპი / statusi</div>
          <div>{userData?.activity}</div>
        </div>

        <div>
          <div>ტელეფონის ნომერი</div>
          <div></div>
        </div>
        
      </div>



      <div>
        <div className='text-[20px] font-bold'>მისამართი</div>
        
        <div>
          <div>ქუჩა</div>
          <div></div>
        </div>

        <div>
          <div>ქალაქი</div>
          <div></div>
        </div>
      </div>



      <div>
        <div className='text-[20px] font-bold'> მომუშავესი</div>


        <div>
          <div>სამუშაო გრაფიკი</div>
          <ul className='flex gap-[10px]'>


          {userData ? (
            userData?.walking?.workDates?.map((date , index) => (
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

        <div>
          <div>რეიტინგი</div>
          <div></div>
        </div>

        <button className='bg-green-200 p-[10px] text-[20px] m-[30px] border-2 border-black rounded-[20px]' onClick={setReadyToWork}>Start Working</button>

      </div>




      


     
      
     
      {/* HARD Coded */}
      <div className='flex gap-[50px] '>
      
        <div onClick={orderSoloWalk} className=' cursor-pointer border-2 p-[20px] rounded-[20px] border-black'>
          <p>Solo walks</p>
          <ul>
            <li>1საათი - 25ლ</li>
            <li>45წუთი - 15ლ</li>
            <li>30წუთი - 10ლ</li>
            <li>20წუთი - 5ლ</li>
          </ul>
        </div>

        <button onClick={handleDeleteAccount}>
          Delete Account
        </button>

        <div  onClick={orderGroupWalk} className=' cursor-pointer border-2 p-[20px] rounded-[20px] border-black'>
          <p>Group walks</p>
          <ul>
            <li>1საათი - 25ლ</li>
            <li>45წუთი - 15ლ</li>
            <li>30წუთი - 10ლ</li>
            <li>20წუთი - 5ლ</li>
          </ul>
        </div>
      </div>

      {orderToggle && (
        <div className=' absolute top-0 bottom-0 left-0 right-0 bg-[rgba(9,9,9,0.82)] flex items-center justify-center'>
          <OrderService pricing={soloWalk ? userData.walking.services?.soloWalk : userData.walking.services?.groupWalk} recipientId={userData.id}/>
        </div>
      )}
    </div>
    

    
  )
})


export default PersonProfile