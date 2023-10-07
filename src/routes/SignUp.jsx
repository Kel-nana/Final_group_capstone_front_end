import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import axios from "axios";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [message, setMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create a JSON object from formData
      const jsonData = JSON.stringify({
        user: {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        },
      });

      // Make a POST request using Axios with the JSON data
      const response = await axios.post(
        "http://127.0.0.1:3000/users",
        jsonData,
        {
          headers: {
            "Content-Type": "application/json", // Set the content type to JSON
          },
        }
      );
      // Handle the response as needed
      if (response.status === 200) {
        setMessage("Account created successfully"); // Set message to true
        // Clear the input field
        setFormData({
          name: "",
          email: "",
          password: "",
          confirm_password: "",
        });
        navigate("/login");
      } else {
        console.error("Failed to create an account");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (
      e.target.name === "confirm_password" &&
      formData.password !== e.target.value
    ) {
      setPasswordError("Passwords not match");
    } else {
      setPasswordError("");
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-slate-200">
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Register</h1>
            <div className="text-center text-green-600 mt-4">{message}</div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="block border focus:outline-none border-grey-light w-full p-3 rounded mb-4"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
              />
              <input
                type="text"
                className="block border focus:outline-none border-grey-light w-full p-3 rounded mb-4"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
              />
              <div className="text-center text-yellow-600 mt-4">
                Password Should be at least 6 charecter
              </div>
              <div className="flex items-stretch justify-between border border-grey-light items-stretch w-full rounded mb-4">
                <input
                  type={showPassword ? "text" : "password"}
                  className="focus:outline-none w-3/4 p-3"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
                <button type="button" onClick={togglePasswordVisibility}>
                  {showPassword ? (
                    <AiOutlineEyeInvisible className="w-6 h-6 mr-4" />
                  ) : (
                    <AiOutlineEye className="w-6 h-6 mr-4" />
                  )}
                </button>
              </div>
              {passwordError && (
                <div className="text-red-600">{passwordError}</div>
              )}
              <div className="flex items-stretch justify-between border border-grey-light items-stretch w-full rounded mb-4">
                <input
                  type={showPassword ? "text" : "password"}
                  className="focus:outline-none w-3/4 p-3"
                  name="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                />
                <button type="button" onClick={togglePasswordVisibility}>
                  {showPassword ? (
                    <AiOutlineEyeInvisible className="w-6 h-6 mr-4" />
                  ) : (
                    <AiOutlineEye className="w-6 h-6 mr-4" />
                  )}
                </button>
              </div>
              <button
                type="submit"
                className="w-full text-center py-3 rounded bg-green-400 hover:bg-green-500 text-white py-2 px-4"
              >
                Create Account
              </button>
            </form>
            <div className="text-center text-sm text-grey-dark mt-4">
              By signing up, you agree to the{" "}
              <a
                className="no-underline border-b border-grey-dark text-grey-dark"
                href="/terms-of-service"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                className="no-underline border-b border-grey-dark text-grey-dark"
                href="/privacy-policy"
              >
                Privacy Policy
              </a>
            </div>
          </div>
          <div className="text-grey-dark mt-6">
            Already have an account?
            <a
              className="no-underline border-b border-blue text-blue-500"
              href="../login/"
            >
              {" "}
              Log in
            </a>
          </div>
          <div className="text-grey-dark mt-6">
            <a className="border-blue text-blue-500" href="/">
              {" "}
              <AiOutlineHome className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
