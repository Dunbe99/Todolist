import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  value: 0
}

export const notiSlice = createSlice({
  name: 'noti',
  initialState,
  reducers: {
    setNoti : (state,action)=>{
        state.value += action.payload
    }
  },
})

export const { setNoti } = notiSlice.actions

export default notiSlice.reducer