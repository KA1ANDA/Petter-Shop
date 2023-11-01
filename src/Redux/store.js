import { configureStore } from "@reduxjs/toolkit";
import logedUserSlice from './Slices/logedUserSlice'

export const store = configureStore({
  reducer:{   
    logedUserSlice,
  },

})