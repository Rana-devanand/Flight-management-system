import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import skyImage from "../../assets/images/sky.jpg";
import axios from "axios";
import Loader from "../Loader/Loader"

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateSeats() {

  const URL = import.meta.env.VITE_BACKEND_API_URL;
  const [flightSeat, setSeatClass] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [allFlights, setAllFlights] = useState([]);
  const [seats, setSeats] = useState({
    seat_type_name: "",
    flight_id:"",
    seats_per_row: "",
    total_seats: "",
  });
console.log("ddd",seats);
  const handleChange = (e) => {
    setSeats({ ...seats, [e.target.name]: e.target.value });
  };

  const FormRef = useRef(null);


// http://localhost:4000/api/V1/createseats
  const HandleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${URL}/api/V1/createseats` , seats);
      if (response){
        toast.success("Seats created successfully");
        FormRef.current.reset();
        getSeatClass();
      }
      else{
        toast.error("Failed to create seats");
      }
    } catch (error) {
        toast.error(`Failed to create seats ${error.message}`);
    }
  }
// http://localhost:4000/api/V1/allFlights
  const getAllFLight = async () => {
    try {
      const response = await axios.get(`${URL}/api/V1/allFlights`);
      // console.log(response.data);
      setAllFlights(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  
// http://localhost:4000/api/V1/getseatclass
  const getSeatClass = async() => {
    try {
      const response = await axios.get(`${URL}/api/V1/getseatclass`);
      // console.log(response.data.data);
      setSeatClass(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getSeatClass();
    getAllFLight();
  },[])

  return (
    <>
    <Loader 
        isLoadingTrue={false}
        message={"Creating new seats..."}
    />
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
            Create Seats types
          </h1>
          <hr className="w-[95%] h-1 mx-auto bg-gray-100 border-0 rounded md:my-3 dark:bg-[#FAA718]" />
          <div className="Search-form w-[95%] mx-auto h-80 ">
            <h4 className="w-full p-2 bg-[#5A7FA1] text-sm">Add Seats</h4>

            <form
              onSubmit={HandleSubmit} 
              ref={FormRef}
            >
              <div className="flex flex-wrap justify-start gap-5 mt-5">
                <div className=" flex flex-col w-[32%]">
                  <label htmlFor="" className="font-semibold text-sm">
                    Enter Seat Class Name{" "}
                  </label>
                  <input
                    className=" p-2  rounded bg-zinc-300 text-black outline-none border "
                    placeholder="Example : Business , Economy"
                    type="text"
                    name="seat_type_name"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className=" flex flex-col w-[32%]">
                  <label htmlFor="" className="font-semibold text-sm">
                    Select FLight
                  </label>
                  <select
                    className=" p-2  rounded bg-zinc-300 text-black outline-none border "
                    type="text"
                    name="flight_id"
                    onChange={handleChange}
                    required
                  >
                  <option value="" disabled selected>Select seats for Flight</option>
                  {allFlights.length > 0 && allFlights.map((flight ,index) => (
                    <option key={index} value={flight.flight_id}>
                        {flight.flight_id} - {flight.Airline} - [{flight.modelNo}]
                      </option>
                  ))}
                  
                  </select>
                </div>
                <div className=" flex flex-col w-[32%]">
                  <label htmlFor="" className="font-semibold text-sm">
                    Enter Seats Per-Row{" "}
                  </label>
                  <input
                    className="p-2 rounded bg-zinc-300 text-black outline-none border "
                    placeholder="Example : 6 , 4"
                    type="text"
                    name="seats_per_row"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex flex-col w-[32%]">
                  <label htmlFor="" className="font-semibold text-sm">
                    Enter Total seats
                  </label>
                  <input
                    className="p-2 rounded bg-zinc-300 text-black outline-none border "
                    placeholder="Example : 120 , 60"
                    type="text"
                    name="total_seats"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <button
                className="px-20 py-2 bg-[#c58413] ml-[35%] mt-6"
                type="submit"
                //  onClick={notify}
              >
                {" "}
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
          {/* <button
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
          />   */}
          
          <table class="min-w-full table-auto border-collapse border border-gray-300 text-sm">
          <thead class="bg-gray-200">
               <tr>
                    <th class="border border-gray-300 px-4 py-2 text-left">ID</th>
                    <th class="border border-gray-300 px-4 py-2 text-left">Seat type</th>
                    <th class="border border-gray-300 px-4 py-2 text-left">Flight ID</th>
                    <th class="border border-gray-300 px-4 py-2 text-left">Seats Per Row</th>
                    <th class="border border-gray-300 px-4 py-2 text-left">Total Seats</th>
                    <th class="border border-gray-300 px-4 py-2 text-left">Created At</th>
                    <th class="border border-gray-300 px-4 py-2 text-left">Updated At</th>
                    <th class="border border-gray-300 px-4 py-2 text-left">Edit</th>
                    <th class="border border-gray-300 px-4 py-2 text-left">Remove</th>
               </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {flightSeat.length > 0  && flightSeat.map((data , i)=> (
                <tr class="hover:bg-gray-100"> 
                  <td class="border border-gray-300 px-4 py-2 text-left">{i+1}</td>
                  <td class="border border-gray-300 px-4 py-2 text-left">{data.seat_type_name}</td>
                  <td class="border border-gray-300 px-4 py-2 text-left">{data.flight_id}</td>
                  <td class="border border-gray-300 px-4 py-2 text-left">{data.seats_per_row}</td>
                  <td class="border border-gray-300 px-4 py-2 text-left">{data.total_seats}</td>
                  <td class="border border-gray-300 px-4 py-2 text-left">{new Date(data.createdAt).toLocaleDateString()}</td>
                  <td class="border border-gray-300 px-4 py-2 text-left">{new Date(data.updatedAt).toLocaleDateString()}</td>
                  <td class="border border-gray-300 px-4 py-2 text-left">
                    <button className="px-4 py-2 rounded text-white bg-blue-700">Edit</button>
                  </td>
                  <td class="border border-gray-300 px-4 py-2 text-left">
                    <button className="px-4 py-2 rounded text-white bg-red-700">Remove</button>
                  </td>
              </tr>
            ))}
          
          </tbody>
     </table>
        </div>
      </div>
    </>
  );
}

export default CreateSeats;
