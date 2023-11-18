import { createSlice } from "@reduxjs/toolkit";


const servicesSlice = createSlice({
  name:"servicesSlice",
  initialState:{
    selectedService:null,
  },
  reducers:{
   
    setSelectedService:(state , action) => {
      state.selectedService = action.payload
    },
    
  }
})

export const {setSelectedService} = servicesSlice.actions
export default servicesSlice.reducer