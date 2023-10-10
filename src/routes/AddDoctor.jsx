import React, { useState } from 'react';
import axios from 'axios';

const AddDoctorForm = () => {
  const [doctorData, setDoctorData] = useState({
    doc_name: '',
    education: '',
    bio: '',
    years_of_experience: 0,
    profile_pic: null,
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

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

      const response = await axios.post(
        'https://doctalk-r977.onrender.com/api/v1/doctors',
        formData,
        { headers },
      );

      setSuccessMessage('Doctor added successfully');

      setDoctorData({
        doc_name: '',
        education: '',
        bio: '',
        years_of_experience: 0,
        profile_pic: null,
        location: ' ',
      });
    } catch (error) {
      setErrorMessage(`Error adding doctor: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Add New Doctor</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="doc_name">Doctor Name</label>
          <input
            type="text"
            name="doc_name"
            value={doctorData.doc_name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="education">Education</label>
          <input
            type="text"
            name="education"
            value={doctorData.education}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="profile_pic">Profile picture</label>
          <input
            type="text"
            name="profile_pic"
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            name="location"
            value={doctorData.location}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="bio">Bio</label>
          <textarea
            name="bio"
            value={doctorData.bio}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="years_of_experience">Years of Experience</label>
          <input
            type="number"
            name="years_of_experience"
            value={doctorData.years_of_experience}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <button type="submit">Add Doctor</button>
        </div>
      </form>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default AddDoctorForm;
