import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// const axios = require("axios");

const url = 'https://doctalk-r977.onrender.com/api/v1/doctors/';
const headers = {
  Authorization: localStorage.getItem('token'),
};

export const doctorData = createAsyncThunk('doctors', async () => {
  const response = await axios.get(url, { headers });
  return response.data;
});

// delete doctor
export const deleteDoctor = createAsyncThunk(
  'doctors/deleteDoctor',
  async (id) => {
    const response = await axios.delete(`${url}${id}`, { headers });
    return response.data;
  },
);

const initialState = {
  allDoctors: [],
};

const doctorSlice = createSlice({
  name: 'doctorsList',
  initialState,
  // reducers: {},
  extraReducers: (builder) => {
    builder.addCase(doctorData.fulfilled, (state, action) => {
      const receivedData = action.payload;
      return { ...state, allDoctors: receivedData };
    });
    builder.addCase(deleteDoctor.fulfilled, (state, action) => {
      const deletedDoctorId = action.payload;
      const updatedDoctors = state.allDoctors.filter((doctor) => doctor.id !== deletedDoctorId);
      return { ...state, allDoctors: updatedDoctors };
    });
  },
});

export default doctorSlice.reducer;
