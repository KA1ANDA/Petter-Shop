import { createSlice } from "@reduxjs/toolkit";


const servicesSlice = createSlice({
  name:"servicesSlice",
  initialState:{
    currentServiceURL:'',
    selectedService:null,

  },
  reducers:{
   
    setSelectedService:(state , action) => {
      state.selectedService = action.payload
    },

    setCurrentServiceURL:(state , action) => {
      state.currentServiceURL = action.payload
    },

    
  }
})

export const {setSelectedService , setCurrentServiceURL } = servicesSlice.actions
export default servicesSlice.reducer