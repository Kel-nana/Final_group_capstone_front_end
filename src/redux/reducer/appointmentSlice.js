import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const urlappoint = 'http://[::1]:3000/api/v1/appointments';

// Create an async thunk to fetch appointments
const fetchAppointments = createAsyncThunk('appointments/fetch', async () => {
  const response = await axios.get(urlappoint);
  return response.data;
});

// Create an async thunk to add a new appointment
const addAppointment = createAsyncThunk('appointments/add', async (newAppointment) => {
    try {
      const response = await axios.post(urlappoint, newAppointment, {
        headers: {
          'Content-Type': 'application/json', // Set the content type to JSON
        },
      });
      return response.data;
    } catch (error) {
      console.error('Add appointment error:', error.response.data); // Log the error response
      throw error; // Rethrow the error to propagate it to the component
    }
  });

// Create an async thunk to update an appointment
const updateAppointment = createAsyncThunk('appointments/update', async (updatedAppointment) => {
  const response = await axios.put(`${urlappoint}/${updatedAppointment.id}`, updatedAppointment, {
    headers: {
      'Content-Type': 'application/json', // Set the content type to JSON
    },
  });
  return response.data;
});

// Create an async thunk to delete an appointment
const deleteAppointment = createAsyncThunk('appointments/delete', async (appointmentId) => {
  await axios.delete(`${urlappoint}/${appointmentId}`);
  return appointmentId;
});


const initialState = {
    appointmentsdata: [],
  };

const appointmentsSlice = createSlice({
  name: 'appointments',
    initialState,
    appointmentsdata: [],
    status: 'idle',
    error: null,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchAppointments.fulfilled, (state, action) => {
        return { ...state, appointmentsdata: action.payload };
      })
      .addCase(addAppointment.fulfilled, (state, action) => {
        state.appointmentsdata.push(action.payload);
      })
      .addCase(updateAppointment.fulfilled, (state, action) => {
        const updatedAppointment = action.payload;
        const index = state.appointmentsdata.findIndex((appointment) => appointment.id === updatedAppointment.id);
        if (index !== -1) {
          state.appointmentsdata[index] = updatedAppointment;
        }
      })
      .addCase(deleteAppointment.fulfilled, (state, action) => {
        const appointmentId = action.payload;
        state.appointmentsdata = state.appointmentsdata.filter((appointment) => appointment.id !== appointmentId);
      });
  },
});

export {
  fetchAppointments, addAppointment, updateAppointment, deleteAppointment,
};
export default appointmentsSlice.reducer;
