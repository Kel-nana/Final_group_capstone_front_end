import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';
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
    <div className="flex h-full p-4 sm:p-0">
      <div className="w-[20%]">
        <Sidebar />
      </div>
      <div className="flex flex-col gap-8 mt-24 mx-auto w-[80%]">
        <div className="flex justify-between items-center px-8 sm:px-8">
          <h1 className="text-lg sm:text-2xl text-center font-bold uppercase">
            Your Appointments
          </h1>
          <Link to="/new-appointment">
            <button
              type="button"
              className="text-md px-4 py-2 text-white rounded flex items-center rounded-full bg-[#97bf0f] hover:bg-[#5b740a] cursor-pointer transition-ease-in-out duration-100 sm:text-lg"
            >
              <span className="text-white text-md">
                <IoMdAdd />
              </span>
              New Appointment
            </button>
          </Link>
        </div>
        <div className="relative overflow-x-auto shadow-md rounded-lg hidden md:block mx-auto">
          <table className="w-full text-lg text-left text-gray-500 dark:text-gray-400 sm:overflow-x-auto p-4">
            <thead className="text-md text-white uppercase bg-[#97bf0f]">
              <tr>
                <th className="text-center p-1">Appontment Id</th>
                <th className="py-4 px-2 text-center">Date</th>
                <th className="py-4 px-2 text-center">Time</th>
                <th className="py-4 px-2 text-center">Location</th>
                <th className="py-4 px-2 text-center">Doctor</th>
                <th className="py-4 px-2 text-center"> </th>
              </tr>
            </thead>
            {appointmentsData.map((appointment) => (
              <tbody key={appointment.id}>
                <tr className="text-black border-b-2 bg-white hover:bg-green-100">
                  <td className="text-md text-center">{appointment.id}</td>
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
                      <td
                        key={doctor.id}
                        className="text-md float-left flex justify-center items-center px-8"
                      >
                        <img
                          className="w-16 h-16 rounded-full mx-auto"
                          src={doctor.profile_pic}
                          alt={doctor.doc_name}
                        />
                        <Link to={`/doctor/${doctor.id}`} key={doctor.id}>
                          <p
                            className="text-sky-700 hover:underline"
                            title="See Doctor Details"
                          >
                            {doctor.doc_name}
                          </p>
                        </Link>
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
                <li
                  key={doctor.id}
                  className="flex justify-between text-lg text-center border-b-2 items-center  px-2"
                >
                  <div className="flex flex-start">
                    <img
                      className="w-16 h-16 rounded-full mx-auto"
                      src={doctor.profile_pic}
                      alt={doctor.doc_name}
                    />
                  </div>
                  <Link to={`/doctor/${doctor.id}`} key={doctor.id}>
                    <p
                      className="underline-offset-1 text-sky-700"
                      title="See Doctor Details"
                    >
                      {doctor.doc_name}
                    </p>
                  </Link>
                </li>
              ))}
            <li className="flex justify-center items-center">
              <button
                title="Delete Appointment"
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
