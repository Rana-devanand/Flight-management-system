import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SetnewPassword() {

  const URL = import.meta.env.VITE_BACKEND_API_URL;
  const {id} =useParams();
  const navigate = useNavigate();
  
  const [userData , setUserData] = useState({});
  // console.log(userData.email);

// http://localhost:4000/api/v1/getuserby/:id 
  const getUserById = async () => {
    try {
      const response = await axios.get(`${URL}/api/v1/getuserby/${id}`);
      // console.log(response);
      setUserData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  const [password, setPassword] = useState({
    id : id,
    password: "",
    confirmPassword: ""
  })
  console.log(password);
   const handleChange = (e) => {
    setPassword({...password ,[e.target.name]: e.target.value})
  }

// http://localhost:4000/api/v1/updatePassword
  const HandleSubmit = async (e) => {
    e.preventDefault();
    if(password.password.length < 5|| password.confirmPassword < 5){
      toast.error("Password should be at least 8 characters long");
    }
    if(password.password === password.confirmPassword){
      try {
        const response = await axios.patch(`${URL}/api/v1/updatepassword` , password);
        console.log(response);
        if(response.status === 200){
          toast.success("Password updated successfully");
          setTimeout(() =>{
            navigate("/login");
          },2000)
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Passwords do not match");
    }
  }



  useEffect(()=>{
    getUserById();
  },[])
  return (
    <>
      <div className="py-12 h-screen bg-[#111827]">
        <div className="flex h-auto items-center justify-center">
          <div className="rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-900 flex-col flex h-full items-center justify-center sm:px-4">
            <div className="flex h-full w-96 flex-col justify-center gap-4 p-6">
              <div className="left-0 right-0 inline-block border-gray-200 px-2 py-2.5 sm:px-4">
                <form
                  className="flex flex-col gap-4 pb-4"
                  onSubmit={HandleSubmit}
                >
                  <h1 className="mb-4 text-2xl font-bold  dark:text-white">
                    Choose New Password
                  </h1>
                  <h6 className='text-white'><b>{userData.username}</b></h6>
                  <h6 className='text-white italic'>{userData.email}</h6>
                  <div>
                    <div className="mb-2">
                      <label
                        className="text-sm font-medium text-gray-900 dark:text-gray-300"
                        htmlFor="email"
                      >
                        Enter Password:
                      </label>
                    </div>
                    <div className="flex w-full rounded-lg pt-1">
                      <div className="relative w-full">
                        <input
                          className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                          id="password"
                          type="password"
                          name="password"
                          placeholder="* * * * * *"
                          required=""
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="mb-2">
                      <label
                        className="text-sm font-medium text-gray-900 dark:text-gray-300"
                        htmlFor="email"
                      >
                        Enter Password again:
                      </label>
                    </div>
                    <div className="flex w-full rounded-lg pt-1">
                      <div className="relative w-full">
                        <input
                          className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                          id="confirmPassword"
                          type="password"
                          name="confirmPassword"
                          placeholder="* * * * * *"
                          required=""
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <button
                      type="submit"
                      className="border transition-colors focus:ring-2 p-0.5 disabled:cursor-not-allowed border-transparent bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white disabled:bg-gray-300 disabled:text-gray-700 rounded-lg "
                      //  onClick={notify}
                    >
                      <span className="flex items-center justify-center gap-1 font-medium py-1 px-2.5 text-base false">
                        Change Password
                      </span>
                    </button>
                  </div>                 
                </form>
                <ToastContainer/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SetnewPassword