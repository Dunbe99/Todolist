import { createSlice } from '@reduxjs/toolkit'

const dataUser = localStorage.getItem('user')
const   ObjDataUser = JSON.parse(dataUser)
const initialState = {
  value: ObjDataUser ? ObjDataUser.user : {},
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser : (state,action)=>{
        state.value = action.payload
    }
  },
})

export const { setUser } = userSlice.actions

export default userSlice.reducer