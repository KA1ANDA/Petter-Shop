import { createSlice } from "@reduxjs/toolkit";


const standartInfoFormSlice = createSlice({
  name:"standartInfoFormSlice",
  initialState:{
    about:'',
    city:'',
    address:'',
    phoneNumber:null,

  },
  reducers:{
   
    setAbout:(state , action) => {
      state.about = action.payload
    },

    setCity:(state , action) => {
      state.city = action.payload
    },

    setAddress:(state , action) => {
      state.address = action.payload
    },

    setphoneNumber:(state , action) => {
      state.phoneNumber = action.payload
    },

  

    
  }
})

export const {setAbout ,setCity ,setAddress ,setphoneNumber } = standartInfoFormSlice.actions
export default standartInfoFormSlice.reducer