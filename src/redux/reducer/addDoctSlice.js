import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const urlDoctors = "https://doctalk-r977.onrender.com/api/v1/doctors";
const headers = {
  Authorization: localStorage.getItem("token"),
};

// Create an async thunk to fetch doctors
const fetchDoctors = createAsyncThunk("addDoctor/fetch", async () => {
  const response = await axios.get(urlDoctors, { headers });
  return response.data;
});

// Create an async thunk to add a new doctor
const addDoctor = createAsyncThunk("addDoctor/add", async (newDoctor) => {
  try {
    const response = await axios.post(urlDoctors, newDoctor, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    error.push("Add doctor error:", error.response.data); // Log the error response
    throw error; // Rethrow the error to propagate it to the component
  }
});

const initialState = {
  doctorsData: [],
};

const addDoctorSlice = createSlice({
  name: "addDoctor",
  initialState,
  doctorsData: [],
  status: "idle",
  error: null,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctors.fulfilled, (state, action) => ({
        ...state,
        doctorsData: action.payload,
      }))
      .addCase(addDoctor.fulfilled, (state, action) => ({
        ...state,
        doctorsData: action.payload,
      }))
      .addCase(updateDoctor.fulfilled, (state, action) => {
        const updatedDoctor = action.payload;
        const updatedDoctorsData = state.doctorsData.map((doctor) => {
          if (doctor.id === updatedDoctor.id) {
            return updatedDoctor;
          }
          return doctor;
        });
        return { ...state, doctorsData: updatedDoctorsData };
      })
      .addCase(deleteDoctor.fulfilled, (state, action) => {
        const doctorId = action.payload;
        const updatedDoctorsData = state.doctorsData.filter(
          (doctor) => doctor.id !== doctorId
        );
        return { ...state, doctorsData: updatedDoctorsData };
      });
  },
});

export { fetchDoctors, addDoctor, updateDoctor, deleteDoctor };
export default addDoctorSlice.reducer;
