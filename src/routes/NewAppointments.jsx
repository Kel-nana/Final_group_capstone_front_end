import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { addAppointment } from '../redux/reducer/appointmentSlice';
import NewAppointmentMenu from '../components/NewAppointmentMenu';
import DoctorsDropDown from '../components/DoctorsDropDown';
import 'react-datepicker/dist/react-datepicker.css';
import { doctorData } from '../redux/reducer/doctorSlice';

const NewAppointments = () => {
  // fetching doctors data
  const allDoctorList = useSelector((state) => state.doctorsList.allDoctors);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(doctorData());
  }, [dispatch]);

  // setting the values to be passed down
  const [message, setMessage] = useState('');
  const [date, setDate] = useState(dayjs('2023-10-07'));
  const [time, setTime] = useState(dayjs('2023-10-07T15:30'));

  // Get the time in the desired format and date format
  const formattedTime = time.format('HH:mm:ss');
  const formattedDate = date.format('MMM D YYYY');

  // setting the doctors location
  const doctor = allDoctorList.find((doctor) => doctor.id === message);
  let doctorsLocation;
  if (doctor) {
    // access the property of doctors object
    const { location } = doctor;
    doctorsLocation = location;
  } else {
    doctorsLocation = 'Location';
  }

  // passing props from child to parent component
  const changeMessage = (newMessage) => {
    setMessage(newMessage);
  };
  // const dispatch = useDispatch();
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
          location: doctorsLocation,
        });
      }, 600);
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
  };

  return (
    <>
      <div className="appointment-container appointment-bg green-tint">
        <NewAppointmentMenu />
        <div className="justify-center  align-center w-full">
          <div>

            <p className="appointment header mb-2 mt-0 text-3xl font-medium leading-tight text-primary font-bold text-white">BOOK APPOINTMENT</p>
            <hr className="my-12 h-px w-[50%] border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100 white-color ml-[25%] " />
          </div>

          <form className="w-[350px] h-[63%] ml-[35%] mt-[10%] items-center justify-center  p-4 space-y-4 bg-gray-100 rounded-lg appointment-form">
            <div className="w-full doc-picker">
              <DoctorsDropDown
                changeMessage={changeMessage}
                onChange={handleChangeDrop}
              />
              <p>{message}</p>
            </div>
            <div className="date-picker">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Appointment Date"
                  onChange={(date) => setDate(date)}
                  onClick={handleChangeDate}
                />
              </LocalizationProvider>
            </div>
            <div className="time-picker">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Appointment Time"
                  onChange={(time) => setTime(time)}
                  onClick={handleChangeTime}
                />
              </LocalizationProvider>
            </div>
            <div>
              <p className=" text-md px-4 py-2 text-white rounded flex items-center rounded-full bg-[#97bf0f] hover:bg-[#5b740a] cursor-pointer transition-ease-in-out duration-100 sm:text-lg">{doctorsLocation}</p>
            </div>
            <button type="submit" onClick={handleUpdateDrop} className=" text-md px-4 py-2 text-white rounded flex items-center rounded-full bg-[#97bf0f] hover:bg-[#5b740a] cursor-pointer transition-ease-in-out duration-100 sm:text-lg">Book Now</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewAppointments;
