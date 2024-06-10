import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value:[{}]
}

const empSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    editEmp(state, action) {
      state.value = action.payload
    },
  },
})

export const { editEmp } = empSlice.actions
export default empSlice.reducer