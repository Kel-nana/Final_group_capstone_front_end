import { configureStore } from '@reduxjs/toolkit';
import doctorSlice, { deleteDoctor } from './reducer/doctorSlice';
import appointmentsSlice from './reducer/appointmentSlice';

const store = configureStore({
  reducer: {
    doctorsList: doctorSlice,
    appointments: appointmentsSlice,
  },
});

export default store;
export { deleteDoctor };
