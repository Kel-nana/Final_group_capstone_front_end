import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  fetchAppointments, addAppointment, deleteAppointment,
} from '../redux/reducer/appointmentSlice';
import Sidebar from './Sidebar';
import DoctorsDropDown from '../components/DoctorsDropDown';
import 'react-datepicker/dist/react-datepicker.css';

const NewAppointments = () => {
  // const [date, setDate] = useState(new Date());
  const [message, setMessage] = useState('Hello');
  const [date, setDate] = useState(dayjs('2023-10-07'));
  const [time, setTime] = useState(dayjs('2023-10-07T15:30'));

  // console.log(time, 'time value');
  // console.log(date, 'time date');

  // Get the time in the desired format
  const formattedTime = time.format('HH:mm:ss');
  // ddd MMM D YYYY"
  // console.log(formattedTime, 'formatted time');
  const formattedDate = date.format('MMM D YYYY');

  console.log(formattedDate, 'formatted Date');
  const changeMessage = (newMessage) => {
    setMessage(newMessage);
  };

  const appointmentsData = useSelector((state) => state.appointments.appointmentsdata);
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

  const handleDeleteClick = (appointmentId) => {
    // Dispatch the deleteAppointment action with the appointmentId
    dispatch(deleteAppointment(appointmentId));
  };

  //   Getting the appointments data
  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  console.log(appointmentsData, 'appointmentsData');
  return (
    <>
      <div className="appointment-container w-full">
        <Sidebar className="sidebar-doctor" />
        <div className="justify-center  align-center w-full">
          <p>Appointments</p>

          <ul>
            {appointmentsData.map((appointment) => (
              <li key={appointment.id}>
                {appointment.doctor_id}
                {appointment.appointment_date}
                {appointment.appointment_time}
                {/* {appointment.appointment_date}
                {appointment.location}
                {appointment.appointment_time} */}
                {/* <button type="button"
                onClick={() => handleUpdateClick(appointment)}>Update</button> */}
                <button type="button" onClick={() => handleDeleteClick(appointment.id)}>Delete</button>
              </li>
            ))}
          </ul>

          {/* Form add appointment data */}
          <form className="w-[50%] h-[50%] ml-[25%] mt-[10%] items-center justify-center  p-4 space-y-4 bg-gray-100 rounded-lg">
            <div className="w-[80%] ml-[29.5%]">
              <DoctorsDropDown
                defaultValue={dayjs('2022-04-17T15:30')}
                changeMessage={changeMessage}
                onChange={handleChangeDrop}
              />
              <p>{message}</p>
            </div>
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Appoinment Date"
                  onChange={(date) => setDate(date)}
                  onClick={handleChangeDate}
                />
              </LocalizationProvider>
            </div>
            <div className="w-[60%] ml-[29.5%]">
              {/* <TimePicker onChange={(date) => setDate(date)} onClick={handleChangeDate} /> */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Appoinment Time"
                  onChange={(time) => setTime(time)}
                  onClick={handleChangeTime}
                />
              </LocalizationProvider>
            </div>
            {/* location = doctor.location */}
            <button type="submit" onClick={handleUpdateDrop} className="ml-[40.5%] text-md px-4 py-2 text-white rounded flex items-center rounded-full bg-[#97bf0f] hover:bg-[#5b740a] cursor-pointer transition-ease-in-out duration-100 sm:text-lg">Book Now</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewAppointments;
