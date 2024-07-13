import React, { memo, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {signOut} from 'firebase/auth'
import {auth, db} from "../config/firebase"
import { useDispatch, useSelector } from 'react-redux';
import { setDisplayName, setLogInToggle, setRegistrationToggle } from '../Redux/Slices/logedUserSlice';
import { setSelectedService } from '../Redux/Slices/servicesSlice';
import { setSelectedUserId } from '../Redux/Slices/usersSlice';
import { IoIosNotifications } from "react-icons/io";
import { collection, getDoc, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { IoMdHeart } from "react-icons/io";
import { setCartToggle, setWishlistToggle } from '../Redux/Slices/shopFilterSlice';
import { FaShoppingCart } from "react-icons/fa";
import ShopingCart from './shopComponents/ShopingCart';
import logo from './../Components/shopComponents/Photos/logo.webp'
import { CgProfile } from "react-icons/cg";
import { MdAdminPanelSettings } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { GrMenu } from "react-icons/gr";
import { RxCross1 } from "react-icons/rx";
import useGetSavedProducts from '../Hooks/ShopHooks/useGetSavedProducts';
import CartAndWishlistBtn from './shopComponents/CartAndWishlistBtn';
import SignIn from '../Pages/Authentication/SignIn';
import Registration from '../Pages/Authentication/Registration';


const NavBar = memo(() => {
  const dispatch = useDispatch()

  const [moreInfoToggle , setMoreInfoToggle] = useState(false)
  

  const {isLoged ,isAdmin, displayName , profilePictureLoading , notification , notificationData , logInToggle ,registrationToggle} = useSelector(state => state.logedUserSlice)
  const {cartToggle } = useSelector(state => state.shopFilterSlice)

  const [navbarFade , setNavbarFade] = useState(false)
  const [isScrolledDown, setIsScrolledDown] = useState(false);

  const [responsNavBar , setResponsNavBar] = useState(false)
  const [toggleMenu , setToggleMenu] = useState(false)
  const [aboutDropDown , setAboutDropDown] = useState(false)

  


  const logOut = async() => {
    try{
      await signOut(auth)
    }catch(err){
      console.error(err)
    }
    
  }


  useEffect(()=>{
    if(auth.currentUser?.displayName != ''){
      dispatch(setDisplayName(auth.currentUser?.displayName))
    }
  },[dispatch , auth.currentUser?.displayName])

 

  const setInboxViewed = async () => {

    if(auth.currentUser){
      const notificationRef = query(
        collection(db, "notifications"),
        where("recipientId", "==", auth.currentUser.uid)
      );
    
      
      
        // Get the first document matching the query
      const querySnapshot = await getDocs(notificationRef);
      
      if (querySnapshot.docs.length === 0) {
        // No documents found, handle the case
        return;
      }
      const docRef = querySnapshot.docs[0].ref;
  
      
  
      // Get the existing inbox data
      const docSnap = await getDoc(docRef);
      const inboxData = docSnap.data().inbox;
  
      // Update each notification seen flag to true
      const updatedInboxData = inboxData.map(notification => ({ ...notification, seen: true }));
  
      // Update the document with the updated inbox data
      updateDoc(docRef, { inbox: updatedInboxData });
    }
    
  };

  const handleWishlistToggle = () => {
    dispatch(setWishlistToggle(true))
    dispatch(setCartToggle(false))
    setMoreInfoToggle(false)
  }

  const handleCartToggle = () => {
    dispatch(setCartToggle(!cartToggle))
    setMoreInfoToggle(false)
    
  }
   

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250 && !isScrolledDown) {
        setNavbarFade(true);
        setIsScrolledDown(true); // Set flag after first scroll down
      } else if (window.scrollY <= 50 && isScrolledDown) {
        setNavbarFade(false);
        setIsScrolledDown(false); // Reset flag after scrolling back up
      }
    };

    window.addEventListener('scroll', handleScroll);
    dispatch(setCartToggle(false))
    setMoreInfoToggle(false)
    return () => window.removeEventListener('scroll', handleScroll); // Cleanup listener
  }, [isScrolledDown]);


  useEffect(() => {
    const handleResize = () => {
      // Update state to hide navigation on 1200px or wider screens
      setResponsNavBar(window.innerWidth <= 1280);
    };

    // Add event listener to handle window resize
    window.addEventListener('resize', handleResize);

    // Initial check on component mount
    handleResize();

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  
  return(
    <div className={` bg-white xl:bg-transparent p-[15px] 2xl:px-0 w-full 2xl:w-[1400px] m-auto xl:py-[40px] flex justify-between transition-all duration-500 ease-in-out items-center z-10 absolute  left-0 right-0 top-0 ${responsNavBar && 'sticky z-50'} ${navbarFade && !responsNavBar && 'navbarFade'} `}  >

      <div className=' flex w-full  2xl:w-[1400px]   justify-between items-center m-auto'>
      <NavLink to='/'>
        <img src={logo} className=' max-w-[180px]'/>
      </NavLink>
       
      {!responsNavBar && 
        <ul className=' navigation flex gap-[60px] text-h5 font-bold relative   '>
          <li><NavLink to='/'>Home</NavLink></li>
          <li><NavLink to='/Services'>Services</NavLink></li>
          <li><NavLink to='/Products'>Shop</NavLink></li>
          <li className='flex items-center gap-[5px] about '>
            About
            <IoIosArrowDown />


            <div className='aboutDropdown bg-white absolute right-0  top-7 opacity-0 pointer-events-none transition-all duration-300'>
            <NavLink to='/ShippingInfo'>
              <div>Shipping Info</div>
            </NavLink>    
            <NavLink to='/Contact'>
              <div>Contact Us</div>
            </NavLink>
            </div>
          </li>

        
        </ul>
      }
      


     
      

     
      
        
        {isLoged && (
          <div className=' flex gap-[20px] items-center relative'>

            
            <CartAndWishlistBtn  handleWishlistToggle={handleWishlistToggle} handleCartToggle={handleCartToggle}/>

            {cartToggle && (
                
                <ShopingCart />
              
            )}


            {moreInfoToggle && (
              <div className=' border-[1px] border-grayText flex flex-col p-[15px] bg-white  rounded-standart justify-center absolute right-0  top-20 gap-[10px]'>

                
                  <div className='flex justify-center items-center gap-[20px]'>
          
                  <NavLink to='Profile' onClick={() => localStorage.setItem('selectedUserId', auth.currentUser.uid)  }>
                    <div className=' rounded-[50%] overflow-hidden w-[70px] h-[70px] border-2 border-black'>
                      {profilePictureLoading ? 
                        <div>Loadinggggggg </div>
                      :
                        <img  src={auth.currentUser.photoURL}/>
                      }
                  
                    </div>
                  </NavLink>   
                  <div className=' text-h5 font-bold'>{displayName}</div>
                </div>

                {isAdmin && 
                <NavLink to='Admin'>
                    <div className=' flex  text-h5 items-center font-bold '>
                      <div className='text-[40px] text-primary'><MdAdminPanelSettings /></div>
                      <div>Admin</div>
                    </div>
                </NavLink>}



                <NavLink to='Notifications'>
                  <div className='cursor-pointer text-h5 flex  items-center font-bold ' onClick={setInboxViewed}>
                    <div className='text-[40px] text-primary relative'>
                      {notification && <div className='w-[15px] h-[15px] bg-red-700 rounded-[50%] absolute right-0'></div>}  
                      <IoIosNotifications />
                      </div>
                    <div>Notifications</div>
                  </div>
                </NavLink>




                <button className=' bg-primary text-white hover:bg-additional transition-all duration-300 rounded-standart text-h5 font-bold py-[10px] ' onClick={logOut}>Log Out</button>

              </div>
            )}
            

            { !responsNavBar && 
            <div onClick={() => {setMoreInfoToggle(!moreInfoToggle) ; dispatch(setCartToggle(false))}} className=' text-h2 text-primary cursor-pointer'>
              <CgProfile /> 
            </div>}


            { responsNavBar &&  <div onClick={ () => setToggleMenu(true) } className=' text-h3 cursor-pointer'><GrMenu /></div>}
          </div>

          
          )}

          {!isLoged && 

          <div className='flex gap-[20px] items-center'>
            <div className=' hidden xl:flex gap-[20px] text-h5 font-bold '>
              <div onClick={() => dispatch(setLogInToggle(true))} className=' bg-primary  text-white flex items-center cursor-pointer  px-[16px] py-[8px] rounded-standart  border-[1px] border-grayText gap-[10px]'>  <button>Log In</button>   </div>
              <div onClick={() => dispatch(setRegistrationToggle(true))} className='  bg-additional text-white  flex items-center cursor-pointer  px-[16px] py-[8px] rounded-standart  border-[1px] border-grayText gap-[10px]'>  <button>Registration</button>  </div>
             
            
            </div>
            { responsNavBar &&  <div onClick={ () => setToggleMenu(true) } className=' text-h3 cursor-pointer'><GrMenu /></div>}
          </div>
            
          
          }
       </div>
      
     

      {logInToggle && 
        <SignIn />

      }

      {registrationToggle && 
        <Registration />

      }
     
      
  



      {
        toggleMenu  && 
  
        <div className='fixed top-0 bottom-0 left-0 right-0 bg-[rgba(9,9,9,0.82)] overflow-hidden'>
          <div className=' flex flex-col gap-[30px] w-full sm:w-[570px] p-[30px] sm:p-[50px] bg-white h-full'>

            <div className=' flex justify-between items-center '>
              <NavLink to='/'>
                <img src={logo} className=' max-w-[180px]'/>
              </NavLink>
              <div onClick={ () => setToggleMenu(false)} className=' text-h3 font-extrabold cursor-pointer'>
                <RxCross1/>
              </div>
            </div>


        

            {isLoged && <div className='flex justify-start items-center gap-[20px]'>
          
              <NavLink to='Profile' onClick={() => localStorage.setItem('selectedUserId', auth.currentUser.uid)  }>
                <div className=' rounded-[50%] overflow-hidden w-[70px] h-[70px] border-2 border-black'>
                  {profilePictureLoading ? 
                    <div>Loadinggggggg </div>
                  :
                    <img  src={auth.currentUser.photoURL}/>
                  }
              
                </div>
              </NavLink>   
              <div className=' text-h5 font-bold'>{displayName}</div>
            </div> }





            <ul className=' navigation flex flex-col text-h5 font-bold relative '>
              
              <li className=' p-[15px]  border-b-[1px] border-black'><NavLink to='Admin'>Admin</NavLink></li>
              <li className=' p-[15px]  border-b-[1px] border-black'><NavLink to='Notifications'>Notifications</NavLink></li>
              <li className=' p-[15px]  border-b-[1px] border-black'><NavLink to='/'>Home</NavLink></li>
              <li className=' p-[15px]  border-b-[1px] border-black'><NavLink to='/Services'>Services</NavLink></li>
              <li className=' p-[15px]  border-b-[1px] border-black'><NavLink to='/Products'>Shop</NavLink></li>
              <li className='flex flex-col   gap-[5px] about p-[15px]  border-b-[1px] border-black '>

                <div className=' flex justify-between items-center w-full'>
                  <div>About</div>
                  <div className=' cursor-pointer  bg-[#ebebeb] p-[5px] ' onClick={ () => setAboutDropDown(!aboutDropDown)}><IoIosArrowDown /></div>
                </div>
                  

                 {aboutDropDown && 
                  <div className=' bg-white  transition-all duration-300 p-[15px] flex flex-col gap-[15px]'>
                    <NavLink to='/ShippingInfo'>
                      <div>Shipping Info</div>
                    </NavLink>    
                    <NavLink to='/Contact'>
                      <div>Contact Us</div>
                    </NavLink>
                  </div>
                  }       
              </li>


              {!isLoged && <div className=' flex flex-col gap-[20px] text-h5 font-bold mt-[30px] '>
              <div className=' bg-primary  text-white flex items-center justify-center cursor-pointer  px-[16px] py-[8px] rounded-standart  border-[1px] border-grayText gap-[10px] '>  <button>Log In</button>   </div>
              <div className='  bg-additional text-white justify-center flex items-center cursor-pointer  px-[16px] py-[8px] rounded-standart  border-[1px] border-grayText gap-[10px]'>   <button>Registration</button>  </div>
             
            
              </div> }

             

              {isLoged && <li className=' mt-[30px] w-full '>
                <button className='w-full bg-primary text-white hover:bg-additional transition-all duration-300 rounded-standart text-h5 font-bold py-[10px] ' onClick={logOut}>Log Out</button>
              </li> }
            </ul>

            

          </div>
        </div>
      }
       

    
      
    </div>
  )
})


export default NavBar