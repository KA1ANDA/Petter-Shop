import { signInWithPopup } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { auth, googleProvider } from "../config/firebase";
import { addUserToDb } from "../Pages/Authentication/Registration";
import { useNavigate } from "react-router-dom";
import { setChooseActivityToggle, setRegistrationToggle } from "../Redux/Slices/logedUserSlice";


const useGoogleAuth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const {users} = useSelector((state) => state.logedUserSlice)

  
  const singInWithGoogle = async() => {
    try{
      await signInWithPopup(auth , googleProvider)
      const filtredUser = users.filter((user)=>user.id === auth.currentUser.uid)
      dispatch(setRegistrationToggle(false))
      console.log(filtredUser)
      if (filtredUser.length == 0) {
        // addUserToDb();
        dispatch(setChooseActivityToggle(true));
        console.log('sheiqmna');
      } else {
        console.log('User with the given email already exists');
      }
      
      navigate('/');
    }catch(err){
      console.error(err)
    }
  }

  return singInWithGoogle;
};

export default useGoogleAuth;




