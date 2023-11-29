import React, { memo, useEffect, useState } from 'react';
import {auth, db, getUserInfo, storage} from '../config/firebase'
import {ref , uploadBytes , getDownloadURL, deleteObject} from 'firebase/storage'
import { updateProfile } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setProfilePictureLoading } from '../Redux/Slices/logedUserSlice';
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import useUserDocRef from '../Hooks/useUserDocRef';
import PersonProfile from '../Components/PersonProfile';
import useGetUserInfo from '../Hooks/useGetUserInfo';


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
      <PersonProfile  profilePictureLoading={profilePictureLoading}  setImageUpload={setImageUpload}  uploadImage={uploadImage}  docRef={docRef} />
    </div>
  )
})


export default ProfilePage