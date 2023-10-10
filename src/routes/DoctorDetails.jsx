import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { IoIosArrowDropright, IoIosArrowDropleft } from 'react-icons/io';
import '../assets/styles/doctordetails.css';
import TextField from '@mui/material/TextField';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { addAppointment } from '../redux/reducer/appointmentSlice';
import Sidebar from './Sidebar';

const DoctorDetails = () => {
  const { id } = useParams();
  const doctorsList = useSelector((state) => state.doctorsList);
  const finalDoctorsData = doctorsList.allDoctors;
  const doctor = finalDoctorsData.find((item) => item.id === parseInt(id, 10));
  return (
    <div>
      <Sidebar />
      <div className="flex justify-center align-center flex-col text-center mt-16 p-4 sm:flex-row sm:justify-around md:ml-96 md:-mt-125 lg:-mt-125">
        <div className="flex justify-center ">
          <img
            className="rounded-full w-80 h-80"
            src={doctor.profile_pic}
            alt="Doctor Profile"
          />
        </div>

        <div className="flex flex-col mt-4 sm:items-end">
          <h3 className="text-3xl font-semibold uppercase tracking-wide name-styling sm:text-right">
            {doctor.doc_name}
          </h3>
          <h3 className="mb-2 text-sm font-semibold sm:text-right">
            {doctor.bio}
          </h3>

          <div className="flex w-full justify-between items-center bg-[#e2e3e5] p-2 text-sm font-semibold text-zinc-600 capitalize">
            <p>Education</p>
            <h3>{doctor.education}</h3>
          </div>
          <div className="flex w-full justify-between items-center bg-[#fff] p-2 text-sm font-semibold text-zinc-600 capitalize">
            <p>Years of Experience</p>
            <h3>{doctor.years_of_experience}</h3>
          </div>

          <div className="float-right">
            <button
              onClick={handleModal}
              type="button"
              className="flex flex-row items-center justify-evenly mt-8 rounded-full bg-[#97bf0f] hover:bg-[#5b740a] py-4 px-8 cursor-pointer transition-bg w-64 mx-auto"
            >
              <Link to="/new-appointment">
                <span className="px-4 text-white">Get Appointment</span>
              </Link>
              <IoIosArrowDropright className="text-3xl text-white" />
            </button>
          </div>
        </div>
      </div>
      <div>
        {/* create a back button */}
        <Link to="/doctors">
          <button
            type="button"
            className="back-btn flex flex-row items-center justify-evenly mt-8 ml-70 rounded-r-full  bg-[#97bf0f] hover:bg-[#5b740a] py-4 px-8 cursor-pointer transition-bg"
          >
            <IoIosArrowDropleft className="text-3xl text-white" />
          </button>
        </Link>
      </div>
      {modal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-[#97bf0f] p-6 rounded shadow-lg relative">
            <button
              type="button"
              onClick={handleModal}
              className="absolute top-2 right-2 rounded-full p-2 bg-white text-[#97bf0f] hover:bg-[#5b740a] hover:text-white cursor-pointer transition-all duration-100"
            >
              Close
            </button>
            <div className="bg-white new-appointment mx-auto flex-1 flex flex-col items-center justify-center px-2">
              <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                <p className="mb-8 text-3xl text-center">Book Appointment</p>
                {/* Form add appointment data */}
                <form onSubmit={handleSubmit}>
                  <div className="block border border-white w-full rounded mb-4">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Appointment Date"
                        name="appointment_date"
                        value={formData.appointment_date}
                        onChange={handleInputChange}
                        className="w-full h-full"
                      />
                    </LocalizationProvider>
                  </div>
                  <div className="block border border-white w-full rounded mb-4">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        label="Appointment Time"
                        name="appointment_time"
                        value={formData.appointment_time}
                        onChange={handleInputChange}
                        className="w-full"
                      />
                    </LocalizationProvider>
                  </div>
                  <div className="block border border-grey-light w-full rounded mb-4">
                    <TextField
                      id="outlined-read-only-input"
                      name="location"
                      value={doctor.location}
                      label="Location"
                      className="w-full"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="ml-[31.5%] text-md px-4 py-2 text-white rounded flex items-center rounded-full bg-[#97bf0f] hover:bg-[#5b740a] cursor-pointer transition-ease-in-out duration-100 sm:text-lg"
                  >
                    Book Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDetails;
