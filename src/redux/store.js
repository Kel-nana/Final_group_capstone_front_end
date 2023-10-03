import { configureStore } from '@reduxjs/toolkit';
import doctorSlice from './reducer/doctorSlice';

const store = configureStore({
  reducer: {
    doctorsList: doctorSlice,
  },
});

export default store;
