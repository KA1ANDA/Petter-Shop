import { createSlice } from "@reduxjs/toolkit";

const logedUserSlice = createSlice({
  name:"logedUserSlice",
  initialState:{
   userId:'',
  },
  reducers:{
   
    setUserId:(state , action) => {
      state.userId = action.payload
    }
    
    
  }
})

export const {setUserId} = logedUserSlice.actions
export default logedUserSlice.reducer