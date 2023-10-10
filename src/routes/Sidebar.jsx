/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaTwitter,
  FaFacebookF,
  FaGooglePlusG,
  FaVimeoV,
  FaPinterestP,
} from 'react-icons/fa';
import { HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import DocLogo from '../assets/logo.png';
import SignOut from './SignOut';

const socialIcons = [
  {
    id: 1,
    name: FaTwitter,
  },
  {
    id: 2,
    name: FaFacebookF,
  },
  {
    id: 3,
    name: FaGooglePlusG,
  },
  {
    id: 4,
    name: FaVimeoV,
  },
  {
    id: 5,
    name: FaPinterestP,
  },
];

const Sidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { label: 'Home', to: '/' },
    { label: 'DOCTORS', to: '/doctors' },
    { label: 'APPOINTMENTS', to: '/appointments' },
    { label: 'NEW APPOINTMENTS', to: '/new-appointment' },
  ];

  const [activeBounce, setActiveBounce] = useState(false);
  const [activeLink, setActivelink] = useState('');
  const navigate = useNavigate();

  const BounceEffect = () => {
    setActiveBounce(true);
  };

  const DelayLink = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setActivelink('/');
      navigate('/');
    }, 600);
  };

  useEffect(() => {
    let timeOutId;
    if (activeLink) {
      timeOutId = setTimeout(() => {
        setActivelink('/');
      }, 600);
    }
    return () => {
      clearTimeout(timeOutId); // Clear the timeout if the effect runs again
    };
  }, [activeLink]);

  useEffect(() => {
    if (activeBounce) {
      const timeoutId = setTimeout(() => {
        setActiveBounce(false);
      }, 400); // animation duration

      return () => {
        clearTimeout(timeoutId); // Clear the timeout if the effect runs again
      };
    }
    // Add a return statement for the case where activeBounce is false
    return () => {};
  }, [activeBounce]);

  const setPath = activeLink || '/';

  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div className="h-[100%] w-[20%]">
      <div className="lg:hidden p-4 absolute">
        <button
          type="button"
          className="p-2 text-black hover:text-green-400 move-button"
          onClick={toggleMenu}
        >
          <HiMenuAlt4
            onClick={handleNav}
            className={`text-3xl cursor-pointer hover:text-green-400 transition-colors ${
              isNavOpen ? 'hidden' : 'block'
            }`}
          />
        </button>
      </div>
      <div
        className={`fixed left-0 top-0 w-full h-full border-r bg-black z-10 opacity-65 border-r-gray-900 text-white transition-transform ease-in-out duration-500 ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <ul className="pt-24 uppercase">
          <li
            className="py-4 px-8 cursor-pointer hover:text-green-400 transition-colors flex justify-center "
            onKeyDown={handleNav}
            onClick={handleNav}
          >
            <AiOutlineClose onClick={toggleMenu} className="text-3xl" />
          </li>
          {menuItems.map((item, index) => (
            <li
              key={item.label}
              className={`py-4 px-8 ${
                index < menuItems.length - 1 ? 'border-b border-white-700' : ''
              } cursor-pointer hover:text-green-400 transition-colors`}
            >
              <Link to={item.to} className="block w-full">
                {item.label}
              </Link>
            </li>
          ))}
          <SignOut />
        </ul>
        <ul className="flex py-24 flex-row self-end align-center justify-center">
          {socialIcons.map((icon) => (
            <li key={icon.id} className="p-[5px]">
              <icon.name className="cursor-pointer hover:text-green-400 transition-colors" />
            </li>
          ))}
        </ul>
      </div>
      <div className="text-[#181818] w-[100%] min-h-screen py-2 border-r-2 border-r-[#f3f3f3] overflow-none hidden lg:grid bg-white">
        <ul className="flex flex-col py-16 justify-center items-center text-base sm:text-lg md:text-lg lg:text-xl xl:text-2xl">
          <button
            type="button"
            className={`logo w-[80%] ml-[2%] mb-8${
              activeBounce ? 'bounce' : ''
            }`}
            onClick={BounceEffect}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                BounceEffect(); // Perform the same action as onClick for keyboard users
              }
            }}
            tabIndex={0}
          >
            <Link onClick={DelayLink} to={setPath} className="block w-full ">
              <img src={DocLogo} alt="Logo img" className="" />
            </Link>
          </button>

          {menuItems.map((item) => (
            <li
              key={item.label}
              className={`w-full text-center py-4 mb-4 hover:text-white hover:bg-[#97bf0f] transition-all ${
                item.label === 'Home' ? 'hidden' : 'block'
              }`}
            >
              <Link to={item.to} className="block w-full">
                {item.label}
              </Link>
            </li>
          ))}
          <SignOut />
        </ul>
        <ul className="flex py-24 flex-row self-end align-center justify-center">
          {socialIcons.map((icon) => (
            <li key={icon.id} className="p-[5px]">
              <icon.name className="cursor-pointer hover:text-[#97bf0f] transition-colors" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
