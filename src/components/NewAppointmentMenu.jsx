/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaTwitter,
  FaFacebookF,
  FaGooglePlusG,
  FaVimeoV,
  FaPinterestP,
} from 'react-icons/fa';
import { LiaSearchSolid } from 'react-icons/lia';
import { HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import SignOut from '../routes/SignOut';

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

const NewAppointmentMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { label: 'Home', to: '/' },
    { label: 'DOCTORS', to: '/doctors' },
    { label: 'APPOINTMENTS', to: '/appointments' },
    { label: 'NEW APPOINTMENT', to: '/new-appointment' },
  ];

  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <>
      <div className="p-4 relative sm:absolute top-16 left-16">
        <button
          type="button"
          className="p-2 text-black hover:text-green-400 move-button"
          onClick={toggleMenu}
        >
          <div className="flex justify-between items-center h-24 w-[95vw] mx-auto text-white">
            <HiMenuAlt4
              onClick={handleNav}
              className={`text-3xl cursor-pointer hover:text-green-400 transition-colors ${
                isNavOpen ? 'hidden' : 'block'
              }`}
            />
            <LiaSearchSolid
              className={`text-3xl cursor-pointer hover:text-green-400 transition-colors ${
                isNavOpen ? 'hidden' : 'block'
              }`}
            />
          </div>
        </button>
      </div>
      <div
        className={`fixed left-0 top-0 w-[34%] h-full border-r backdrop-blur-sm sm:bg-black/30 text-black z-10  border-r-gray-900 text-white transition-transform ease-in-out duration-500 ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <ul className="pt-24 uppercase">
          <li
            className="py-4 px-8 cursor-pointer hover:text-green-400 transition-colors flex justify-center "
            onKeyDown={handleNav}
            onClick={handleNav}
          >
            <AiOutlineClose onClick={toggleMenu} className="text-3xl hover:text-[#97bf0f]" />
          </li>
          {menuItems.map((item, index) => (
            <li
              key={item.label}
              className={`py-4 px-8 ${
                index < menuItems.length - 1 ? 'border-b border-white-700' : ''
              } text-xl py-4 px-8 border-b  cursor-pointer hover:bg-[#97bf0f] hover:text-[white] transition-colors`}
            >
              <Link to={item.to} className="block w-full">
                {item.label}
              </Link>
            </li>
          ))}
          <SignOut className="py-4 px-8 cursor-pointer hover:text-green-400 transition-colors flex justify-center " />
        </ul>
        <ul className="flex py-24 flex-row self-end align-center justify-center">
          {socialIcons.map((icon) => (
            <li key={icon.id} className="p-[5px]">
              <icon.name className="cursor-pointer hover:text-[#97bf0f] transition-colors" />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default NewAppointmentMenu;
