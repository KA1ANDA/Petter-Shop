import React, { memo, useEffect, useState } from 'react';
import {auth, db, getUserInfo, storage} from '../config/firebase'
import {ref , uploadBytes , getDownloadURL, deleteObject} from 'firebase/storage'
import { updateProfile } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setProfilePictureLoading } from '../Redux/Slices/logedUserSlice';
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import useUserDocRef from '../Hooks/useUserDocRef';


const ProfilePage = memo(() => {
  const docRef = useUserDocRef();
  const dispatch = useDispatch()
  const [imageUpload , setImageUpload] = useState(null)
  // const [loading , setLoading] = useState(false)

  const {profilePictureLoading} = useSelector((state) => state.logedUserSlice)


  const deletePreviousPhoto = async () => {
    const previousPhotoRef = ref(storage, 'profileImages/'  + auth.currentUser.uid);
    await deleteObject(previousPhotoRef);
  };


  const uploadImage = async() => {
    if(imageUpload == null) return;

    const imageRef = ref(storage, 'profileImages/' + auth.currentUser.uid )

    //MTAVARI! AQTIUR USERS VPOULOB , gavitano calke es kodis nawili
    // const q = query(collection(db, 'users'), where('id', '==', auth.currentUser.uid));
    // const querySnapshot = await getDocs(q);
    // const docRef = querySnapshot.docs[0].ref; 

 

    if(auth.currentUser.photoURL && auth.currentUser.providerData[0].providerId=="password"){
      await deletePreviousPhoto();
    }
   

    await uploadBytes(imageRef, imageUpload).then(()=>{

      alert('image uploaded')
      dispatch(setProfilePictureLoading(true))

      getDownloadURL(imageRef).then((downloadURL) => {

        updateProfile(auth.currentUser, { photoURL: downloadURL }).then(()=>{
          dispatch(setProfilePictureLoading(false))
          setImageUpload(null)
        })

        updateDoc(docRef, {photo: downloadURL});

      });
    })
  }

 


  return(
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
  )
})


export default ProfilePage