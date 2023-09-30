import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'http://[::1]:3000/api/v1/doctors/';

const doctorData = createAsyncThunk('doctors', async () => {
  const response = await axios.get(url);
  return response.data;
});

const initialState = {
  allDoctors: [],
};

const doctorSlice = createSlice({
  name: ' allDoctors',
  initialState,
  reducers: {},
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
