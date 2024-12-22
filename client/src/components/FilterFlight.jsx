import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import AirIndia from "../assets/images/air-india-2.svg";
import { GiCommercialAirplane } from "react-icons/gi";
import { FaArrowCircleRight } from "react-icons/fa";
import rightIcon from "../assets/images/icons8-arrow.gif";
import Footer from "../components/Comman Pages/Footer"

import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css"; // Import a theme (optional)
import "flatpickr/dist/flatpickr.css";
import "../assets/css/HomeStyle.css";
import Chart from "./Chart/CostChart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function FilterFlight() {
  const URL = import.meta.env.VITE_BACKEND_API_URL;
  const navigate = useNavigate();

  const location = useLocation();
  const userData = location.state?.user; // Retrieving the object data

  const [filterFlight, setFilterFlightData] = useState([]);
  const [DailyFlight, setDailyFlightData] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());  
  const [storeAllCity, setAllCity] = useState({});
  const [ScheduleFlight, setScheduleFlightData] = useState({});
  const [getFilteredFlight , setFilterFlight] = useState({});

  const getFilterFlightData = async () =>{
    try {
      let allFlight = [];
      for(let i = 0; i < userData.length; i++) {
        const response = await axios.get(`${URL}/api/V1/airplane/${userData[i][0].flight_id}`);
        const flightData = response.data.data;
        flightData.flightLogo = `${URL}/${flightData.flightLogo.replace(/\\/g, "/")}`;
        // console.log(flightData);
        allFlight.push(flightData);
      }
      setFilterFlightData(allFlight);
    } catch (error) {
      console.error("flight not fetched");
    }
  }

  // http://localhost:4000/api/V1/dailyFlights
  const getDailyFlightsData = async () => {
    try {
      const url = `${URL}/api/V1/dailyFlights`;
      const response = await axios.get(url, {
        params: {
          Remark: "DAILY",
        },
      });
      // console.log(response);

      const updateFlightData = response.data.data.map((flight) => {
        return {
          ...flight,
          flightLogo: `${URL}/${flight.flightLogo.replace(/\\/g, "/")}`,
        };
      });

      setDailyFlightData(updateFlightData);
      // console.log("Daily : ",response);
    } catch (error) {
      console.error(error);
    }
  };

  // http://localhost:4000/api/V1/allCity
  const getAllCityData = async () => {
    try {
      const url = `${URL}/api/V1/allCity`;
      const response = await axios.get(url);
      setAllCity(response.data.data);
      // console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

   // http:localhost:4000/api/V1/allFlightScheduleList
  const callScheduleFlight = async () => {
    const list = []
    try {
      const ScheduleFlightURL = `${URL}/api/V1/allFlightScheduleList`;
      const response = await axios.get(ScheduleFlightURL);
      const ScheduleFlightList = response.data.data;
      // console.log(ScheduleFlightList);
      for (let i = 0; i < ScheduleFlightList.length; i++) {
        let getScheduleLists = await response.data.data[i].schedule_lists[i];
        // console.log(getScheduleLists);
        list.push(getScheduleLists);
      }
      setScheduleFlightData(list);
    } catch (error) {
      console.log(error);
    }
  };

  const HandleBook = (id) => {
    const type = localStorage.getItem("type");
    let chooseFlight =  getFilteredFlight;
    if (!type) {
      navigate("/login");
    } else if (type == "user") {
      for(let i=0; i < chooseFlight.length; i++) {
          if(chooseFlight[i][0].flight_id == id)
          {
            navigate("/seats", { state: { flightId: chooseFlight[i] } });
          }
      }
    }
  };

  const [filterData, setFilteredData] = useState({
    Departure: "",
    Arrival: "",
    Date: "",
  });

  // console.log(filterData)
  const HandleChange = (e) => {
    setFilteredData({ ...filterData, [e.target.name]: e.target.value });
    // console.log(filterData);
  };

  const [selectedDate, setChooseDate] = useState();
  const chooseDate = (selectDate) => {
    const myDate = selectDate[0];
    const dateObject = new Date(myDate);

    // Format the date using local time (to avoid UTC conversion)
    let year = dateObject.getFullYear();
    let month = (dateObject.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
    let day = dateObject.getDate().toString().padStart(2, "0");

    // Create the formatted date string in YYYY-MM-DD format
    let formattedDate = `${year}-${month}-${day}`;
    setChooseDate(formattedDate);
    setFilteredData({ ...filterData, Date: formattedDate + "T00:00:00.000Z" });
  };

  // http://localhost:4000/api/V1/filterFlight
  const HandleSubmit = async (e) => {
    e.preventDefault();
    setFilterFlightData([]);
    try {
        const url = `${URL}/api/V1/filterFlight`;
        const response = await axios.get(url, {
            params: filterData,
        });
        const filterFlightArrayData = response.data.data;
        console.log(filterFlightArrayData);
        if (filterFlightArrayData.length === 0) {
            toast.error("No Flights available");
        } else {
            const updateUserChooseDestination = filterFlightArrayData.flatMap(
                (flightArray) => {
                    const updatedFlights = flightArray.map((flight) => {
                        // return {
                        //     ...flight,
                        //     // Check if flightLogo exists before replacing
                        //     flightLogo: flight.flightLogo
                        //         ? `${URL}/${flight.flightLogo.replace(/\\/g, "/")}`
                        //         : null, // Set to null or some default value if undefined
                        // };
                        return {
                          ...flight,
                          flightLogo: `${URL}/${flight.flightLogo.replace(/\\/g, "/")}`,
                        };
                    });

                    return updatedFlights;
                }
            );

            setFilterFlightData((prevData) => [
                ...prevData,
                ...updateUserChooseDestination.flat(),
            ]);
        }
        setFilteredData(filterData)
    } catch (error) {
        console.error("Error fetching flight data:", error);
        toast.error("Failed to fetch flight data");
    }
};


  useEffect(() => {
    setFilterFlight(userData);
    callScheduleFlight();
    getFilterFlightData();
    getDailyFlightsData();
    setCurrentDate(
      new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );

    getAllCityData();
  }, []);

  return (
    <div className="bg-zinc-200 w-full h-auto">
      <div className="flex">
        <div className="rounded-md w-[60%]  h-auto ml-10  ">
          <div className=" w-full h-40 mt-5 mb-3 text-sm">
            <div className="flex w-[95%] p-5 rounded-md border  bg-[#ECECEC] shadow-2xl">
              <form className="flex w-full" action="" onSubmit={HandleSubmit}>
                <div className="w-[27%] border border-[#b9b9b9]">
                  <select
                    name="Departure"
                    className="w-[100%] px-5 py-4 outline-none appearance-none"
                    onChange={HandleChange}
                    defaultValue= ""
                  >
                    <option disabled>
                      From where
                    </option>
                    {storeAllCity &&
                      storeAllCity.length > 0 &&
                      storeAllCity
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((city , index) => (
                          <option key={index} value={city.name}>{city.name}</option>
                        ))}
                  </select>
                </div>

                <div className=" w-[27%] border border-[#b9b9b9]">
                  <select
                    name="Arrival"
                    id=""
                    className="w-[100%]  px-5 py-4 outline-none appearance-none"
                    onChange={HandleChange}
                    defaultValue=""
                  >
                    <option value="">
                      From to
                    </option>
                    {storeAllCity &&
                      storeAllCity.length > 0 &&
                      storeAllCity
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((city , index) => (
                          <option key={index} value={city.name} className="overflow-scroll">
                            {city.name}
                          </option>
                        ))}
                  </select>
                </div>

                <div className="custom-flatpickr w-[27%] outline-none border border-[#b9b9b9]">
                  <Flatpickr
                    // value={date}
                    onChange={chooseDate}
                    options={{
                      dateFormat: "Y-m-d",
                      altInput: true,
                      altFormat: "F j, Y",
                      // minDate: `${onlyDate}`,
                      maxDate: "",
                    }}
                    placeholder="Date"
                    className="custom-flatpickr pl-4 py-4 w-[100%] outline-none"
                    name="Date"
                  />
                </div>

                <div className="w-[20%] flex justify-center items-center border border-[#b9b9b9]">
                  <button className="w-full h-full bg-blue-600 text-sm text-white">
                    Search
                  </button>
                </div>
              </form>
            </div>
            <div className="w-[70%] h-18  p-3 ml-4 flex gap-3 text-xs">
              <div className="w-36 h-10">
                <select
                  name=""
                  id=""
                  className="w-full h-10 pl-2 outline-none rounded-md items-center bg-[#ececec] border border-[#a8a8a8] appearance-auto"
                  defaultValue=""
                >
                  <option disabled>
                    Max Price
                  </option>
                  <option value="">1500</option>
                  <option value="">2000</option>
                  <option value="">3000</option>
                  <option value="">4000</option>
                </select>
              </div>
              <div className="w-36 h-10 items-center">
                <select
                  name=""
                  id=""
                  className="w-full h-10 pl-2 outline-none rounded-md  bg-[#ececec] border border-[#a8a8a8]"
                >
                  <option disabled>
                    Time
                  </option>
                  <option value="">1500</option>
                  <option value="">2000</option>
                  <option value="">3000</option>
                  <option value="">4000</option>
                </select>
              </div>

              <div className="w-36 h-10">
                <select
                  name=""
                  id=""
                  className="w-full h-10 pl-2 outline-none rounded-md bg-[#ececec] border border-[#a8a8a8]"
                >
                  <option disabled>
                    Airlines
                  </option>
                  <option value="India">
                   India
                  </option>

                  <option value="Air India">
                   Air India
                  </option>
                </select>
              </div>

              <div className="w-36 h-10">
                <select
                  name=""
                  id=""
                  className="w-full h-10 pl-2 outline-none rounded-md bg-[#ececec] border border-[#a8a8a8]"
                >
                  <option disabled>
                    Seat class
                  </option>
                  <option value="">Economy</option>
                  <option value="">Business class</option>
                </select>
              </div>

              <div className="w-24 h-10  bg-cyan-700 rounded-lg text-white font-semibold">
                <button className="w-full h-10">Clear</button>
              </div>
            </div>
          </div>

          <div className="container mx-auto p-2">
            <div className="overflow-x-auto">
              <div className="flex justify-between">
                <p className="my-3">
                  Choose a <span className="text-[#0ba2cf]">departing </span>
                  flight
                </p>
                <p className="mr-16 mt-5 font-semibold text-amber-600">
                  {" "}
                  {selectedDate}
                </p>
              </div>
              <table className="min-w-[95%] text-xs font-medium bg-white border border-gray-200 rounded-lg shadow-2xl">
                <thead>
                  <tr className="bg-gray-100"></tr>
                </thead>
                <tbody>
                  {filterFlight && filterFlight.length > 0 ? (
                    filterFlight.map((flight, index) => (
                      <tr key={index}  className="hover:bg-gray-50">
                        <td className="border  border-[#f1f1f1a2]  py-2">
                          <img
                            className="w-16 h-10 ml-5"
                            src={flight.flightLogo}
                            alt=""
                          />
                        </td>
                        <td className="border  border-[#f1f1f1a2] px-4 py-2  text-center">
                          {ScheduleFlight.length > 0 && ScheduleFlight.map((scheduleData , index) => (
                            <p key={index} className=" text-center">
                              {flight.flight_id == scheduleData.flight_id ? (scheduleData.totalTIme) : ("")}
                              </p>
                          ))}
                          {flight.Airline}
                          </td>
                        <td className="border flex flex-col justify-center items-center border-[#f1f1f1a2] px-4 py-2">
                          {ScheduleFlight.length > 0 && ScheduleFlight.map((scheduleData , index) => (
                            <p key={index}>
                              {flight.flight_id == scheduleData.flight_id ? (scheduleData.departureTime): ("")}
                              </p>
                          ))}
                          &nbsp;to
                          {ScheduleFlight.length > 0 && ScheduleFlight.map((scheduleData , index) => (
                            <p key={index}>
                              {flight.flight_id == scheduleData.flight_id ? (scheduleData.arrivalTime): ("")}
                              </p>
                          ))}

                        </td>

                        <td className="border  border-[#f1f1f1a2] px-4 py-2">
                          non stop
                        </td>
                        <td className="border  border-[#f1f1f1a2] px-4 py-2">
                          {flight.Cost} $250
                        </td>
                        <td className="border  border-[#f1f1f1a2] px-4 py-2 items-center">
                          <button
                            className="w-full h-12 bg-[#0faa90] px-3 text-white rounded-lg flex justify-center items-center"
                            onClick={() => HandleBook(flight.flight_id)}
                          >
                            Reserve Your Seat
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center px-4 py-2 border">
                            No flights Available                            
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <ToastContainer />
            </div>
          </div>

          <div className="container mx-auto p-2 mb-32">
            <div className="overflow-x-auto">
              <p className="my-3">
                <span className="text-[#0ba2cf]">Daily departing</span> flight
              </p>
              <table className="min-w-[95%] text-xs font-medium bg-white border border-gray-200 rounded-lg shadow-md">
                <thead>
                  <tr className="bg-gray-100"></tr>
                </thead>
                <tbody>
                  {DailyFlight && DailyFlight.length > 0 ? (
                    DailyFlight.map((flight, id) => (
                      <tr key={id} className="hover:bg-gray-50">
                        <td className="border  border-[#f1f1f1a2]  py-2">
                          <img
                            className="w-16 h-10 ml-5"
                            src={flight.flightLogo}
                            alt=""
                          />
                        </td>
                        <td className="border  border-[#f1f1f1a2] px-4 py-2">
                          <p className="text-[#fa3333] font-semibold">
                            Flight Timing Not Schedule !!
                          </p>
                          {/* {flightTiming && flightTiming.length > 0 && flightTiming.map(flightTime =>{
                          return flightTime.flight_id === flight.flight_id ? flightTime.schedule_lists[0].totalTIme : "" ;
                         })} */}
                          <br />
                          {flight.Airline}
                        </td>
                        <td className="border  border-[#f1f1f1a2] px-4 py-2 text-center">
                          AM-PM
                        </td>
                        <td className="border  border-[#f1f1f1a2] px-4 py-2">
                          non stop
                        </td>
                        <td className="border  border-[#f1f1f1a2] px-4 py-2">
                          {flight.Cost} $250
                        </td>
                        <td className="border  border-[#f1f1f1a2] px-4 py-2 items-center">
                          <button
                            className="w-full h-12 bg-green-500 text-white rounded-lg flex justify-center items-center"
                            onClick={() => HandleBook(flight.id)}
                          >
                            Book Ticket
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center px-4 py-2 border">
                        No flights available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* <h4 className="text-black text-2xl mt-7 font-serif">
          Departing flights
         </h4> */}

          {/* {filterFlight && filterFlight.length > 0 ? (
          filterFlight.map((flight, id) => (
            <div
              key={id}
              className="flex w-full h-56 bg-zinc-350 border-2 border-blue-100  shadow-2xl rounded-lg text-lg font-semibold"
            >
              <div className="w-[32%] p-3">
                <img className="w-36 ml-6" src={flight.flightLogo} alt="" />
                <p className="text-2xl ml-10 mt-2">{flight.Airline} </p>
                <p className="mt-10  text-[#747474]">Model No</p>
                <p className="text-xl">{flight.modelNo}</p>
             
              </div> 

              <div className=" w-[44%] text-center mr-7 ">
                <p className="flex mt-14 text-3xl gap-5 font-semibold justify-center">
                  {flight.Departure}
                  <p className="mt-2">
                    <GiCommercialAirplane />
                  </p>{" "}
                  {flight.Arrival}{" "}
                </p>
                <div className="flex justify-around">
                  <p>{flight.DepartureTime} </p>
                  <p>{flight.ArrivalTime}</p>
                </div>
                <div className="mt-10">
                  <p className="text-xl">
                    <b>JOHN/DOE</b>
                  </p>
                </div>
                <div className="mt-10 text-xl">
                  
                </div>
              </div>

              <div className="w-[24%] mr-5">
                <div className="border w-full h-36  bg-blue-800 m-2 rounded-xl text-center">
                  <p className="p-5 text-white">Start at : ₹{cost}</p>
                  <button
                    className="w-40 ml-16 text-white py-2 px-4 bg-blue-500 rounded flex justify-center gap-2"
                    onClick={() => HandleBook(flight.id)}
                  >
                    Book Now
                    <p className="w-7 mt-1 text-xl">
                      <FaArrowCircleRight />
                    </p>
                  </button>
                </div>

                <button
                  className="text-lg ml-16 font-semibold px-6 py-1 bg-zinc-300 flex items-center rounded-md gap-2"
                  onClick={showModal}
                >
                  Fair types...
                  <img className="w-10 h-10" src={rightIcon} alt="" />
                </button>
              </div>
            </div>
          ))
         ) : (
          <div className=" w-[50%] m-auto p-4 bg-zinc-350 border border-blue-300  shadow-2xl rounded-lg text-lg font-semibold text-red-600 ">
            <p>No Flights Available </p>
          </div>
         )} */}
        </div>
        <div className="w-[35%] mt-[10%] ">
          <Chart />
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default FilterFlight;
