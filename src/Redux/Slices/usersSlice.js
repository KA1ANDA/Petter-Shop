import { createSlice } from "@reduxjs/toolkit";


const usersSlice = createSlice({
  name:"usersSlice",
  initialState:{
    selectedUserId:'',
    selectedUserName:'',


  },
  reducers:{
   
    setSelectedUserId:(state , action) => {
      state.selectedUserId = action.payload
    },

    setSelectedUserName:(state , action) => {
      state.selectedUserName = action.payload
    },


    
  }
})

export const {setSelectedUserId , setSelectedUserName} = usersSlice.actions
export default usersSlice.reducer