
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAppointments, addAppointment, updateAppointment, deleteAppointment } from '../redux/reducer/appointmentSlice';
import Sidebar from './Sidebar';

const Appointments = () => {
    // const status = useSelector((state) => state.appointments.status);
    // const error = useSelector((state) => state.appointments.error);
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

      const [updateFormData, setUpdateFormData] = useState({
        id: '', // Add an id field to track the appointment to be updated
        user_id: '',
        doctor_id: '',
        appointment_time: '',
        appointment_date: '',
        location: '',
      });

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

      const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setUpdateFormData({ ...updateFormData, [name]: value });
      };

      const handleUpdateClick = (appointment) => {
        setUpdateFormData(appointment);
      };

      const handleDeleteClick = (appointmentId) => {
        // Dispatch the deleteAppointment action with the appointmentId
        dispatch(deleteAppointment(appointmentId));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Dispatch the addAppointment action with formData
        dispatch(addAppointment(formData));
        // Clear the form or perform any other necessary actions
        setFormData({
            user_id: '', // Clear the user_id field
      doctor_id: '', // Clear the doctor_id field
      appointment_time: '',
          appointment_date: '',
          location: '',
          // Clear other form fields
        });
      };

        // Function to handle the update submission
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    // Dispatch the updateAppointment action with updateFormData
    dispatch(updateAppointment(updateFormData));
    // Clear the update form
    setUpdateFormData({
      id: '',
      user_id: '',
      doctor_id: '',
      appointment_time: '',
      appointment_date: '',
      location: '',
    });
  };
//   Getting the appointments data
    useEffect(() => {
        dispatch(fetchAppointments());
      }, [dispatch]);

  console.log(appointmentsData)
    return (
      <>
        <div className="appointment-container">
          <Sidebar className="sidebar-doctor" />
          <div className='justify-center  align-center '>
         <p>Appointments</p>
        
          <ul>
            {appointmentsData.map((appointment) => (
              <li key={appointment.id}>
                {appointment.appointment_date} - {appointment.location}
                <button onClick={() => handleUpdateClick(appointment)}>Update</button>
                <button onClick={() => handleDeleteClick(appointment.id)}>Delete</button> 
              </li>
            ))}
          </ul>

          {/* Form add appointment data */}
        <form onSubmit={handleSubmit}>
        <input
        type="text"
        name="doctor_id"
        placeholder="doctor_id"
        value={formData.doctor_id}
        onChange={handleChange}
        required
      />
        <input
        type="text"
        name="user_id"
        placeholder="user_id"
        value={formData.user_id}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="appointment_time"
        placeholder="appointment_time"
        value={formData.appointment_time}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="appointment_date"
        placeholder="Appointment Date"
        value={formData.appointment_date}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        required
      />

      <button type="submit">Add Appointment</button>
    </form> *

    {/* For updating appointment */}
    <form onSubmit={handleUpdateSubmit}>
        {/* Include form fields with values from updateFormData */}
         <input
          type="text"
          name="doctor_id"
          placeholder="doctor_id"
          value={updateFormData.doctor_id}
          onChange={handleUpdateChange}
          required
        /> 
          <input
        type="text"
        name="user_id"
        placeholder="user_id"
        value={updateFormData.user_id}
        onChange={handleUpdateChange}
        required
      />
      <input
        type="text"
        name="appointment_time"
        placeholder="appointment_time"
        value={updateFormData.appointment_time}
        onChange={handleUpdateChange}
        required
      />
      <input
        type="text"
        name="appointment_date"
        placeholder="Appointment Date"
        value={updateFormData.appointment_date}
        onChange={handleUpdateChange}
        required
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={updateFormData.location}
        onChange={handleUpdateChange}
        />
        <button type="submit">Update Appointment</button>
      </form>
      </div>
        </div>
      </>
    );
  };
  
  export default Appointments;
  