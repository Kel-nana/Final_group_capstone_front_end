import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { IoAdd } from 'react-icons/io5';
import {
  fetchAppointments,
  deleteAppointment,
} from '../redux/reducer/appointmentSlice';
import Sidebar from './Sidebar';
import { doctorData } from '../redux/reducer/doctorSlice';

const Appointments = () => {
  const allDoctorList = useSelector((state) => state.doctorsList.allDoctors);
  const appointmentsData = useSelector(
    (state) => state.appointments.appointmentsdata,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAppointments());
    dispatch(doctorData());
  }, [dispatch]);

  const handleDeleteClick = (appointmentId) => {
    dispatch(deleteAppointment(appointmentId));
  };

  const formatDate = (originalDate) => {
    const date = new Date(originalDate);
    return `${date.toLocaleDateString()}`;
  };

  const formatTime = (originalTime) => {
    const date = new Date(originalTime);
    return `${date.toLocaleTimeString()}`;
  };

  return (
    <div className="flex bg-slate-200 h-full">
      <Sidebar />
      <div className="flex flex-col gap-8 mt-24 mx-auto">
        <div className="flex justify-between items-center px-12 sm:px-0">
          <h1 className="text-lg md:text-xl lg:text-2xl text-center font-bold uppercase">
            Your Appointments
          </h1>
          <Link to="/new-appointment-form">
            <button type="button" className="bg-sky-700 text-md px-4 py-2 text-white rounded flex items-center hover:bg-sky-900 hover:scale-105 transition-ease-in-out duration-100 sm:text-lg">
              <span className="text-white">
                <IoAdd />
              </span>
              New Appointment
            </button>
          </Link>
        </div>
        <div className="relative overflow-x-auto shadow-md rounded-lg hidden md:block">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 sm:overflow-x-auto">
            <thead className="text-md text-white uppercase bg-sky-700 text-white">
              <tr>
                <th className="text-center p-1">Appontment Id</th>
                <th className="py-4 px-2 text-center">Date</th>
                <th className="py-4 px-2 text-center">Time</th>
                <th className="py-4 px-2 text-center">Location</th>
                <th className="py-4 px-2 text-center">Doctor Details</th>
                <th className="py-4 px-2 text-center"> </th>
              </tr>
            </thead>
            {appointmentsData.map((appointment) => (
              <tbody key={appointment.id}>
                <tr className="text-black border-b-2 bg-white hover:bg-slate-100">
                  <td className="text-md text-center">
                    {appointment.id}
                  </td>
                  <td className="text-md py-2 px-2 text-center">
                    {formatDate(appointment.appointment_date)}
                  </td>
                  <td className="text-md py-2 px-2 text-center">
                    {formatTime(appointment.appointment_time)}
                  </td>
                  <td className="text-md py-2 px-2 text-center">
                    {appointment.location}
                  </td>
                  {allDoctorList
                    .filter((doctor) => doctor.id === appointment.doctor_id)
                    .map((doctor) => (
                      <td key={doctor.id} className="text-md float-left flex justify-center items-center px-8">
                        <img
                          className="w-16 h-16 rounded-full mx-auto"
                          src={doctor.profile_pic}
                          alt={doctor.doc_name}
                        />
                        <Link to={`/doctor/${doctor.id}`} key={doctor.id}>
                          <p className="text-sky-700 hover:underline" title="See Doctor Details">{doctor.doc_name}</p>
                        </Link>
                        <p className="border-sky-700">
                          <span>
                            (
                          </span>
                          {doctor.bio}
                          <span>
                            )
                          </span>
                        </p>
                      </td>
                    ))}

                  <td className="pr-4">
                    <button
                      title="Delete Appointment"
                      className="text-red-600 hover:text-red-900 text-lg hover:scale-110 transition-ease-in-out duration-100"
                      type="button"
                      tabIndex={0}
                      onClick={() => handleDeleteClick(appointment.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          handleDeleteClick(appointment.id);
                        }
                      }}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>

        {appointmentsData.map((appointment) => (
          <ul
            key={appointment.id}
            className="flex flex-col mx-auto shadow-md rounded-lg bg-white relative md:hidden w-4/5"
          >
            <li className="text-lg py-2 px-2 text-center flex justify-between border-b-2">
              <p>Appointment Id: </p>
              <p>{appointment.id}</p>
            </li>
            <li className="text-lg py-2 px-2 text-center flex justify-between border-b-2">
              <p>Time: </p>
              <p>{formatDate(appointment.appointment_time)}</p>
            </li>
            <li className="text-lg py-2 px-2 text-center flex justify-between border-b-2">
              <p>Location: </p>
              <p>{appointment.location}</p>
            </li>
            {allDoctorList
              .filter((doctor) => doctor.id === appointment.doctor_id)
              .map((doctor) => (
                <li key={doctor.id} className="flex flex-col text-lg py-2 px-4 text-center flex justify-between border-b-2">
                  <img
                    className="w-16 h-16 rounded-full mx-auto"
                    src={doctor.profile_pic}
                    alt={doctor.doc_name}
                  />
                  <Link to={`/doctor/${doctor.id}`} key={doctor.id}>
                    <p className="underline-offset-1 text-sky-700" title="See Doctor Details">{doctor.doc_name}</p>
                  </Link>
                  <p className="border-sky-700">
                    {doctor.bio}
                  </p>
                </li>
              ))}
            <li className="flex justify-center items-center">
              <button
                className="text-red-600 hover:text-red-900 text-2xl py-2 hover:scale-110 transition-ease-in-out duration-100"
                type="button"
                tabIndex={0}
                onClick={() => handleDeleteClick(appointment.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleDeleteClick(appointment.id);
                  }
                }}
              >
                <FaTrashAlt />
              </button>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default Appointments;
