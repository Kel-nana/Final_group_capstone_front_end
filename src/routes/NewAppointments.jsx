/* eslint-disable jsx-a11y/label-has-associated-control */
import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { addAppointment } from '../redux/reducer/appointmentSlice';
import DoctorDropdown from '../components/DoctorsDropDown';
import { doctorData } from '../redux/reducer/doctorSlice';

const NewAppointment = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const [selectedDoctorIndex, setSelectedDoctorIndex] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  // const [location, setLocation] = useState('');
  const [formData, setFormData] = useState({
    // Initialize your form fields here
    // user_id: '2',
    doctor_id: '',
    appointment_time: '',
    appointment_date: '',
    location: '',
    // Add more fields as needed
  });

  
  const allDoctorList = useSelector((state) => state.doctorsList.allDoctors);
  console.log(allDoctorList);
  const handleDoctorChange = (doctorIndex) => {
    setSelectedDoctorIndex(doctorIndex);
    // console.log(doctorIndex);
  };
  
  const doctor = allDoctorList.find((doctor) => doctor.id === selectedDoctorIndex);
  let doctorsLocation;
  if (doctor) {
    // access the property of doctors object
    const { location } = doctor;
    doctorsLocation = location;
  } else {
    doctorsLocation = null;
  }
  
  console.log(date, time, selectedDoctorIndex, doctorsLocation, 'update');

  useEffect(() => {
    dispatch(doctorData());
  }, [dispatch]);

  const handleSubmit = () => {
    dispatch(addAppointment(formData));
    setFormData({
      // user_id: '2',
      doctor_id: selectedDoctorIndex,
      appointment_time: time,
      appointment_date: date,
      location: doctorsLocation,
      // doctor_id: selectedDoctorIndex,
      // appointment_time: time,
      // appointment_date: date,
      // location: 'nairobi',
    });
    // navigate('/appointments');
  };

  return (
    <div>
      <h1>New Appointment</h1>
      <form onSubmit={handleSubmit}>
        <DoctorDropdown
          allDoctorList={allDoctorList}
          onChange={handleDoctorChange}
          selectedDoctorIndex={selectedDoctorIndex}
          id="name"
        />
        {allDoctorList
          .filter((doctor) => doctor.id === selectedDoctorIndex)
          .map((doctor) => (
            <div key={doctor.id}>
              <p>
                Doctor&apos;s Location:
                {' '}

                {' '}
                {doctor.location ? doctor.location : 'Location'}

              </p>
            </div>
          ))}
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <label htmlFor="time">Time</label>
        <input
          type="time"
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <button type="submit" onClick={handleSubmit}>Add Appointment</button>
      </form>
    </div>
  );
};

export default NewAppointment;
