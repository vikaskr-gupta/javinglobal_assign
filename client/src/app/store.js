import { configureStore } from '@reduxjs/toolkit'
import empReducer from '../features/empSlice'
import userReducer from '../features/userSlice'

export const store = configureStore({
  reducer: {
    emp: empReducer,
    user: userReducer,
  },
})