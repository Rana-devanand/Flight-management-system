import React, { useEffect, useRef, useState } from "react";
import skyImage from "../../assets/images/schedule_Admin.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink, useNavigate } from "react-router-dom";

// Date picker
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css"; // Import a theme (optional)
import "flatpickr/dist/flatpickr.css";
// ----------------------------------------------------------------
import axios from "axios";

function FlightSchedule() {
  const URL = import.meta.env.VITE_BACKEND_API_URL;
  const [flights, setFlights] = useState({});
  const FormRef = useRef(null);
  const [getAllSchedule, setAllSchedule] = useState({});


  const [formData, setFormData] = useState({
    flight_id: "",
    start_date: "",
    end_date: "",
    recurrence_pattern: "",
    departure_time: "",
    arrival_time: "",
  });
  // console.log(formData);
  const SetStartDate = (selectedDate) => {
    const myDate = selectedDate[0];
    const dateObject = new Date(myDate);

    // Format the date using local time (to avoid UTC conversion)
    let year = dateObject.getFullYear();
    let month = (dateObject.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
    let day = dateObject.getDate().toString().padStart(2, "0");

    // Create the formatted date string in YYYY-MM-DD format
    let formattedDate = `${year}-${month}-${day}`;
    setFormData({ ...formData, start_date: formattedDate });
  };

  const SetEndDate = (selectedDate) => {
    const myDate = selectedDate[0];
    const dateObject = new Date(myDate);

    // Format the date using local time (to avoid UTC conversion)
    let year = dateObject.getFullYear();
    let month = (dateObject.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
    let day = dateObject.getDate().toString().padStart(2, "0");

    // Create the formatted date string in YYYY-MM-DD format
    let formattedDate = `${year}-${month}-${day}`;
    setFormData({ ...formData, end_date: formattedDate });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // http://localhost:4000/api/V1/scheduleFlights

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${URL}/api/V1/scheduleFlights`,
        formData
      );
      console.log(response);
      if (response.status === 201) {
        toast.success("Flight Schedule Created Successfully");
        FormRef.current.reset();
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  //  http://localhost:4000/api/V1/allFlights
  const getAllFLight = async () => {
    try {
      const response = await axios.get(`${URL}/api/V1/allFlights`);
      // console.log(response);
      setFlights(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };


  // Get All Schedule flights List onCLick load 
  // http://localhost:4000/api/V1/distinctScheduleFlights
  const LoadAllScheduleFlight = async () =>{
    try {
      const response = await axios.get(`${URL}/api/v1/distinctScheduleFlights`);
      console.log(response)
      setAllSchedule(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    getAllFLight();
  }, []);

  return (
    <>
      <div className="h-screen w-full text-white flex justify-center">
        <img
          className="relative w-full h-auto brightness-50"
          src={skyImage}
          alt=""
        />
        <div className="absolute w-[95%]">
          <h1 className="px-8 pt-5 text-2xl font-semibold">
            {" "}
            Create Flights Schedule
          </h1>
          <hr className="w-[95%] h-1 mx-auto bg-gray-100 border-0 rounded md:my-3 dark:bg-[#FAA718]" />
          <div className="Search-form w-[95%] mx-auto h-80 ">
            <h4 className="w-full p-2 bg-[#B1740F] text-sm">
              Add Flight time table
            </h4>

            <form
              onSubmit={handleSubmit}
              ref={FormRef}
            >
              <div className="flex flex-wrap justify-start gap-5 mt-5">
                {/* -----------------------------------------------------
                              Select Flight
                    -----------------------------------------------------
                */}

                <div className="flex flex-col w-[32%]">
                  <label htmlFor="" className="font-semibold text-sm">
                    Select flight
                  </label>
                  <select
                    id="flight"
                    className="p-2  rounded bg-zinc-300 text-black outline-none border gap-5"
                    // onChange={(e) => setDeparture(e.target.value)}
                    name="flight_id"
                    onChange={handleChange}
                    required
                  >
                    <option selected disabled>
                      Choose a flight
                    </option>
                    {flights.length > 0 &&
                      flights.map((data, index) => (
                        <option key={index} value={data.flight_id}>
                          {data.Airline}
                        </option>
                      ))}
                  </select>
                </div>
                {/* -----------------------------------------------------
                              Start Date
                    -----------------------------------------------------
                */}
                <div className="flex flex-col w-[32%]">
                  <label htmlFor="" className="font-semibold text-sm">
                    Start Date
                  </label>
                  <div className="custom-flatpickr w-full outline-none ">
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
                      placeholder="choose Start Date"
                      className="p-2 rounded w-full bg-zinc-300 text-black outline-none border gap-5"
                      name="StartDate"
                      onChange={SetStartDate}
                      required
                    />
                  </div>
                </div>

                {/* -----------------------------------------------------
                              End Date
                    -----------------------------------------------------
                    */}

                <div className="flex flex-col w-[32%]">
                  <label htmlFor="" className="font-semibold text-sm">
                    End Date
                  </label>
                  <div className="custom-flatpickr w-full outline-none ">
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
                      placeholder="Choose End Date"
                      className="p-2 rounded w-full bg-zinc-300 text-black outline-none border gap-5"
                      name="EndDate"
                      onChange={SetEndDate}
                      required
                    />
                  </div>
                </div>

                {/* -----------------------------------------------------
                              Recurrence Flight
                    -----------------------------------------------------
                */}

                <div className="flex flex-col w-[32%]">
                  <label htmlFor="" className="font-semibold text-sm">
                    Recurrence Flight
                  </label>
                  <select
                    id="recurrence"
                    className="p-2  rounded bg-zinc-300 text-black outline-none border gap-5"
                    // onChange={(e) => setDeparture(e.target.value)}
                    name="recurrence_pattern"
                    onChange={handleChange}
                    required
                  >
                    <option disabled>Choose Recurrence Type</option>
                    <option value="1">Daily</option>
                    <option value="2">Alternative</option>
                    <option value="3">Three Days</option>
                    <option value="4">Four Days</option>
                  </select>
                </div>

                {/* -----------------------------------------------------
                              Enter Departure Timezone
                    -----------------------------------------------------
                */}
                <div className="flex flex-col w-[32%]">
                  <label htmlFor="" className="font-semibold text-sm">
                    Enter Departure Timezone
                  </label>
                  <div className="custom-flatpickr w-full outline-none ">
                    <input
                      className="p-2 rounded w-full bg-zinc-300 text-black outline-none border gap-5"
                      placeholder="Example : AA or American Airline"
                      type="datetime-local"
                      name="departure_time"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* -----------------------------------------------------
                              Enter Arrival Timezone
                    -----------------------------------------------------
                */}
                <div className="flex flex-col w-[32%]">
                  <label htmlFor="" className="font-semibold text-sm">
                    Enter Arrival Timezone
                  </label>
                  <div className="custom-flatpickr w-full outline-none ">
                    <input
                      className="p-2 rounded w-full bg-zinc-300 text-black outline-none border gap-5"
                      type="datetime-local"
                      name="arrival_time"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <button
                className="px-20 py-2 bg-[#c58413] ml-[35%] mt-6"
                type="submit"
                //  onClick={notify}
              >
                {" "}
                ADD Flight
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
            <h1 className="text-2xl font-semibold mt-10">All Schedule Flight list</h1>
            <hr className="h-1 mx-auto bg-gray-100 border-0 rounded md:my-3 dark:bg-[#FAA718]" />
          </div>
        </div>
        <div className="px-6 py-2 ">
          <button
            className="bg-blue-800 px-4 py-2 rounded text-white text-sm"
              onClick={LoadAllScheduleFlight}
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
        
        <table className="min-w-full table-auto border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-200">
               <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Flight-ID</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Schedule Date</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Departure Date</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Arrival Date</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Total Time</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Departure Time</th> 
                    <th className="border border-gray-300 px-4 py-2 text-left">Arrival Time</th> 
                    <th className="border border-gray-300 px-4 py-2 text-left">Created At</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Updated At</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Edit</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Remove</th>
               </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
                  {/* Rows here */}
                {getAllSchedule && getAllSchedule.length > 0 ? 
                (
                 getAllSchedule.map((schedule , index) =>(
                  <tr className="hover:bg-gray-100">
                      <td className="border border-gray-300 px-4 py-2 text-left">{index+1}</td>
                      <td className="border border-gray-300 px-4 py-2 text-left">{schedule.flight_id}</td>
                      <td className="border border-gray-300 px-4 py-2 text-left">{schedule.Date.split('T')[0]}</td>
                      <td className="border border-gray-300 px-4 py-2 text-left">{schedule.Departure.split('T')[0]}</td>
                      <td className="border border-gray-300 px-4 py-2 text-left">{schedule.Arrival.split('T')[0]}</td>
                      <td className="border border-gray-300 px-4 py-2 text-left">{schedule.totalTIme}</td>
                      <td className="border border-gray-300 px-4 py-2 text-left">{schedule.departureTime}</td>
                      <td className="border border-gray-300 px-4 py-2 text-left">{schedule.arrivalTime}</td>
                      <td className="border border-gray-300 px-4 py-2 text-left">{schedule.createdAt.split('T')[0]}</td>
                      <td className="border border-gray-300 px-4 py-2 text-left">{schedule.updatedAt.split('T')[0]}</td>
                      <td class="border border-gray-300 px-4 py-2 text-left"> <button className="px-4 py-2 rounded text-white bg-blue-700" type="button">EDIT</button></td>
                      <td class="border border-gray-300 px-4 py-2 text-left"><button className="px-4 py-2 rounded text-white bg-red-500" type="button">Delete</button></td>
                  </tr>
                 ))
                )
                :
                ("")              
              }

          </tbody>

          </table>

      </div>
    </>
  );
}

export default FlightSchedule;
