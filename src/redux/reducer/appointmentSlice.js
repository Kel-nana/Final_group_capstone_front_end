import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const urlappoint = 'https://doctalk-r977.onrender.com/api/v1/appointments';
const headers = {
  Authorization: localStorage.getItem('token'),
};

// Create an async thunk to fetch appointments
const fetchAppointments = createAsyncThunk('appointments/fetch', async () => {
  const response = await axios.get(urlappoint, { headers });
  return response.data;
});

// Create an async thunk to add a new appointment
const addAppointment = createAsyncThunk(
  'appointments/add',
  async (newAppointment) => {
    try {
      const response = await axios.post(urlappoint, newAppointment, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token'),
        },
        body: JSON.stringify(newAppointment),
      });
      return response.data;
    } catch (error) {
      error.push('Add appointment error:', error.response.data); // Log the error response
      throw error; // Rethrow the error to propagate it to the component
    }
  },
);

// Create an async thunk to update an appointment
const updateAppointment = createAsyncThunk(
  'appointments/update',
  async (updatedAppointment) => {
    const response = await axios.put(
      `${urlappoint}/${updatedAppointment.id}`,
      updatedAppointment,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token'),
        },
      },
    );
    return response.data;
  },
);

// Create an async thunk to delete an appointment
const deleteAppointment = createAsyncThunk(
  'appointments/delete',
  async (appointmentId) => {
    await axios.delete(`${urlappoint}/${appointmentId}`, { headers });
    return appointmentId;
  },
);

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
      .addCase(fetchAppointments.fulfilled, (state, action) => ({
        ...state,
        appointmentsdata: action.payload,
      }))
      .addCase(addAppointment.fulfilled, (state, action) => ({
        ...state,
        appointmentsdata: action.payload,
      }))
      .addCase(updateAppointment.fulfilled, (state, action) => {
        const updatedAppointment = action.payload;
        const updatedAppointmentsData = state.appointmentsdata.map(
          (appointment) => {
            if (appointment.id === updatedAppointment.id) {
              return updatedAppointment;
            }
            return appointment;
          },
        );
        // Return a new state object instead of directly modifying the 'state' parameter
        return { ...state, appointmentsdata: updatedAppointmentsData };
      })
      .addCase(deleteAppointment.fulfilled, (state, action) => {
        const appointmentId = action.payload;
        const updatedAppointmentsData = state.appointmentsdata.filter(
          (appointment) => appointment.id !== appointmentId,
        );
        return { ...state, appointmentsdata: updatedAppointmentsData };
      });
  },
});

export {
  fetchAppointments,
  addAppointment,
  updateAppointment,
  deleteAppointment,
};
export default appointmentsSlice.reducer;
