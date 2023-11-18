import { createSlice } from "@reduxjs/toolkit";


const logedUserSlice = createSlice({
  name:"logedUserSlice",
  initialState:{
   isLoged:false,
   displayName:'',
   profilePictureLoading:false,
   users:[],
   chooseActivityToggle:false,
  },
  reducers:{
   
    setIsLoged:(state , action) => {
      state.isLoged = action.payload
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
    }

    
    
  }
})

export const {setIsLoged , setDisplayName , setProfilePictureLoading , setUsers , setChooseActivityToggle} = logedUserSlice.actions
export default logedUserSlice.reducer