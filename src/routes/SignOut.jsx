import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignOut() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const response = await fetch(
        'https://doctalk-r977.onrender.com//users/sign_out',
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('token'),
          },
        },
      );
      localStorage.removeItem('token');

      if (response.ok) {
        toast.success('Sign-out successful.', { type: toast.TYPE.SUCCESS });
        setTimeout(() => {
          navigate('/');
        }, 1000); // Wait for 1 second before navigating
      } else {
        toast.error('Sign-out failed due to technical error!', { type: toast.TYPE.ERROR });
        navigate('/doctors');
      }
    } catch (error) {
      toast.error('Sign-out failed due to technical error!', { type: toast.TYPE.ERROR });
      navigate('/doctors');
    }
  };

  return (
    <li className="w-full text-center py-4 mb-4 hover:text-white hover:bg-[#97bf0f] transition-all">
      <ToastContainer />
      <button onClick={handleSignOut} type="submit">
        SIGN OUT
      </button>
    </li>
  );
}

export default SignOut;
