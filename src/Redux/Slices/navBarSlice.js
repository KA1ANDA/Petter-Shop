import { createSlice } from "@reduxjs/toolkit";

const navBarSlice = createSlice({
  name:"navBarSlice",
  initialState:{
   authenticationMethod:''
  },
  reducers:{
   
    setUserId:(state , action) => {
      state.userId = action.payload
    }
    
    
  }
})

export const {} = navBarSlice.actions
export default navBarSlice.reducer