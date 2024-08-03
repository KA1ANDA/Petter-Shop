import { useDispatch, useSelector } from 'react-redux';
import AppRouter from './Components/AppRouter';
import NavBar from './Components/NavBar';
import { auth, db } from './config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import {setIsAdmin, setIsLoged, setNotification, setNotificationData, setUsers } from './Redux/Slices/logedUserSlice';
import { useEffect, useState } from 'react';
import { collection, doc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { current } from '@reduxjs/toolkit';
import ProfileSetUpForm from './Components/ProfileSetUpForm';
import useGetUserInfo from './Hooks/useGetUserInfo';
import Wishlist from './Components/shopComponents/Wishlist';
import Footer from './Components/Footer';
import { useLocation } from 'react-router-dom';
import BallAnimation from './Components/BallAnimation';
import { setCartToggle, setFastProductShow } from './Redux/Slices/shopFilterSlice';
import SelectedProductInfo from './Components/shopComponents/SelectedProductInfo';
import useGetSelectedProduct from './Hooks/ShopHooks/useGetSelectedProduct';
import { IoPawSharp } from 'react-icons/io5';
import Checkout from './Components/shopComponents/Checkout';



function App() {

  const dispatch = useDispatch()
  const usersRef = collection(db, 'users');
  const location = useLocation();

  const {chooseActivityToggle , notificationData} = useSelector(state => state.logedUserSlice)
  const {wishlistToggle, fastProductShow , checkoutToggle} = useSelector(state => state.shopFilterSlice)

  const [navbarFade , setNavbarFade] = useState(false)
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  

  onAuthStateChanged(auth,(user) => {

    if (user) {
      dispatch(setIsLoged(true))
      localStorage.setItem("selectedUserId" , user.uid);
      console.log(user)

    } else {
      dispatch(setIsLoged(false))
      console.log('ar var shesuli')
    }


    
  });

  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    if (fastProductShow) {
      setAnimationClass('animate-flipInY');
    } else {
      setAnimationClass('');
    }
  }, [fastProductShow]);

  useEffect(() => {
    const unsubscribe = onSnapshot(usersRef, (snapshot) => {
      const users = [];
  
      snapshot.forEach((doc) => {
        const userData = doc.data();
        users.push(userData);
      });
  
      dispatch(setUsers(users));
    });
  
    return () => unsubscribe(); // Cleanup listener on unmount
  }, [dispatch]);
  

  ///NOTIFIKACIEBIA ESS

  // useEffect(() => {
  //   if(auth.currentUser){
  //     const notificationRef = query(collection(db, 'notifications'), where('recipientId', '==',  auth.currentUser.uid));


  //     const unsubscribe = onSnapshot(notificationRef, (snapshot) => {
  
  //     snapshot.forEach((doc) => {
  //       const notificationData = doc.data();
  //       // setNotifications(notificationData)
  //       dispatch(setNotificationData(notificationData))
  //     });
      
  //   });
  

    
  //   return () => unsubscribe(); // Cleanup listener on unmount
  //   }
    
  // },[auth.currentUser])


  // useEffect(() => {

  //   if(notificationData){
  //     const notification = notificationData.inbox.find((el) => el.seen===false)


  //     if(notification){
  //       dispatch(setNotification(true))
  //     }else{
  //       dispatch(setNotification(false))
  //     }
  
  //     console.log('pasuxi' , notification)
  //   }
    
    
  // },[notificationData])




  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150 && !isScrolledDown) {
        setNavbarFade(true);
        setIsScrolledDown(true); // Set flag after first scroll down
      } else if (window.scrollY <= 250 && isScrolledDown) {
        setNavbarFade(false);
        setIsScrolledDown(false); // Reset flag after scrolling back up
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll); // Cleanup listener
  }, [isScrolledDown]);



  const fetchAdminStatus = async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const tokenResult = await currentUser.getIdTokenResult();
        dispatch(setIsAdmin(tokenResult.claims.admin || false)); // Set isAdmin to true if admin claim is present
      } else {
        // User is not logged in, set isAdmin to false by default
        dispatch(setIsAdmin(false));
      }
    } catch (error) {
      console.error('Error fetching admin status:', error);
    }
  };

  // Call fetchAdminStatus when user login status changes
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setIsLoged(true));
        localStorage.setItem("selectedUserId", user.uid);
        fetchAdminStatus(); // Fetch admin status when user is logged in
      } else {
        dispatch(setIsLoged(false));
        // User is not logged in, set isAdmin to false by default
        dispatch(setIsAdmin(false));
      }
    });

    return () => unsubscribeAuth(); // Cleanup auth listener on unmount
  }, [dispatch]);


  //unda faslebi truebad vaqcio ro dasina !!!!!!!!!!!!!

  const isServicesPage = location.pathname === "/Services";

  console.log(navbarFade)
  return (
    <div className="flex flex-col bg-white h-[100%]  font-nunito relative   " >
       {location.pathname === "/" && (
        <div className='absolute right-0 top-0 z-0 w-full xl:w-[1179px] xl:h-[874px] '>
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1179 874" fill="none" style={{ position: 'relative', top: 0, right: 0 }}>
            <path fillRule="evenodd" clipRule="evenodd" d="M290.42 -221C75.231 -221 17.6555 -96.5982 27.0115 21.0426C36.3675 138.683 244.559 196.845 310.571 321.906C353.753 403.713 319.503 719.451 488.665 786.384C767.187 896.588 1199 818.837 1199 818.837V232.661V-221C1199 -221 505.608 -221 290.42 -221Z" fill="#FFDA47"></path>
          </svg>


        </div>
      )}

        {location.pathname === "/" && (
          <div className=' w-full h-[900px]  absolute'>
             <BallAnimation containerWidth={2700} containerHeight={900} numBalls={20} />
          </div>

        )}
        {/* <div className= {`fixed -top-24 transition-all duration-500 px-[400px] py-[15px] z-50 right-0 left-0  ${ navbarFade && 'navbarFade'}`} >
          <NavBar />
        </div> */}

       <NavBar/>
       

     
      
    
      <AppRouter />

      {/* activitys archeva */}
      {/* {chooseActivityToggle && (
        <ChooseActivity />
      )} */}

      {wishlistToggle && (
        <Wishlist/>
      )}

       {fastProductShow && (
        <div className='fixed bg-[rgba(9,9,9,0.82)] top-0 bottom-0 left-0 right-0 z-[999] flex items-center justify-center'>
          <div className={`card relative xl:overflow-hidden xl:flex xl:justify-center xl:items-center p-[15px] mx-[15px] 2xl:mx-0 lg:p-[50px] h-[800px]    bg-white overflow-y-auto xl:w-[1400px] rounded-standart ${animationClass}`}>
            <div onClick={() => dispatch(setFastProductShow(false))} className='absolute top-0 right-0 m-[30px] text-[25px] font-semibold cursor-pointer bg-white rounded-[50%] py-[10px] px-[20px] z-20'>X</div>

            <SelectedProductInfo />
              <div className='hidden 2xl:block absolute -bottom-[40px] -right-[40px] rotate-[320deg] '>
                <div className='text-primary text-[350px] relative'><IoPawSharp /></div>
                <div className='text-secondary text-[150px] absolute bottom-6  right-[100px]'><IoPawSharp /></div>
              </div>
          </div>
          
        </div>
      )}

    {checkoutToggle && <Checkout  />}

{!isServicesPage && 
      <div className='mt-[160px] w-full 2xl:w-[1400px] m-auto'> 
        <Footer />
      </div> }
      

       
     
  
    </div>
  );
}

export default App;
