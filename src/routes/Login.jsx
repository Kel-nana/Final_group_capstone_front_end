import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import axios from 'axios';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create a JSON object from formData
      const jsonData = JSON.stringify({
        user: {
          email: formData.email,
          password: formData.password,
        },
      });

      // Make a POST request using Axios with the JSON data
      const response = await axios.post(
        'http://127.0.0.1:3000/users/sign_in',
        jsonData,
        {
          headers: {
            'Content-Type': 'application/json', // Set the content type to JSON
          },
        },
      );
      console.log(response);
      // Handle the response as needed
      if (response.status === 200) {
        const token = response.headers.get('Authorization');
        // setMessage('Account created successfully'); // Set message to true
        // Clear the input field
        localStorage.setItem('token', token);
        setFormData({
          email: '',
          password: '',
        });
        navigate('/doctors');
      } else {
        console.error('Authentication failed. Please try again');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div>
      <div className="bg-slate-200">
        <div className="bg-grey-lighter min-h-screen flex flex-col">
          <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
              <h1 className="mb-8 text-3xl text-center">Login</h1>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                />

                <input
                  type="password"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                />

                <div className="mb-6 flex items-center justify-between">
                  {/* Remember me checkbox */}
                  <div className="mb-[0.125rem] block min-h-[1.5rem]">
                    <input
                      id="checkbox1"
                      type="checkbox"
                      defaultValue=""
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 hover:cursor-pointer"
                    />
                    {' '}
                    {/* eslint-disable jsx-a11y/label-has-associated-control */}
                    <label
                      className="inline-block pl-[0.15rem] hover:cursor-pointer"
                      htmlFor="checkbox1"
                    >
                      Remember me
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full text-center py-3 rounded bg-green-400 hover:bg-green-500 text-white py-2 px-4"
                >
                  Login
                </button>
              </form>
            </div>
            <div className="text-grey-dark mt-6">
              Don&apos;t have an account?
              {' '}
              <a
                className="no-underline border-b border-blue text-blue-500"
                href="../sign_up/"
              >
                Sign up
              </a>
            </div>

            <div className="text-grey-dark mt-6">
              <a
                className="no-underline border-b border-blue text-blue-500"
                href="/"
              >
                {' '}
                <AiOutlineHome className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
