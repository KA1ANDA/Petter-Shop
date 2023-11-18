import { configureStore } from "@reduxjs/toolkit";
import logedUserSlice from './Slices/logedUserSlice'
import servicesSlice from './Slices/servicesSlice'




export const store = configureStore({
  reducer:{
    servicesSlice,   
    logedUserSlice,
  },

})