import React, { useEffect, useRef, useState } from "react";
import skyImage from "../../assets/images/sky.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function UpdateCity() {
  const index = useParams();
  const id = index.id;

  // const navigate = useNavigate();

  const URL = import.meta.env.VITE_BACKEND_API_URL;
  const [city , SetCity] = useState({});

  // http://localhost:4000/api/V1/city/2
  const LoadCityId = async () =>{
    try {
      const response = await axios.get(URL+`/api/v1/city/${id}`);
      SetCity(response.data.data);
      // console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(()=>{
    LoadCityId();
  },[])

  // http://localhost:4000/api/V1/updateCity/:cityId
  const HandleSubmit = async (e) =>{
    e.preventDefault();
    try {
      const UpdateUrl = `${URL}/api/V1/updateCity/${id}`;
  
      const updateCity = await axios.patch(UpdateUrl ,{
       name : city.name,
      });
      // console.log(updateCity); 
      toast.success("City Updated Successfully");
      // navigate("/createCity");
    } catch (error) {
      console.error(error);
      toast.error("Error Occurred while updating City");
    }
  }

  const HandleChange = (e) =>{
    const updatedCity = {...city, name: e.target.value};
    console.log(updatedCity);
    SetCity(updatedCity);
  }
  
  // console.log("City : ",city.name);
  return (
    <>
     <div className="bg-zinc-800 h-screen w-full text-white flex justify-center">
        <img
          className="relative w-full h-auto brightness-50"
          src={skyImage}
          alt=""
        />
        <div className="absolute w-[95%]">
          <h1 className="px-8 pt-5 text-2xl font-semibold"> Update City Name </h1>
          <hr className="w-[95%] h-1 mx-auto bg-gray-100 border-0 rounded md:my-3 dark:bg-[#FAA718]" />
          <div className="Search-form w-[95%] mx-auto border h-80 ">
            <h4 className="w-full p-2 bg-[#5A7FA1] text-lg">
              Enter Correct City Name{" "}
            </h4>
            <form onSubmit={HandleSubmit}>
              <div className="flex justify-between items-center w-[70%]">
                <label className="text-lg font-mono ml-12 mt-3 " htmlFor="">
                  Add City Name
                </label>
                {/* <label className="text-sm font-mono mr-[36%] mt-3" htmlFor="">Flight No</label> */}
              </div>

              <div className="flex justify-between items-center w-[70%]">
                <input
                  className="font-serif text-lg ml-10 rounded w-96 p-4 mt-1 text-black outline-none bg-zinc-300 border"
                  type="text"
                  placeholder="Example : Jamshedpur"
                  name="name"
                  value={city.name}
                  onChange={HandleChange}
                />

                {/* <input className="font-serif text-xs ml-10 rounded w-96 p-3 mt-1 text-black outline-none bg-zinc-300 border" type="text" placeholder="Example : 200" /> */}
                <button
                  className="px-20 py-4 text-lg font-bold bg-[#c58413]"
                  type="submit"
                  // onClick={notify}
                >
                  Update City
                </button>
                <ToastContainer />
              </div>
              {/* <div className="flex flex-col ml-10 mt-5">
                <label className="ml-2 font-mono" htmlFor="">Date</label>
                <input className="w-[29%] text-black p-2 rounded-md text-sm outline-none bg-zinc-300 border" placeholder="Enter Flight Date" type="Date" />
              </div> */}
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default UpdateCity;