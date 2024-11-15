import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import load from "../../public/load.svg"
import { useNavigate } from "react-router-dom";

function ForgetPassword() {
  const URL = import.meta.env.VITE_BACKEND_API_URL;
  const [loading, setLoading] = useState(false);
  const [visible , setVisible] = useState(false);
  const navigate = useNavigate();

  const [email, setEmail] = useState({
    Email: "",
  });

     const [otp, setOtp] = useState({
          Otp: "",
     });
     const [userOtp , setUserOtp] = useState({
      otp : "",
     });

     const [userid , setUserId] = useState({
      id:"",
     })

  const handleChange = (e) => {
    setEmail({ ...email, [e.target.name]: e.target.value });
  };

  // http://localhost:4000/api/v1/sendOtp
  const HandleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setVisible(true);
    try {
      const response = await axios.post(`${URL}/api/v1/sendOtp`, email);
      // console.log(response);
      // console.log(response.status)
      if(response.status === 200) {
        setLoading(false);
        toast.success(response.data.message);
        setUserId({...userid ,id: response.data.data.id});
        setOtp({...otp , Otp: response.data.otp});
      }
       else {
        setVisible(false);
        setLoading(false);
        toast.error(response.data.message);
      }

    } catch (error) {
      console.log(error);
    }
  };
  const HandleOtp = (e) => {
    setUserOtp({...userOtp , [e.target.name] : e.target.value })
  }

  const ForgetPasswordPage = (e) => {
    e.preventDefault();
    if(otp.Otp == userOtp.otp){
      setTimeout(()=>{
        navigate(`/newpassword/${userid.id}`);
      }, 3000)
      toast.success("Otp Matched Successfully");
    }
     else{
      toast.error("Otp Doesn't Match");
    }
  }


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
                    Forget Password
                  </h1>
                  <div>
                    <div className="mb-2">
                      <label
                        className="text-sm font-medium text-gray-900 dark:text-gray-300"
                        htmlFor="email"
                      >
                        Email:
                      </label>
                    </div>
                    <div className="flex w-full rounded-lg pt-1">
                      <div className="relative w-full">
                        <input
                          className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                          id="email"
                          type="email"
                          name="email"
                          placeholder="email@example.com"
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
                        send
                      </span>
                    </button>
                  </div>
                  
                  {/* If email send properly than show this content */}
                  {visible ? 
                  (
                   <>
                     {loading ?
                         (<>
                         <img src={load} style={{width:50 , height : 50}}/>
                         
                        </>
                        )
                          : 
                          (<>
                               <div className="mt-5">
                            <label
                              className="text-sm font-medium text-gray-900 dark:text-gray-300"
                              htmlFor="email"
                            >
                              Enter OTP:
                            </label>
                          </div>
                          <div className="flex w-full rounded-lg pt-1">
                            <div className="relative w-full">
                              <input
                                className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                                id="email"
                                type="text"
                                name="otp"
                                placeholder="Enter OTP"
                                required=""
                                onChange={HandleOtp}
                              />
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                              <button
                                   onClick={ForgetPasswordPage}
                                   type="submit"
                                   className="border transition-colors focus:ring-2 p-0.5 disabled:cursor-not-allowed border-transparent bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white disabled:bg-gray-300 disabled:text-gray-700 rounded-lg "
                                   //  onClick={notify}
                                   >
                                   <span className="flex items-center justify-center gap-1 font-medium py-1 px-2.5 text-base false">
                                   Verify OTP
                                   </span>
                              </button>

                              <div className="resend">
                                  <button onClick={HandleSubmit}><span className="text-white">Resend OTP</span></button>
                              </div>
                         </div>
                          </>) 
                          }
                   </>
                  )
                  :
                  ("")
                  };
                  
                  
                  <ToastContainer />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgetPassword;
