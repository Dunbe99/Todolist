import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import notiSlice from './notiSlice'
export const store = configureStore({
    reducer: {
        user : userSlice,
        noti : notiSlice
    },
  })