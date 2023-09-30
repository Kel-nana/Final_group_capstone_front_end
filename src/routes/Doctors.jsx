import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from './Sidebar';
import farwordIcon from '../assets/forward.png';
import { doctorData } from '../redux/reducer/doctorSlice';


const Doctors = () => {

    const allDoctors = useSelector((state) => state.allDoctors);
    // console.log(todos);
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(doctorData());
    }, [dispatch]);
    console.log(allDoctors);

    // Loop through allDoctors and render each doctor's information
    // const doctorsList = allDoctors.map((item) => (
    //     <div className="doctor-box" key={doctor.id}>
    //       <img src="https://t3.ftcdn.net/jpg/02/60/04/08/360_F_260040863_fYxB1SnrzgJ9AOkcT0hoe7IEFtsPiHAD.jpg" className="doctor-image" alt={item.doc_name} />
    //       <h3 className="doctor-name">{item.doc_name}</h3>
    //       <p className="doctor-education">{item.education}</p>
    //       <p className="doctor-bio">{item.bio}</p>
    //       <p>Years of Experience: {item.years_of_experience}</p>
    //       <div className="social-icon-container">
    //                 <img src={facebookIcon} alt="Facebook Icon" className="social-icon" />
    //                 <img src={twitterIcon} alt="Twitter Icon" className="social-icon" />
    //                 <img src={linkedinIcon} alt="Linkedin Icon" className="social-icon" />
    //               </div>
    //     </div>

    //   ));

  const forwardArrow = () => {
    const container = document.querySelector('.doctors-listing');

    if (container) {
      const currentScroll = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;

      if (currentScroll + 250 > maxScroll) {
        // If scrolling exceeds the maximum scroll position, reset to the beginning
        container.scrollTo({
          left: 0,
          behavior: 'smooth',
        });
      } else {
        // Scroll by 250 pixels to the left
        container.scrollBy({
          left: 250,
          behavior: 'smooth',
        });
      }
    }
  };

  const backArrow = () => {
    const container = document.querySelector('.doctors-listing');

    if (container) {
      const currentScroll = container.scrollLeft;

      if (currentScroll - 250 < 0) {
        // If scrolling would go before the beginning, scroll to the end
        container.scrollTo({
          left: container.scrollWidth,
          behavior: 'smooth',
        });
      } else {
        // Scroll 250 pixels to the left (backward)
        container.scrollTo({
          left: currentScroll - 250,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <>
      <div className="doctor-container">
        <Sidebar className="sidebar-doctor" />
        <div className="doctor-small-container">
          <button type="button" onClick={backArrow}>
            <img src={farwordIcon} alt="Farword Icon" className="forward-button retrun-back-btn" />
          </button>
          <div className="doctor-list-container">
            <div className="doctor-text-container">

              <h2 className="doctor-title-text">Meet Our Physicians</h2>
              <p className="doctor-paragraph-text">Please select a doctor for an appointment</p>
            </div>

            <div className="doctors-listing">
            {/* {doctorsList} */}
            </div>
          </div>
          <button type="button" onClick={forwardArrow}>
            <img src={farwordIcon} alt="Farword Icon" className="forward-button" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Doctors;