import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'https://doctalk-r977.onrender.com/api/v1/doctors/';
const headers = {
  Authorization: localStorage.getItem('token'),
};
const doctorData = createAsyncThunk('doctors', async () => {
  const response = await axios.get(url, { headers });
  return response.data;
});

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
  },
});
// eslint-disable-next-line import/prefer-default-export
export { doctorData };
export default doctorSlice.reducer;
