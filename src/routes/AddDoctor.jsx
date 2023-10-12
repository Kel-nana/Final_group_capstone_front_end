import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddDoctorForm = () => {
  const navigate = useNavigate();
  const [doctorData, setDoctorData] = useState({
    doc_name: '',
    education: '',
    bio: '',
    location: '',
    years_of_experience: 0,
    profile_pic: null,
  });

  const handleInputChange = (e) => {
    const {
      name, value, type, files,
    } = e.target;

    if (type === 'file') {
      setDoctorData({
        ...doctorData,
        [name]: files[0],
      });
    } else {
      setDoctorData({
        ...doctorData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('doctor[doc_name]', doctorData.doc_name);
      formData.append('doctor[education]', doctorData.education);
      formData.append('doctor[location]', doctorData.location);
      formData.append('doctor[bio]', doctorData.bio);
      formData.append(
        'doctor[years_of_experience]',
        doctorData.years_of_experience,
      );
      formData.append('doctor[profile_pic]', doctorData.profile_pic);

      const headers = {
        'Content-Type': 'multipart/form-data',
        Authorization: token,
      };

      await axios.post(
        'https://doctalk-r977.onrender.com/api/v1/doctors',
        formData,
        { headers },
      );

      toast.success('Doctor added successfully!', { type: toast.TYPE.SUCCESS });

      navigate('/doctors');

      setDoctorData({
        doc_name: '',
        education: '',
        bio: '',
        years_of_experience: 0,
        profile_pic: null,
        location: ' ',
      });
    } catch (error) {
      toast.error('Doctor addition failed due to technical error!', { type: toast.TYPE.ERROR });
    }
  };

  return (
    <div className="bg-slate-100 mx-auto flex flex-col justify-center items-center min-h-screen">
      <div className="flex flex-col justify-center items-center bg-white rounded shadow-md text-black px-4 py-8 mx-auto my-4 w-[90%] sm:w-[30%]">
        <h2 className="mb-8 text-3xl text-center">Add New Doctor</h2>
        <form onSubmit={handleSubmit} className="w-full">
          <div>
            <input
              className="block focus:outline-none border border-grey-light w-full p-3 rounded mb-4"
              placeholder="Name"
              type="text"
              name="doc_name"
              value={doctorData.doc_name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <input
              className="block focus:outline-none border border-grey-light w-full p-3 rounded mb-4"
              placeholder="Education"
              type="text"
              name="education"
              value={doctorData.education}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <input
              placeholder="Profile Picture URL"
              className="Profile picture block focus:outline-none border border-grey-light w-full p-3 rounded mb-4"
              type="text"
              name="profile_pic"
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <input
              className="block focus:outline-none border border-grey-light w-full p-3 rounded mb-4"
              placeholder="Location"
              type="text"
              name="location"
              value={doctorData.location}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <textarea
              className="block focus:outline-none border border-grey-light w-full p-3 rounded mb-4"
              placeholder="Bio"
              name="bio"
              value={doctorData.bio}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <input
              style={{
                WebkitAppearance: 'textfield',
                MozAppearance: 'textfield',
                appearance: 'textfield',
              }}
              className="block focus:outline-none border border-grey-light w-full p-3 rounded mb-4"
              placeholder="Years of Experience"
              type="number"
              name="years_of_experience"
              value={doctorData.years_of_experience}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <button type="submit" className="w-full text-center py-3 rounded bg-[#97bf0f] hover:bg-[#5b740a] text-white py-2 px-4">Add Doctor</button>
          </div>
        </form>
        <div>
          See all
          {' '}
          <a
            type="button"
            className="text-blue-500 inline-block"
            href="/doctors"
          >
            Doctors
          </a>
        </div>
      </div>
    </div>
  );
};

export default AddDoctorForm;
