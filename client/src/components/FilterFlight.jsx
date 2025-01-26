import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Comman Pages/Footer";

import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css"; // Import a theme (optional)
import "flatpickr/dist/flatpickr.css";
import "../assets/css/HomeStyle.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function FilterFlight() {
  const URL = import.meta.env.VITE_BACKEND_API_URL;
  const navigate = useNavigate();

  const location = useLocation();
  const userData = location.state?.user; // Retrieving the object data

  const [filterFlight, setFilterFlightData] = useState([]);
  const [DailyFlight, setDailyFlightData] = useState({});
  const [storeAllCity, setAllCity] = useState({});
  const [ScheduleFlight, setScheduleFlightData] = useState({});
  const [getFilteredFlight, setFilterFlight] = useState({});

  const getFilterFlightData = async () => {
    try {
      let allFlight = [];
      for (let i = 0; i < userData.length; i++) {
        const response = await axios.get(
          `${URL}/api/V1/airplane/${userData[i][0].flight_id}`
        );
        const flightData = response.data.data;
        flightData.flightLogo = `${URL}/${flightData.flightLogo.replace(
          /\\/g,
          "/"
        )}`;
        // console.log(flightData);
        allFlight.push(flightData);
      }
      setFilterFlightData(allFlight);
    } catch (error) {
      console.error("flight not fetched");
    }
  };

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

  // console.log(filterFlight[0].Departure)

  // Get FLight Address :
  const [DepartureAddress , setDepartureAddress] = useState("");
  const [ArrivalAddress, setArrivalAddress] = useState("");

 // http://localhost/4000/api/V1/getByCityName/:cityName
  const getDepartureByCityName = async () => {
    try {
      const url = `${URL}/api/V1/getByCityName/${filterFlight[0].Departure}`;
      const response = await axios.get(url);
      // console.log("Airport ",response);
      setDepartureAddress(response.data.data[0].name);
    } catch (error) {
      console.error(error);
    }
  } 

  const getArrivalByCityName = async () => {
    try {
      const url = `${URL}/api/V1/getByCityName/${filterFlight[0].Arrival}`;
      const response = await axios.get(url);
      console.log("Airport ",response);
      setArrivalAddress(response.data.data[0].name);
    } catch (error) {
      console.error(error);
    }
  }
  getDepartureByCityName();
  getArrivalByCityName();
  

  // http:localhost:4000/api/V1/allFlightScheduleList
  const callScheduleFlight = async () => {
    const list = [];
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
    let chooseFlight = getFilteredFlight;
    if (!type) {
      navigate("/login");
    } else if (type == "user") {
      for (let i = 0; i < chooseFlight.length; i++) {
        if (chooseFlight[i][0].flight_id == id) {
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
      setFilteredData(filterData);
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
    // setCurrentDate(
    //   new Date().toLocaleDateString("en-US", {
    //     weekday: "long",
    //     year: "numeric",
    //     month: "long",
    //     day: "numeric",
    //   })
    // );
    getAllCityData();
  }, []);

  return (
    <div className="bg-zinc-200 w-full h-auto">
      <div className="flex">
        <div className="rounded-md w-[60%]  h-auto ml-10  ">
          <div className="w-full h-40 mt-5 mb-3 text-sm">
            <div className="flex w-[95%] p-5 rounded-md border  bg-[#ECECEC] shadow-2xl">
              <form className="flex w-full" action="" onSubmit={HandleSubmit}>
                <div className="w-[27%] border border-[#b9b9b9]">
                  <select
                    name="Departure"
                    className="w-[100%] px-5 py-4 outline-none appearance-none"
                    onChange={HandleChange}
                    defaultValue=""
                  >
                    <option disabled>From where</option>
                    {storeAllCity &&
                      storeAllCity.length > 0 &&
                      storeAllCity
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((city, index) => (
                          <option key={index} value={city.name}>
                            {city.name}
                          </option>
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
                    <option value="">From to</option>
                    {storeAllCity &&
                      storeAllCity.length > 0 &&
                      storeAllCity
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((city, index) => (
                          <option
                            key={index}
                            value={city.name}
                            className="overflow-scroll"
                          >
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
            
          </div>

          <div className="container mx-auto p-2">
            <div className="overflow-x-auto">
              {/* <div className="flex justify-between">
                <p className="my-3">
                  Choose a <span className="text-[#0ba2cf]">departing </span>
                  flight
                </p>
                <p className="mr-16 mt-5 font-semibold text-amber-600">
                  {" "}
                  {selectedDate}
                </p>
              </div> */}

              {filterFlight &&
                filterFlight.length > 0 &&
                filterFlight.map((flight, index) => (
                  <div className="filterFlightData relative mt-5 shadow-2xl border rounded-xl">
                    <div className="background-image absolute inset-0 z-0">
                      <img
                        src="/flight-map.jpg"
                        alt="flightMap"
                        className="w-full h-full object-cover opacity-50"
                      />
                    </div>
                    <div className="flightPersonalDetail flex justify-between items-center p-3 relative z-10 w-full h-[60%] ">
                      <div className="flex items-center w-full h-full ">
                        <div className="w-16 h-20 flightLogo">
                          <img
                            src={flight.flightLogo}
                            alt="FLightLogo"
                            className="w-full h-full object-contain "
                          />
                        </div>
                        <div className="flightName flex flex-col gap-1 ml-3 font-semibold text-lg">
                          <p>{flight.Airline}</p>
                          <div className="flight-model flight-time flex items-center gap-1">
                            <p className="model text-xs text-zinc-600">
                              {flight.modelNo}
                            </p>{" "}
                            <b className="text-zinc-500">|</b>

                            <p className="total-time text-sm text-zinc-600">
                              {ScheduleFlight.length > 0 &&
                                ScheduleFlight.map((scheduleData, index) => (
                                  <p key={index} className=" text-center">
                                    {flight.flight_id == scheduleData.flight_id
                                      ? scheduleData.totalTIme
                                      : ""}
                                  </p>
                                ))}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="filtered-data mt-2 flex justify-end items-end gap-3 w-full   text-sm">
                        <button className="px-6 py-2 font-semibold bg-zinc-900 text-zinc-100 rounded-lg">
                          Economy
                        </button>
                        <button className="px-4 py-2 font-semibold bg-zinc-900 text-zinc-100 rounded-lg">
                          Direct Flight
                        </button>
                      </div>
                    </div>

                    <div className="luggage flex justify-around gap-3 bg-zinc-300 p-3 m-3 rounded-lg">
                      <p className="font-medium">
                        Include free Baggages & cabin in Capacity{" "}
                      </p>
                      <div className="luggage-weight">20 KG</div>
                    </div>

                    <div className="flightTravelData relative flex z-10 p-4 w-full h-48 text-sm ">
                      <div className="timeTravelByFlight flex w-full ">

                          {/* Departure Time and Date  */}
                      
                        <div className="w-52 h-full flex flex-col justify-between items-center">
                          <div className="timeFrom text-lg font-semibold">
                            <p className="time ">
                            {ScheduleFlight.length > 0 &&
                            ScheduleFlight.map((scheduleData, index) => (
                              <p key={index}>
                                {flight.flight_id == scheduleData.flight_id
                                  ? scheduleData.departureTime
                                  : ""}
                              </p>
                            ))}
                            </p>
                            <p className="date text-xs text-zinc-600">
                            {ScheduleFlight.length > 0 &&
                            ScheduleFlight.map((scheduleData, index) => (
                              <p key={index}>
                                {flight.flight_id == scheduleData.flight_id
                                  ? (new Date(scheduleData.Departure).toDateString())
                                  : ""}
                              </p>
                            ))}
                            </p>
                          </div>

                          {/* Arrival Time and Date  */}

                          <div className="timeTo">
                            <p className="time text-lg font-semibold">
                            {ScheduleFlight.length > 0 &&
                            ScheduleFlight.map((scheduleData, index) => (
                              <p key={index}>
                                {flight.flight_id == scheduleData.flight_id
                                  ? scheduleData.arrivalTime
                                  : ""}
                              </p>
                            ))}
                            </p>
                            <p className="date text-xs text-zinc-600">
                            {ScheduleFlight.length > 0 &&
                            ScheduleFlight.map((scheduleData, index) => (
                              <p key={index}>
                                {flight.flight_id == scheduleData.flight_id
                                  ? (new Date(scheduleData.Arrival).toDateString())
                                  : ""}
                              </p>
                            ))}
                            </p>
                          </div>
                        </div>
                        <div className="travel-image  h-full">
                          <img
                            src="/travel.png"
                            alt="travel-image"
                            className="w-16 h-52 "
                          />
                        </div>

                        <div className="TravelCityAndAddress flex flex-col justify-between items-center w-full ml-3">

                            <div className="departureCity-Address w-full text-lg font-semibold ">
                                <p className="departure-City">
                                  {flight.Departure}
                                </p>
                                <p className="address text-xs text-zinc-600">
                                      {DepartureAddress}
                                </p>
                            </div>

                            <div className="totalTime w-full text-zinc-600 font-mono text-xs">
                                 <p> {ScheduleFlight.length > 0 &&
                                          ScheduleFlight.map((scheduleData, index) => (
                                            <p key={index} className="">
                                        {flight.flight_id == scheduleData.flight_id
                                          ? scheduleData.totalTIme
                                          : ""}
                                      </p>
                                    ))}</p>
                            </div>

                              <div className="departure-Arrival w-full text-lg font-semibold">
                                    <p className="ArrivalCity-Address">
                                      {flight.Arrival}
                                    </p>
                                    <p className="w-full text-xs text-zinc-600">
                                      {ArrivalAddress}
                                    </p>
                              </div>
                        </div>
                      </div>
                    </div>
                    <hr className="border-t-4 border-gray-400 rounded-lg my-4 w-full opacity-75 hover:border-blue-500 transition-colors duration-300"/>
                    
                        <div className="Fair-Per-person w-full flex justify-around items-center gap-16 mb-6 mt-3">
                            <div className="fair flex justify-center items-end">
                                <p className="font-semibold mr-2">INR</p> 
                                <h2 className="text-3xl text-black">1500</h2>
                                <p className="font-semibold ml-1">/person</p>
                            </div>
                                <div className="relative bookedTicked">
                                <button
                                    className="w-full h-12 bg-blue-600 px-3 font-semibold text-white rounded-lg flex justify-center items-center"
                                    onClick={() => HandleBook(flight.flight_id)}
                                  >
                                    Reserve Your Seat
                                  </button>
                        
                                </div>
                        </div>
                  </div>
                ))}

              {/* <table className="min-w-[95%] text-xs font-medium bg-white border border-gray-200 rounded-lg shadow-2xl">
                <thead>
                  <tr className="bg-gray-100"></tr>
                </thead>
                <tbody>
                  {filterFlight && filterFlight.length > 0 ? (
                    filterFlight.map((flight, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="border  border-[#f1f1f1a2]  py-2">
                          <img
                            className="w-16 h-10 ml-5"
                            src={flight.flightLogo}
                            alt=""
                          />
                        </td>
                        <td className="border  border-[#f1f1f1a2] px-4 py-2  text-center">
                          {ScheduleFlight.length > 0 &&
                            ScheduleFlight.map((scheduleData, index) => (
                              <p key={index} className=" text-center">
                                {flight.flight_id == scheduleData.flight_id
                                  ? scheduleData.totalTIme
                                  : ""}
                              </p>
                            ))}
                          {flight.Airline}
                        </td>
                        <td className="border flex flex-col justify-center items-center border-[#f1f1f1a2] px-4 py-2">
                          {ScheduleFlight.length > 0 &&
                            ScheduleFlight.map((scheduleData, index) => (
                              <p key={index}>
                                {flight.flight_id == scheduleData.flight_id
                                  ? scheduleData.departureTime
                                  : ""}
                              </p>
                            ))}
                          &nbsp;to
                          {ScheduleFlight.length > 0 &&
                            ScheduleFlight.map((scheduleData, index) => (
                              <p key={index}>
                                {flight.flight_id == scheduleData.flight_id
                                  ? scheduleData.arrivalTime
                                  : ""}
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
              </table> */}
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
        </div>
        <div className="sticky top-[5%] right-0 w-[35%] h-screen p-3">
            <div className="w-[80%] mx-auto h-full p-3 bg-[#ECECEC] gap-3 shadow-2xl text-xs border">
                  <div className="filter-reset flex justify-between items-center w-full ">
                      <p className="font-semibold text-sm">Filters</p>
                      <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
                          Reset
                      </button>
                  </div>
                  <hr className="border-t-2 border-gray-400 rounded-lg my-4 w-full opacity-75  transition-colors duration-300"/>
                  
                  <div className="stoppage">
                    <label className="font-semibold  text-sm">
                        Stoppage
                        <div className="stopage-options flex flex-col gap-2 mt-2">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="stoppage"
                                    value="all"
                                    defaultChecked
                                />
                                <span className="text-black">All</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="stoppage"
                                    value="non-transit"
                                />
                                <span className="text-black">Non-Transit</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="stoppage"
                                    value="1-stop"
                                />
                                <span className="text-black">1 Stop</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="stoppage"
                                    value="2-stop"
                                />
                                <span className="text-black">2 Stop</span>
                            </label>
                        </div>
                    </label>
                  </div>

                  <hr className="border-t-2 border-gray-400 rounded-lg my-4 w-full opacity-75  transition-colors duration-300"/>

                    <div className="price-range">
                      <label className="font-semibold text-sm">
                        Price Range
                      </label>
                      <div className="flex justify-between items-center gap-4">
                        <input
                          type="range"
                          min="0"
                          max="5000"
                          value="0"
                          className="w-full h-4"
                        />
                        <div className="flex gap-2">
                          <p className="text-sm text-gray-600">Min</p>
                          <p className="text-sm text-gray-600">Max</p>
                        </div>
                        <p className="text-sm text-gray-600">0 - 5000</p>
                      </div>
                    </div>

                  <hr className="border-t-2 border-gray-400 rounded-lg my-4 w-full opacity-75  transition-colors duration-300"/>

                  <div className="flight-class">
                    <label className="font-semibold text-sm">
                        Flight Class
                    </label>
                    <div className="flex flex-col gap-2 mt-2">
                    <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="class"
                                    value="All"
                                    defaultChecked
                                />
                                <span className="text-black">All</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="class"
                                    value="Economy"
                                />
                                <span className="text-black">Economy</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="class"
                                    value="Business"
                                />
                                <span className="text-black">Business</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="class"
                                    value="First_class"
                                />
                                <span className="text-black">First Class</span>
                            </label>
                    </div>

                    <div className="apply-filter mt-5">
                      <button className="w-full h-12 bg-blue-500 hover:bg-blue-700 text-white rounded-lg flex justify-center items-center">
                          Apply Filter
                      </button>
                    </div>
                  </div>
            </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default FilterFlight;
