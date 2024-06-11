import { createSlice } from '@reduxjs/toolkit'

const empSlice = createSlice({
  name: "emp",
  initialState: {
    value: [],
    editEmployee: null,
  },
  reducers: {
    setEmployees: (state, action) => {
      state.value = action.payload;
    },
    addEmp: (state, action) => {
      state.value.push(action.payload);
    },
    editEmp: (state, action) => {
      state.editEmployee = action.payload;
    },
    updateEmp: (state, action) => {
      const index = state.value.findIndex(emp => emp._id === action.payload._id);
      if (index !== -1) {
        state.value[index] = action.payload;
      }
    },
    deleteEmp: (state, action) => {
      state.value = state.value.filter(emp => emp._id !== action.payload);
    },
  },
})

export const { setEmployees, addEmp, editEmp, updateEmp, deleteEmp } = empSlice.actions
export default empSlice.reducer