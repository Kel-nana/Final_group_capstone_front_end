import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { IoIosArrowDropright, IoIosArrowDropleft } from 'react-icons/io';
import { FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Sidebar from './Sidebar';
import '../assets/styles/doctordetails.css';
import { deleteDoctor } from '../redux/store';

const DoctorDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const doctorsList = useSelector((state) => state.doctorsList);
  const finalDoctorsData = doctorsList.allDoctors;
  const doctor = finalDoctorsData.find((item) => item.id === parseInt(id, 10));

  const handleDeleteClick = async (doctorId) => {
    navigate('/doctors');
    await dispatch(deleteDoctor(doctorId)); // Wait for the doctor to be deleted
    toast.success('Doctor deleted successfully.', { type: toast.TYPE.SUCCESS });
  };
  return (
    <div>
      <Sidebar />
      <div className="flex justify-between align-center flex-col text-center mt-16 p-4 sm:flex-row sm:ml-16 md:-mt-125 md:-mt-125 lg:-mt-125">
        <div className="flex justify-center relative sm:ml-96">
          <img
            className="rounded-full w-80 h-80 z-0"
            src={doctor.profile_pic}
            alt="Doctor Profile"
          />
          <div className="bg-[#e2e3e5] sm:flex absolute right-[0] rounded-md">
            <button
              title="Delete This Doctor"
              type="button"
              className="p-4 text-red-600 hover:text-red-900 text-xl hover:scale-110 transition-ease-in-out duration-100"
              tabIndex={0}
              onClick={() => handleDeleteClick(doctor.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleDeleteClick(doctor.id);
                }
              }}
            >
              <FaTrashAlt />
            </button>
          </div>
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
        <Link to="/doctors">
          <button
            type="button"
            className="back-btn flex flex-row items-center justify-evenly mt-8 ml-70 rounded-r-full  bg-[#97bf0f] hover:bg-[#5b740a] py-4 px-8 cursor-pointer transition-bg"
          >
            <IoIosArrowDropleft className="text-3xl text-white" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DoctorDetails;
