import { configureStore } from "@reduxjs/toolkit";
import logedUserSlice from './Slices/logedUserSlice'
import servicesSlice from './Slices/servicesSlice'
import standartInfoFormSlice from './Slices/standartInfoFormSlice'
import usersSlice from './Slices/usersSlice'
import shopFilterSlice from './Slices/shopFilterSlice'






export const store = configureStore({
  reducer:{
    servicesSlice,   
    logedUserSlice,
    standartInfoFormSlice,
    usersSlice,
    shopFilterSlice,
  },

})