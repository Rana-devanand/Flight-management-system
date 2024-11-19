import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import skyImage from "../../assets/images/sky.jpg";
import axios from "axios";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css"; // Import a theme (optional)
import "flatpickr/dist/flatpickr.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Seats() {

  const URL = import.meta.env.VITE_BACKEND_API_URL;

  const [flight , setFLightData] = useState({});
  const [seatClass , setSeatClass] = useState({});
  const [formData , setFormData] = useState({
    flight : "",
    seatClass: "",
  });

//http://localhost:4000/api/V1/allFlights
  const getAllFLight = async () => {
    try {
      const response = await axios.get(`${URL}/api/V1/allFlights`);
      // console.log(response.data);
      setFLightData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  // http://localhost:4000/api/V1/getseatclass
  const getSeatClass = async() => {
    try {
      const response = await axios.get(`${URL}/api/V1/getseatclass`);
      console.log(response.data.data);
      setSeatClass(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }
  const HandleChange = (e) => {
    setFormData({...formData, [e.target.name] : e.target.value });
  }

// http://localhost:4000/api/V1/createFLightseats
  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${URL}/api/v1/createFLightseats` , formData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getAllFLight();
    getSeatClass();
  },[])

  return (
     <>
      <div className="bg-zinc-800 h-screen w-full text-white flex justify-center">
        <img
          className="relative w-full h-auto brightness-50"
          src={skyImage}
          alt=""
        />
        <div className="absolute w-[95%]">
          <div className="flight-create-details flex gap-3">
           
            <NavLink
              style={(e) => {
                return {
                  color: e.isActive ? "#15A0EF" : "",
                  // background: e.isActive ? "#394457" : "",
                };
              }}
              className="flex items-center px-3 py-2 border border-zinc-200 rounded-md mt-2 hover:bg-slate-500 cursor-not-allowed"
                  // to="/"
            >
              Future use button
            </NavLink>
            <NavLink
              style={(e) => {
                return {
                  color: e.isActive ? "#15A0EF" : "",
                  // background: e.isActive ? "#394457" : "",
                };
              }}
              className="flex items-center px-3 py-2 border border-zinc-200 rounded-md mt-2 hover:bg-slate-500 cursor-not-allowed"
              // to="/"
            >
              Future use button
            </NavLink>
          </div>

          <h1 className="px-8 pt-5 text-2xl font-semibold">
            {" "}
            Create FLight Seats 
          </h1>
          <hr className="w-[95%] h-1 mx-auto bg-gray-100 border-0 rounded md:my-3 dark:bg-[#FAA718]" />
          <div className="Search-form w-[95%] mx-auto h-80 ">
            <h4 className="w-full p-2 bg-[#5A7FA1] text-sm">Add Seats</h4>

            <form
              onSubmit={HandleSubmit} 
          //     ref={FormRef}
            >
               

              <div className="flex flex-wrap justify-start gap-5 mt-5">

              <div className=" flex flex-col w-[32%]">
                  <label htmlFor="" className="font-semibold text-sm">
                    Start Date{" "}
                  </label>
                  <Flatpickr
                  // value={date}
                  // onChange={chooseDate}
                  options={{
                    dateFormat: "Y-m-d",
                    altInput: true,
                    altFormat: "F j, Y",
                    // minDate: `${onlyDate}`,
                    maxDate: "",
                  }}
                  placeholder="Date"
                  className="custom-flatpickr p-2  rounded bg-zinc-300 text-black outline-none border"
                  name="Date"
                  required
              />                 
                </div>

                <div className=" flex flex-col w-[32%]">
                  <label htmlFor="" className="font-semibold text-sm">
                    End Date{" "}
                  </label>
                  <Flatpickr
                  // value={date}
                  // onChange={chooseDate}
                  options={{
                    dateFormat: "Y-m-d",
                    altInput: true,
                    altFormat: "F j, Y",
                    // minDate: `${onlyDate}`,
                    maxDate: "",
                  }}
                  placeholder="Date"
                  className="custom-flatpickr p-2  rounded bg-zinc-300 text-black outline-none border"
                  name="Date"
                  required
              />                 
                </div>
                
                <div className=" flex flex-col w-[32%]">
                  <label htmlFor="" className="font-semibold text-sm">
                    Select Flight{" "}
                  </label>
                  <select
                    id="flight"
                    className=" p-2  rounded bg-zinc-300 text-black outline-none border"
                    type="text"
                    name="flight"
                    onChange={HandleChange}
                  >
                    <option selected disabled>Select FLight</option>
                    {
                      flight.length > 0 && 
                      flight.map((data , index)=>(
                        <option key={index} value={data.flight_id}>{data.Airline}</option>
                      ))
                    }
                  </select>
                 
                </div>
                <div className=" flex flex-col w-[32%]">
                  <label htmlFor="" className="font-semibold text-sm">
                    Select Seat Class
                  </label>
                  <select 
                  id="seatClass"
                  name="seatClass" 
                  className="p-2 rounded bg-zinc-300 text-black outline-none border "
                  onChange={HandleChange}>
                    <option selected disabled>Select Seat Class </option>
                    {
                      seatClass.length > 0 &&
                      seatClass.map((data , index)=>(
                        <option key={index} value={data.seat_type_id}>{data.seat_type_name}&nbsp;[{data.seats_per_row}]&nbsp; [{data.total_seats}]</option>
                      ))
                    }
                  </select>
                </div>

              </div>
              <button
                className="px-20 py-2 bg-[#c58413] ml-[35%] mt-6"
                type="submit"
              >
                ADD Seats
              </button>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>

      {/* All flight List  */}

      <div className="w-full h-screen bg-slate-300">
        <div className="w-[95%] mx-auto flex justify-center">
          <div>
            <h1 className="text-2xl font-semibold mt-10">Seats Data</h1>
            <hr className="h-1 mx-auto bg-gray-100 border-0 rounded md:my-3 dark:bg-[#FAA718]" />
          </div>
        </div>
        <div className="px-6 py-2 ">
          <button
            className="bg-blue-800 px-4 py-2 rounded text-white text-sm"
            //   onClick={LoadAllFlight}
          >
            CLick to load
          </button>

          <input
            type="search"
            placeholder="Search Flight by name..."
            className="w-[60%] px-4 ml-5 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"
            //   onChange={getFilteredFlight}
            name="Airline"
          />
        </div>
      </div>
    </>
  )
}

export default Seats