import { configureStore } from '@reduxjs/toolkit';
import doctorSlice from './reducer/doctorSlice';

const store = configureStore({
  reducer: {
    allDoctors: doctorSlice,
  },
});

export default store;
