import { createSlice } from "@reduxjs/toolkit";


const logedUserSlice = createSlice({
  name:"logedUserSlice",
  initialState:{
   logInToggle:false, 
   isAdmin:false,
   isLoged:false,
   displayName:'',
   profilePictureLoading:false,
   users:[],
   chooseActivityToggle:false,
   notificationData:undefined,
   notification:false,
   registrationToggle:false,
   forgotPasswordToggle:false,

  },
  reducers:{

    setLogInToggle:(state , action) => {
      state.logInToggle = action.payload
    },

    setForgotPasswordToggle:(state , action) => {
      state.forgotPasswordToggle = action.payload
    },


    setRegistrationToggle:(state , action) => {
      state.registrationToggle = action.payload
    },
   
   
    setIsLoged:(state , action) => {
      state.isLoged = action.payload
    },

    setIsAdmin:(state , action) => {
      state.isAdmin = action.payload
    },

    setDisplayName:(state , action) => {
      state.displayName = action.payload
    },
    setProfilePictureLoading:(state , action) => {
      state.profilePicture = action.payload
    },
    setUsers:(state , action) => {
      state.users = action.payload
    },
    setChooseActivityToggle:(state , action) => {
      state.chooseActivityToggle = action.payload
    },
    setNotification:(state , action) => {
      state.notification = action.payload
    },

    setNotificationData:(state , action) => {
      state.notificationData = action.payload
    },

    
    
  }
})

export const {setIsLoged , setDisplayName , setProfilePictureLoading , setUsers , setChooseActivityToggle , setNotification , setNotificationData , setLogInToggle , setRegistrationToggle , setForgotPasswordToggle , setIsAdmin } = logedUserSlice.actions
export default logedUserSlice.reducer