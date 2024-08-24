import React, { useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const CreateAccount = () => {

  // const navigate = useNavigate();
  const formRef = useRef(null);
  const [value, setValue] = useState(
    {
      username: "",
      email: "",
      password: "",
      number: "",
    }
  );

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  }

  const notify = (e) => {
    toast(e);
  }

  //http://localhost:3000/api/V1/createUser
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const URL = import.meta.env.VITE_BACKEND_API_URL;
      if ((value.username) && (value.email) && (value.password) && (value.number)) {
        const response = await axios.post(`${URL}/api/V1/createUser`, value);
        formRef.current.reset();
        console.log(response.status);
        toast("Successfully created account");
      }
      else {
        toast.error("All fields are required!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const notify = toast("Successfully created account");

  return (

    <div className=" bg-zinc-900 text-gray-900 flex justify-center h-screen">
      <div className=" bg-[#111827] shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 ">
          {/* <div className="border h-28">
            <img
              src={createUserLogo}
              className="w-full h-full border"
            />
          </div> */}
          <div className="flex flex-col items-center border py-10 px-3 rounded-lg bg-[#111827] dark:border-gray-700">
            <div className="w-full flex-1">
              <div className="flex flex-col items-center">
                <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-green-200 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                  <div className="bg-white p-2 rounded-full">
                    <svg className="w-4" viewBox="0 0 533.5 544.3">
                      <path
                        d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                        fill="#4285f4"
                      />
                      <path
                        d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                        fill="#34a853"
                      />
                      <path
                        d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                        fill="#fbbc04"
                      />
                      <path
                        d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                        fill="#ea4335"
                      />
                    </svg>
                  </div>
                  <span className="ml-4 ">Sign In with Google</span>
                </button>
              </div>

              <div className="my-12 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-400 tracking-wide font-medium bg-[#111827]  transform translate-y-1/2">
                  Or sign In with E-mail
                </div>
              </div>

              <div className="mx-auto max-w-xs">
                <form action="" onSubmit={handleSubmit} ref={formRef}>
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-[#374151] border dark:border-gray-700 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-gray-600 text-white"
                    type="text"
                    name="username"
                    onChange={handleChange}
                    placeholder="Full name"
                  />

                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-[#374151] border dark:border-gray-700 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-gray-600 mt-5 text-white"
                    type="email"
                    name="email"
                    onChange={handleChange}
                    placeholder="Email"
                  />
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-[#374151] border dark:border-gray-700 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-gray-600 mt-5  text-white"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    placeholder="Password"
                  />

                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-[#374151] border dark:border-gray-700 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-100 focus:bg-gray-600 mt-5  text-white"
                    type="text"
                    name="number"
                    onChange={handleChange}
                    placeholder="+91 xxxxxxxx"
                  />

                  <button className="mt-5 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    type="submit"
                    onClick={notify}
                  >
                    <svg
                      className="w-6 h-6 -ml-2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="8.5" cy="7" r="4" />
                      <path d="M20 8v6M23 11h-6" />
                    </svg>
                    <span className="ml-">Sign In</span>
                  </button>
                  <ToastContainer />
                </form>

                {/* <p className="mt-6 text-xs text-gray-600 text-center">
                  I agree to abide by FLight India
                  <a
                    href="#"
                    className="border-b border-gray-500 border-dotted"
                  >
                    Terms of Service
                  </a>
                  and its
                  <a
                    href="#"
                    className="border-b border-gray-500 border-dotted"
                  >
                    Privacy Policy
                  </a>
                </p> */}
              </div>
            </div>
          </div>
        </div>

        {/* <div className="flex-1 bg-green-100 text-center hidden lg:flex">
          <img src={BackgroundImage} alt="" srcset="" />
        </div> */}
      </div>
    </div >
  );
};

export default CreateAccount;
