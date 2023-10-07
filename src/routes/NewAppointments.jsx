import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';
import {
  fetchAppointments, addAppointment, deleteAppointment,
} from '../redux/reducer/appointmentSlice';
import Sidebar from './Sidebar';
import DoctorsDropDown from '../components/DoctorsDropDown';
import 'react-datepicker/dist/react-datepicker.css';

const Appointments = () => {
  const [date, setDate] = useState(new Date());
  const [message, setMessage] = useState('Hello');
  const [value, setTime] = useState('10:00');

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
      setFormData({ ...formData, appointment_date: date });
    }, 600);
  };

  const handleChangeTime = () => {
    setTimeout(() => {
      setFormData({ ...formData, appointment_time: value });
    }, 600);
  };

  useEffect(() => {
    let timeOutId3;
    if (formData) {
      timeOutId3 = setTimeout(() => {
        setFormData({
          user_id: '4',
          doctor_id: message,
          appointment_time: value,
          appointment_date: date,
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
          <form className="w-[50%]">
            <DoctorsDropDown
              changeMessage={changeMessage}
              onChange={handleChangeDrop}
            />
            <p>{message}</p>
            <div>
              <DatePicker selected={date} onChange={(date) => setDate(date)} onClick={handleChangeDate} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            <div className="w-[90%]">
              <TimePicker onChange={(value) => setTime(value)} onClick={handleChangeTime} />
            </div>
            {/* location = doctor.location */}
            <button type="submit" onClick={handleUpdateDrop}>Add Appointment</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Appointments;
