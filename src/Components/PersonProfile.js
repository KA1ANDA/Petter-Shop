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
import ShippingAddress from './shopComponents/ShippingAddress';
import useShippingAddress from '../Hooks/ShopHooks/useShippingAddress';
import { IoPawSharp } from "react-icons/io5";
import { FaBookmark, FaUser } from 'react-icons/fa';
import Loader from './Loader';
import profileDefault from './shopComponents/Photos/profileDefault.png'

const PersonProfile = memo(({profilePictureLoading , setImageUpload , uploadImage , docRef }) => {

  const dispatch = useDispatch()
  const userData = useGetUserInfo()
  const { addShippingAddress,deleteShippingAddress,setActiveAddress, error, loading } = useShippingAddress();
 
  
  const {selectedUserId} = useSelector(state => state.usersSlice)
  const {shippingAddress} = useSelector(state => state.shopFilterSlice)

  
  // var selectedUserId =  localStorage.getItem("selectedUserId");
  // const {displayName} = useSelector(state => state.logedUserSlice)


  const [showShippingAddress, setShowShippingAddress] = useState(false); // Initial active tab
  
  const [activeTab, setActiveTab] = useState('information'); // Initial active tab

  const [toggleProfileNav, setToggleProfileNav] = useState(false); // Initial active tab


  const tabs = [
    { name: 'information', label: 'Information' },
    { name: 'addresses', label: 'Addresses' },
    { name: 'cards', label: 'Cards' },
    { name: 'orders', label: 'Orders' },
    
  ];

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };


 

  
  const [nameEdit , setNameEdit] = useState(false)
  const [bioEdit , setBioEdit] = useState(false)
  const [deleteAccConfirm , setDeleteAccConfirm] = useState(false)





  const [nameValue , setNameValue] = useState(auth.currentUser?.displayName)
  const [bioValue , setBioValue] = useState('')



  const [orderToggle , setOrderToggle] = useState(false)
  const [soloWalk , setSoloWalk] = useState(false)
  const [groupWalk , setGroupWalk] = useState(false)


  const activeAddress = userData?.shippingAddress?.find((address) => address.activeAddress);

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
   
    const updatedWorkDates = [...userData?.walking.workDates];
    updatedWorkDates[index].isFree = !isFree;

    updateDoc(docRef, {
      walking:{
        ...userData?.walking,
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
    <div className='grid grid-cols-1  xl:grid-cols-[1fr,2fr] gap-[50px]   rounded-standart  '>


     
        <div className= {`${toggleProfileNav && ' w-[320px] fixed top-0 left-[0px] bottom-0  '} fixed  top-0 -left-[320px] xl:relative  xl:top-0 xl:left-0   transition-all duration-300  bg-white  h-full  border-2 border-primary  rounded-standart shadow-lg shadow-black  flex flex-col gap-[30px] z-[999] xl:z-0`} >

          <div onClick={() => setToggleProfileNav(!toggleProfileNav)} className={`${toggleProfileNav ? '-right-[40px]' : '-right-[40px]'} cursor-pointer block xl:hidden absolute  top-[100px]   font-bold  transition-all duration-300`}>
            <div className= {`${toggleProfileNav ? 'absolute  right-5 top-5' : 'absolute  right-2 top-5'} text-primary transition-all duration-300 text-h4 z-30 text-center`}><FaUser /></div>
            <div className='text-secondary rotate-90 text-h1' ><FaBookmark /></div>
          </div>
          

          <div className='  flex flex-col justify-center items-center py-[20px]'>
            <div className=' relative '>
              
              <div className='  rounded-[50%] overflow-hidden object-cover  flex justify-center items-center w-[200px] h-[200px] border-2 shadow-lg shadow-black border-primary'>
               {userData?.photo ?
                  <img className=' border-[50%] w-full h-full ' src={userData?.photo} />
                  :
                  <img className='h-full w-full' src={profileDefault}/>
               }
                
              </div>

              <input type='file' id='profileImgFile' className=' hidden' onChange={(e) => setImageUpload(e.target.files[0])}></input>
              <label htmlFor='profileImgFile' className=' cursor-pointer absolute bottom-0 right-2  bg-primary p-[10px] border-2 border-primary shadow-lg shadow-black rounded-[50%] text-secondary font-bold text-h3'><IoPawSharp /></label>
            </div>
          
          
          </div>
          

          <div className=' w-full flex flex-col gap-[30px] p-[30px] rounded-standart'>
            {tabs.map((tab) => (
              <div
                key={tab.name}
                onClick={() => handleTabChange(tab.name)}
                className={`hover:bg-primary flex flex-row justify-center items-center gap-[30px] hover:text-white p-[10px] text-h4 text-center cursor-pointer rounded-standart border-2 border-primary ${activeTab === tab.name ? 'bg-primary text-white  ' : ''}`}
              >
                
                <div className={`${activeTab === tab.name ? 'text-secondary font-bold rotate-90  ' : ' hidden'}`}><IoPawSharp/></div>
                <div>{tab.label}</div>
                <div className={`${activeTab === tab.name ? 'text-secondary font-bold   -rotate-90 ' : ' hidden'}`}><IoPawSharp/></div>
                
              </div>
            ))}
          </div>
        </div>
   

      
      <div className=' '>
        
        {activeTab === 'information' && (
          <div className=' flex flex-col  gap-[30px]   '>
            <div className='font-bold text-h4 md:text-h3 bg-primary text-white rounded-standart px-[30px] py-[5px] shadow-md shadow-black'>ზოგადი ინფო</div>

            <div className='w-full bg-white   border-2 border-primary  gap-[100px] rounded-standart p-[10px] sm:p-[30px] shadow-lg shadow-black flex flex-col  '>
              <div className=' flex flex-col gap-[30px]'>
                <Field   fieldName='სახელი' editState={nameEdit}  newValue={nameValue}  setNewValue={setNameValue} setEditState={setNameEdit} editNameFunc={editName} valueToDisplay={nameValue}/>

              
                <div className=' grid grid-cols-3  border-b-2 border-primary  p-[15px] ' >
                  <div className='font-bold text-h6 md:text-h4 '>Email</div>
                  <div className='font-bold text-h6 md:text-h4 '>{auth.currentUser.email}</div>
                </div>

              </div>
             
      
              <button className=' bg-additional  p-[20px] rounded-standart text-h5 md:text-h4 font-bold text-white' onClick={() => setDeleteAccConfirm(true)}>
                Delete Account
              </button>

              {deleteAccConfirm && (
                <div className='fixed top-0 bottom-0 left-0 right-0 z-[9999] justify-center items-center flex   bg-[rgba(9,9,9,0.82)] overflow-hidden'>
                  <div className='flex flex-col gap-[30px]  w-[300px]  bg-white rounded-standart  sm:w-fit p-[30px]'>
                    <div className='flex flex-col justify-center items-center text-center text-h6 sm:text-h5 font-bold'>
                      <p> დარწმუნებული ხართ რომ გსურთ ანგარიშის წაშლა?</p>
                      <p>თქვენი მონაცემები სამუდამოდ წაიშლება</p>
                    </div>
                    <div className='flex justify-between text-white font-bold sm:px-[50px]'>
                      <div onClick={() => setDeleteAccConfirm(false)} className=' bg-primary px-[30px] sm:px-[50px] py-[10px] rounded-standart cursor-pointer' >არა</div>
                      <div onClick={() => {handleDeleteAccount() ; setDeleteAccConfirm(false)}} className=' bg-additional px-[30px] sm:px-[50px] py-[10px] rounded-standart cursor-pointer'>დიახ</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
              
            



            


            
            
          </div>
        )}

        
{activeTab === 'addresses' && (
  <div className='flex flex-col gap-[30px]'>
    <div className='font-bold text-h3 bg-primary text-white rounded-standart px-[30px] py-[5px] shadow-md shadow-black'>მისამართი</div>
    
    <div className='bg-white border-2 border-primary rounded-standart bg-secondaryrounded-standart shadow-lg shadow-black p-[30px] gap-[60px] flex flex-col'>
      {loading ? (
         <div className="flex w-[100px] h-[100px]  m-auto justify-center items-center">
         <Loader />
      </div>
      ) : (
        <>
          {!showShippingAddress && userData?.shippingAddress.length > 0 && (
            <div className='flex flex-col gap-[30px]'>
              <div className='flex flex-col gap-[20px]'>
                <div className='font-bold text-h4'>არჩეული მისამართი</div>
                <div>
                  <Address address={activeAddress} deleteShippingAddress={deleteShippingAddress} setActiveAddress={setActiveAddress} />
                </div>
              </div>
              {userData?.shippingAddress.length > 0 && (
                <div className='bg-white max-h-[400px] overflow-y-auto border-2 border-primary rounded-standart flex flex-col gap-[30px] p-[10px] md:p-[50px] text-center w-full'>
                  {userData?.shippingAddress.map((address) => (
                    <Address key={address.id} address={address} deleteShippingAddress={deleteShippingAddress} setActiveAddress={setActiveAddress} />
                  ))}
                </div>
              )}
            </div>
          )}
          
          {!showShippingAddress && (
            <div onClick={() => setShowShippingAddress(true)} className='cursor-pointer bg-lightPrimary border-2 border-primary rounded-standart text-h4 md:text-h3 font-bold text-center w-full'>+ დაამატე მისამართი</div>
          )}
          
          {showShippingAddress && (
            <div className='flex flex-col'>
              <div onClick={() => setShowShippingAddress(false)} className='text-h4 font-bold flex justify-end cursor-pointer'>X</div>
              <div className='flex flex-col gap-[50px]'>
                <ShippingAddress />
                <button onClick={() => { addShippingAddress(shippingAddress); setShowShippingAddress(false) }} className='addToCartBtn'>
                  Save
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  </div>
)}
        
        



        
      </div>

     


      {/* ES JER AR MINDA SANAM SERVISEBI ARAAA!!!!!!!!!!!!!!!!!!!!!!!!!! */}
      {/* <div>
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

      </div> */}




      


     
      
     
      {/* HARD Coded */}
      {/* ES JER AR MINDA SANAM SERVISEBI ARAAA!!!!!!!!!!!!!!!!!!!!!!!!!!
      {/* <div className='flex gap-[50px] '>
      
        <div onClick={orderSoloWalk} className=' cursor-pointer border-2 p-[20px] rounded-[20px] border-black'>
          <p>Solo walks</p>
          <ul>
            <li>1საათი - 25ლ</li>
            <li>45წუთი - 15ლ</li>
            <li>30წუთი - 10ლ</li>
            <li>20წუთი - 5ლ</li>
          </ul>
        </div>

        

        <div  onClick={orderGroupWalk} className=' cursor-pointer border-2 p-[20px] rounded-[20px] border-black'>
          <p>Group walks</p>
          <ul>
            <li>1საათი - 25ლ</li>
            <li>45წუთი - 15ლ</li>
            <li>30წუთი - 10ლ</li>
            <li>20წუთი - 5ლ</li>
          </ul>
        </div>
      </div> */}

      {/* {orderToggle && (
        <div className=' absolute top-0 bottom-0 left-0 right-0 bg-[rgba(9,9,9,0.82)] flex items-center justify-center'>
          <OrderService pricing={soloWalk ? userData.walking.services?.soloWalk : userData.walking.services?.groupWalk} recipientId={userData.id}/>
        </div>
      )} */}
    </div>
    

    
  )
})


export default PersonProfile





const Address = memo(({address , deleteShippingAddress , setActiveAddress}) => {

  return(
    
    <div>
    {address && 
      <div className='flex flex-col justify-center rounded-standart shadow shadow-black'>
                               
                              <div className=' bg-primary text-white grid grid-cols-1 md:grid-cols-3  text-center font-bold rounded-t-standart'>
                                <div className='hidden md:block'>მიმღები</div>
                                <div>მისამართი</div>
                                <div className='hidden md:block'>ტელეფონის ნომერი</div>
                              </div>

                              <div onClick={() => setActiveAddress(address.id)} className=' cursor-pointer bg-lightPrimary grid grid-cols-1 md:grid-cols-3 justify-center items-center p-[10px] rounded-b-standart'>
                                <div className=' flex-col  hidden md:flex' >
                                  <div className='text-center'>{address.firstName}</div>
                                  <div className='text-center'>{address.lastName}</div>
                                </div>
                                <div className='flex flex-col text-start w-full'>
                                  <div className=' '>{address.city} , {address.address}, {address.district}</div>
                                  <div className=' '>{address.additionalAddressInfo}</div> 
                                </div>
                                <div className='text-center hidden md:block'>{address.phoneNumber}</div>       
                              </div>
                              {!address.activeAddress === true && <div  className=' rounded-b-standart text-white font-bold bg-additional cursor-pointer ' onClick={() => deleteShippingAddress(address.id)}>REMOVE</div>}
        
      </div>}
    </div>
  )
})
