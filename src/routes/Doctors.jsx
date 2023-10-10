import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import AddDoctorForm from './AddDoctor';
import facebookIcon from '../assets/facebook.png';
import twitterIcon from '../assets/twitter.png';
import linkedinIcon from '../assets/linkedin.png';
import forwardIcon from '../assets/forward.png';
import backwardIcon from '../assets/backward.png';
import Sidebar from './Sidebar';
import { doctorData } from '../redux/reducer/doctorSlice';

const Doctors = () => {
  const allDoctorList = useSelector((state) => state.doctorsList.allDoctors);
  const dispatch = useDispatch();

  // State to track the active button

  const [activeButton, setActiveButton] = useState(null);
  const [activeBounce, setActiveBounce] = useState(null);
  // Fetch doctor data when the component mounts
  useEffect(() => {
    dispatch(doctorData());
  }, [dispatch]);

  // Render each doctor's information
  const doctorsList = allDoctorList.map((doctor, index) => (
    <div
      className={`doctor-card ${index === 7 ? 'first_doc' : ''}`}
      key={doctor.id}
    >
      <Link to={`/doctor/${doctor.id}`} key={doctor.id}>
        <img
          className="doc-image"
          src={doctor.profile_pic}
          alt={doctor.doc_name}
        />

        <h3>{doctor.doc_name}</h3>
        <p>{doctor.education}</p>
        <p>{doctor.bio}</p>
        <p>
          Years of Experience:
          {doctor.years_of_experience}
        </p>
      </Link>
      <div className="social-icon-container">
        <img src={facebookIcon} alt="Facebook Icon" className="social-icon" />
        <img src={twitterIcon} alt="Twitter Icon" className="social-icon" />
        <img src={linkedinIcon} alt="Linkedin Icon" className="social-icon" />
      </div>
    </div>
  ));

  const scrollList = (direction) => {
    const container = document.querySelector('.doctors-listing');

    if (container) {
      const currentScroll = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;
      const scrollAmount = 282;

      let targetScroll;
      if (direction === 'forward') {
        targetScroll = Math.min(currentScroll + scrollAmount, maxScroll);
      } else {
        targetScroll = Math.max(currentScroll - scrollAmount, 0);
      }

      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth',
      });
    }
  };

  const forwardArrow = () => {
    scrollList('forward');
    setActiveButton('backward');
    setActiveBounce(true);
  };

  const backArrow = () => {
    scrollList('backward');
    setActiveButton('forward');
    setActiveBounce(true);
  };

  // // Remove the bounce class after animation duration
  // useEffect(() => {
  //   if (activeBounce) {
  //     const timeoutId = setTimeout(() => {
  //       setActiveBounce(false);
  //     }, 400); // animation duration

  //     return () => {
  //       clearTimeout(timeoutId); // Clear the timeout if the effect runs again
  //     };
  //   }
  //   return () => {};
  // }, [activeBounce]);

  return (
    <>
      <div className="doctor-container">
        <Sidebar className="sidebar-doctor" />
        <div className="doctors-main-container">
          <button type="button" onClick={backArrow}>
            <img
              src={backwardIcon}
              alt="Forward Icon"
              className={`return-back-btn ${
                activeButton === 'backward' ? 'grey' : ''
              } ${activeBounce && activeButton === 'forward' ? 'bounce' : ''}`}
            />
          </button>
          <div className="doctor-list-container">
            <div className="doctor-text-container">
              <h2 className="doctor-title-text">Meet Our Doctors</h2>
              <p className="doctor-paragraph-text">
                Please select a doctor for an appointment
              </p>
            </div>
            <div className="doctors-listing">{doctorsList}</div>
          </div>
          <button type="button" onClick={forwardArrow}>
            <img
              src={forwardIcon}
              alt="Forward Icon"
              className={`forward-button ${
                activeButton === 'forward' ? 'grey' : ''
              } ${activeBounce && activeButton === 'backward' ? 'bounce' : ''}`}
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default Doctors;
