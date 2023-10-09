import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  fetchAppointments,
  addAppointment,
} from '../redux/reducer/appointmentSlice';
import Sidebar from './Sidebar';
import DoctorsDropDown from '../components/DoctorsDropDown';
import 'react-datepicker/dist/react-datepicker.css';
import { doctorData } from '../redux/reducer/doctorSlice';

const NewAppointments = () => {
  const allDoctorList = useSelector((state) => state.doctorsList.allDoctors);
  const dispatch1 = useDispatch();
  useEffect(() => {
    dispatch1(doctorData());
  }, [dispatch1]);
  const [message, setMessage] = useState('Hello');
  const [date, setDate] = useState(dayjs('2023-10-07'));
  const [time, setTime] = useState(dayjs('2023-10-07T15:30'));
  // const [doctorsLocation, setDoctorsLocation] = useState(null);

  // console.log(time, 'time value');
  // console.log(date, 'time date');
  console.log(allDoctorList);
  // Get the time in the desired format
  const formattedTime = time.format('HH:mm:ss');
  // ddd MMM D YYYY"
  // console.log(formattedTime, 'formatted time');
  const formattedDate = date.format('MMM D YYYY');

  console.log(formattedDate, 'formatted Date');
  const changeMessage = (newMessage) => {
    setMessage(newMessage);
  };

  const appointmentsData = useSelector(
    (state) => state.appointments.appointmentsdata,
  );
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    // Initialize your form fields here
    user_id: '', // Clear the user_id field
    doctor_id: '', // Clear the doctor_id field
    appointment_time: '', // Clear the appointment_time field
    appointment_date: '',
    location: '',
    // Add more fields as needed
  });

  useEffect(() => {
    let timeOutId3;
    if (formData) {
      timeOutId3 = setTimeout(() => {
        setFormData({
          user_id: '4',
          doctor_id: message,
          appointment_time: formattedTime,
          appointment_date: formattedDate,
          location: 'England',
        });
      }, 600);
      console.log(formData, 'handleChangeDrop');
    }
    return () => {
      clearTimeout(timeOutId3); // Clear the timeout if the effect runs again
    };
  }, [formData]);

  const handleChangeDrop = () => {
    setTimeout(() => {
      setFormData({ ...formData, doctor_id: message });
    }, 600);
  };
  const handleChangeDate = () => {
    setTimeout(() => {
      setFormData({ ...formData, appointment_date: formattedDate });
    }, 600);
  };

  const handleChangeTime = () => {
    setTimeout(() => {
      setFormData({ ...formData, appointment_time: formattedTime });
    }, 600);
  };

  useEffect(() => {
    let timeOutId3;
    if (formData) {
      timeOutId3 = setTimeout(() => {
        setFormData({
          user_id: '4',
          doctor_id: message,
          appointment_time: formattedTime,
          appointment_date: formattedDate,
          location: 'England',
        });
      }, 600);
      console.log(formData, 'handleChangeDrop');
    }
    return () => {
      clearTimeout(timeOutId3); // Clear the timeout if the effect runs again
    };
  }, [formData]);

  const handleUpdateDrop = () => {
    // Dispatch the addAppointment action with formData
    dispatch(addAppointment(formData));
    // Clear the form or perform any other necessary actions
    setFormData({
      user_id: '',
      doctor_id: '',
      appointment_time: '',
      appointment_date: '',
      location: '',
    });
    console.log(formData, 'handleUpdateDropdis');
  };

  //   Getting the appointments data
  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  console.log(appointmentsData, 'appointmentsData');
  return (
    <>
      <div className="bg-slate-200 flex flex-row">
        <div className="w-[20%]">
          <Sidebar className="sidebar-doctor" />
        </div>
        <div className="bg-grey-lighter min-h-screen flex flex-col w-[80%] h-[]">
          <div className="new-appointment mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
              <p className="mb-8 text-3xl text-center">Book Appointments</p>
              {/* Form add appointment data */}
              <form>
                <div className="block border border-grey-light w-full p-3 rounded mb-4">
                  <DoctorsDropDown
                    defaultValue={dayjs('2022-04-17T15:30')}
                    changeMessage={changeMessage}
                    onChange={handleChangeDrop}
                  />
                  <p>{message}</p>
                </div>
                <div className="date-picker block border border-grey-light w-full p-3 rounded mb-4">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Appointment Date"
                      onChange={(date) => setDate(date)}
                      onClick={handleChangeDate}
                    />
                  </LocalizationProvider>
                </div>
                <div className="time-picker block border border-grey-light w-full p-3 rounded mb-4">
                  {/* <TimePicker onChange={(date) => setDate(date)} onClick={handleChangeDate} /> */}
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      label="Appointment Time"
                      onChange={(time) => setTime(time)}
                      onClick={handleChangeTime}
                    />
                  </LocalizationProvider>
                </div>
                <div className="date-picker block border border-grey-light w-full p-3 rounded mb-4">
                  <TextField
                    id="outlined-read-only-input"
                    label="Location"
                    defaultValue="Location"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </div>
                {/* location = doctor.location */}
                <button
                  type="submit"
                  onClick={handleUpdateDrop}
                  className="ml-[31.5%] text-md px-4 py-2 text-white rounded flex items-center rounded-full bg-[#97bf0f] hover:bg-[#5b740a] cursor-pointer transition-ease-in-out duration-100 sm:text-lg"
                >
                  Book Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewAppointments;
