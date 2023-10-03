import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiMenuAlt4 } from 'react-icons/hi';
import { LiaSearchSolid } from 'react-icons/lia';
import { AiOutlineClose } from 'react-icons/ai';
import { IoSettingsOutline } from 'react-icons/io5';
import { IoIosArrowDropright } from 'react-icons/io';
// import { doctorData } from '../redux/reducer/doctorSlice';

const Homepage = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  // const allDoctors = useSelector((state) => state.allDoctors);
  // // console.log(todos);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(doctorData());
  // }, [dispatch]);
  // console.log(allDoctors);

  return (
    <div className={`bg-home-background bg-cover bg-center h-screen relative flex flex-col items-center ${'md:bg-home-background'}`}>
      <div className="flex justify-between items-center h-24 w-[90%] mx-auto text-white">
        <HiMenuAlt4 onClick={handleNav} className={`text-3xl cursor-pointer hover:text-green-400 transition-colors ${isNavOpen ? 'hidden' : 'block'}`} />
        <LiaSearchSolid className={`text-3xl cursor-pointer hover:text-green-400 transition-colors ${isNavOpen ? 'hidden' : 'block'}`} />
      </div>

      <div
        className={`fixed left-0 top-0 w-full sm:w-[40%] h-full border-r bg-black opacity-65 border-r-gray-900 text-white transition-transform ease-in-out duration-500 ${isNavOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <ul className="pt-24 uppercase">
          <li className="py-4 px-8 cursor-pointer hover:text-green-400 transition-colors flex justify-center">
            <AiOutlineClose onClick={handleNav} className="text-3xl" />
          </li>
          <li className="py-4 px-8 border-b flex border-gray-700 cursor-pointer hover:text-green-400 transition-colors">
            <Link to="/sign_up" className="flex-1">Sign up</Link>
          </li>
          <li className="py-4 px-8 border-b flex border-gray-700 cursor-pointer hover:text-green-400 transition-colors">
            <Link to="/login" className="flex-1">Log in</Link>
          </li>
        </ul>
      </div>

      <div className="flex flex-col h-[80%] items-center justify-center text-white">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center font-bold">
          DocTalk
        </h1>
        <p className="text-center">
          Empowering Better Health
        </p>
        <button
          type="button"
          className="flex flex-row items-center justify-evenly mt-8 rounded-full bg-green-400 py-4 px-8 cursor-pointer hover:bg-green-500 transition-bg"
        >
          <IoSettingsOutline className="text-3xl" />
          <Link
            to="/doctors"
          >
            <span className="px-4">Get Your Appointment</span>
          </Link>
          <IoIosArrowDropright className="text-3xl" />
        </button>
      </div>
    </div>
  );
};

export default Homepage;
