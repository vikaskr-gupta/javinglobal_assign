import { configureStore } from '@reduxjs/toolkit'
import empReducer from '../features/empSlice'

export const store = configureStore({
  reducer: {
    edit: empReducer
  },
})