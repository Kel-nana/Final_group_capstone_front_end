import React from 'react';
import { AiOutlineHome } from 'react-icons/ai';

const Login = () => (
  <div>
    <div className="bg-slate-200">
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Login</h1>

            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"
            />

            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
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

export default Login;
