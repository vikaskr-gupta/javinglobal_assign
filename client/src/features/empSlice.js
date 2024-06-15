import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

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
    setEditEmployee: (state, action) => {
      state.editEmployee = action.payload;
    },
    deleteEmployee: (state, action) => {
      state.value = state.value.filter(emp => emp._id !== action.payload);
    },

  },
});

export const { setEmployees, setEditEmployee, deleteEmployee } = empSlice.actions;

// Fetching employees
export const fetchEmployees = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:8000/emp/getall");
    dispatch(setEmployees(response.data));
  } catch (error) {
    console.log("Error fetching employees:", error);
  }
};

// Updating employee
export const updateEmployee = (employee) => async (dispatch) => {
  try {
    await axios.put(`http://localhost:8000/emp/update/${employee._id}`, employee);
    dispatch(setEditEmployee(employee));
  } catch (error) {
    console.log("Error updating employee:", error);
  }
};

// Adding new employee
export const addEmployee = (employee) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:8000/emp/create", employee);
    dispatch(setEmployees(response.data));
  } catch (error) {
    console.log("Error adding employee:", error);
  }
};

// Deleting an employee
export const deleteEmployeeById = (employeeId) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:8000/emp/delete/${employeeId}`);
    dispatch(deleteEmployee(employeeId));
  } catch (error) {
    console.log("Error deleting employee:", error);
  }
};

export default empSlice.reducer;
