import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import AirIndia from "../assets/images/air-india-2.svg";
import { GiCommercialAirplane } from "react-icons/gi";
import { FaArrowCircleRight } from "react-icons/fa";
import rightIcon from "../assets/images/icons8-arrow.gif";

import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css"; // Import a theme (optional)
import "flatpickr/dist/flatpickr.css";

function FilterFlight() {
  const URL = import.meta.env.VITE_BACKEND_API_URL;
  const navigate = useNavigate();
  const [filterFlight, setFilterFlightData] = useState({});
  const [DailyFlight, setDailyFlightData] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());
  const location = useLocation();
  const userData = location.state?.user; // Retrieving the object data

  const [storeAllCity, setAllCity] = useState({});

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

  useEffect(() => {
    if (userData) {
      const updateUserChooseDestination = userData.map((flight) => {
        return {
          ...flight,
          flightLogo: `${URL}/${flight.flightLogo.replace(/\\/g, "/")}`,
        };
      });
      setFilterFlightData(updateUserChooseDestination);
    }
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
  const [cost, setCost] = useState(2253);

  const HandleBook = (id) => {
    const type = localStorage.getItem("type");
    console.log(type);
    if (!type) {
      navigate("/login");
    } else if (type == "user") {
      const updatePriceInFlight = { ...id, id: id, price: cost };
      console.log(updatePriceInFlight);
      navigate(`/bookTicket`, { state: { user: updatePriceInFlight } });
    }
  };

  const [modal, setModal] = useState(false);
  const showModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <div className="bg-zinc-200 w-full h-auto">
      <div className="rounded-md w-[80%] h-auto m-auto flex flex-col gap-5">
        <div className=" w-full h-40 mt-10 mb-10">
          <h4 className="text-xl">Filter Flights </h4>
          <div className="flex justify-between w-full h-40 border border-[#cacaca] p-5 rounded-md bg-[#E3E3E6] shadow-2xl">
            <div className="flex flex-col w-[32%] items-start justify-center mb-5 ">
              <label htmlFor="" className="text-xl">
                Departure city{" "}
              </label>
              <select
                name="cityFrom"
                id=""
                className="w-[95%] px-10 py-4 rounded-md outline-none"
              >
                <option value="" defaultChecked>
                  Select
                </option>
                {storeAllCity &&
                  storeAllCity.length > 0 &&
                  storeAllCity
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((city) => (
                      <option value={city.name} onChange={FilterData}>{city.name} 
                              
                      </option>
                    ))}
              </select>
            </div>

            <div className="flex flex-col w-[32%] items-start justify-center mb-5 ">
              <label htmlFor="" className="text-xl">
                Arrival city{" "}
              </label>
              <select
                name="cityFrom"
                id=""
                className="w-[95%] px-10 py-4 rounded-md outline-none"
              >
                <option value="" defaultChecked>
                  Select
                </option>
                {storeAllCity &&
                  storeAllCity.length > 0 &&
                  storeAllCity
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((city) => (
                      <option
                        value={city.name}
                        className="overflow-scroll h-16"
                      >
                        {city.name}
                      </option>
                    ))}
              </select>
            </div>

            <div className="custom-flatpickr flex flex-col items-start justify-center rounded-md w-[30%] outline-none text-lg">
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
                placeholder="Choose the date"
                className="custom-flatpickr p-3 rounded-md w-[95%] outline-none text-lg"
                name="Date"
              />
            </div>
          </div>
        </div>

        <h4 className="text-black text-2xl mt-7 font-serif">
          Departing flights
        </h4>
        {modal == true ? (
          <>
            <div
              id="exampleModal"
              class="fixed inset-0 flex items-start justify-center bg-black bg-opacity-50"
            >
              <div class="bg-[#fff] rounded-lg shadow-lg w-[80%] mt-3">
                <div class="flex justify-between items-center p-4 border-b border-gray-200">
                  <h5 class="text-lg font-semibold">Modal title</h5>
                  <button
                    type="button"
                    class="text-gray-400 hover:text-gray-600"
                    onClick={closeModal}
                  >
                    <span>&times;</span>
                  </button>
                </div>
                <div class="p-4 flex gap-5 bg-[#F6FCFF]">
                  <div className=" rounded-md p-4 flex flex-col justify-between">
                    <p className="font-semibold text-lg">Fair types</p>
                    <p className="font-semibold text-lg mt-4">Baggage</p>
                    <p className="font-semibold text-lg mt-4">
                      Change/Cancellation
                    </p>
                    <p className="font-semibold text-lg mt-4">
                      Add-ons and services
                    </p>
                  </div>

                  <button
                    className="border border-zinc-200 p-4 rounded-md w-[25%] shadow-2xl text-start hover:bg-sky-100 hover:text-black bg-white"
                    onClick={(e) => {
                      setCost(2253);
                      setModal(false);
                    }}
                  >
                    <p className="text-gray-500">saver Fare</p>
                    <p className="font-semibold text-xl"> ₹ 2,253</p>

                    <p className="border border-dashed mt-5 mb-4"></p>

                    <p className="font-medium">7 kg cabin bag allowance </p>
                    <p className="font-medium">15 kg check in bag allowance</p>

                    <p className="border border-dashed mt-5 mb-4"></p>

                    <p className="font-medium">Change charge upto INR $ 1599</p>
                    <p className="font-medium">
                      Cancellation charges unto in $1899
                    </p>

                    <p className="border border-dashed mt-5 mb-4"></p>
                    <p className="font-medium"> - </p>
                    <p className="font-medium">-</p>
                  </button>

                  <button
                    className="border border-zinc-200 rounded-md shadow-2xl p-4 text-start  hover:bg-sky-100 hover:text-black bg-white"
                    onClick={(e) => {
                      setCost(3988);
                      setModal(false);
                    }}
                  >
                    <p className="text-gray-500">Flexi plus Fare</p>
                    <p className="font-semibold text-xl"> ₹ 3,988</p>

                    <p className="border border-dashed mt-5 mb-4"></p>

                    <p className="font-medium">7 kg cabin bag allowance </p>
                    <p className="font-medium">15 kg check in bag allowance</p>

                    <p className="border border-dashed mt-5 mb-4"></p>

                    <p className="font-medium">Change charge upto INR $ 1599</p>
                    <p className="font-medium">
                      Cancellation charges unto in $1899
                    </p>

                    <p className="border border-dashed mt-5 mb-4"></p>

                    <p className="font-medium">Free meal</p>
                    <p className="font-medium">Free Standard seat</p>
                  </button>

                  <button
                    className="border border-zinc-200 rounded-md shadow-2xl p-4 text-start  hover:bg-sky-100 hover:text-black bg-white "
                    onClick={(e) => {
                      setCost(5038);
                      setModal(false);
                    }}
                  >
                    <p className="text-gray-500">Super Fare</p>
                    <p className="font-semibold text-xl"> ₹ 5,038</p>

                    <p className="border border-dashed mt-5 mb-4"></p>

                    <p className="font-medium">7 kg cabin bag allowance </p>
                    <p className="font-medium">15 kg check in bag allowance</p>

                    <p className="border border-dashed mt-5 mb-4"></p>

                    <p className="font-medium">Change charge upto INR $ 1599</p>
                    <p className="font-medium">
                      Cancellation charges unto in $1899
                    </p>

                    <p className="border border-dashed mt-5 mb-4"></p>

                    <p className="font-medium">Free meal</p>
                    <p className="font-medium">Free XL seat </p>
                  </button>
                </div>
                <div class="flex justify-end p-4 border-t border-gray-200">
                  <button
                    type="button"
                    class="bg-gray-500 text-white py-2 px-4 rounded mr-2"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                  {/* <button
                    type="button"
                    class="bg-blue-500 text-white py-2 px-4 rounded"
                  >
                    Save changes
                  </button> */}
                </div>
              </div>
            </div>
          </>
        ) : null}

        {filterFlight && filterFlight.length > 0 ? (
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
                {/* <p className="mt-5">
                  <span className="text-[#747474]">Date :</span> {currentDate} <br />
                  <span className="text-[#747474]">Time :</span> {flight.DepartureTime} -  {flight.ArrivalTime} IST 
                </p> */}
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
                  {/* <p className="text-red-600 font-semibold mb-5">No-Stoppage</p>  
                    <span className="text-[#747474]">left seats </span> 
                    <p>{flight.Capacity}</p> */}
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
        )}
      </div>

      {/* Daily flights Data  */}

      <div className="rounded-md w-[80%] h-auto m-auto flex flex-col mt-20">
        <h4 className="text-black text-2xl mt-7 font-serif">
          Daily departing flights
        </h4>
        {DailyFlight && DailyFlight.length > 0 ? (
          DailyFlight.map((flight, id) => (
            <div
              key={id}
              className="flex w-full h-56 bg-[#fde1f0] border-2 border-pink[#fde1f0] shadow-2xl rounded-lg text-lg font-semibold mb-10"
            >
              <div className="w-[35%] p-3">
                <img
                  className="w-36 h-14 ml-6 "
                  src={flight.flightLogo}
                  alt=""
                />
                <p className="text-2xl ml-14 mt-2">{flight.Airline} </p>
                <p className="mt-5 text-[#747474]">Model No</p>
                <p className="text-xl">{flight.modelNo}</p>
                {/* <p className="mt-10">
                  <span className="text-[#747474]">Date :</span> {currentDate} <br />
                  <span className="text-[#747474]">Time :</span> {flight.DepartureTime} -  {flight.ArrivalTime} IST 
                </p> */}
              </div>

              <div className=" w-[40%] text-center mr-7">
                <p className="flex mt-14 text-3xl gap-5 font-semibold justify-center">
                  {flight.Departure}{" "}
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
                  {/* <p className="text-red-600 font-semibold mb-5">No-Stoppage</p>   */}
                  {/* <span className="text-[#747474]">left seats </span>  */}
                  {/* <p>{flight.Capacity}</p> */}
                </div>
              </div>

              <div className="w-[24%]  mr-5 ">
                <div className="border w-full h-36  bg-pink-800 m-2 rounded-xl text-center">
                  <p className="p-5 text-white">Start at : ₹ ${cost}</p>
                  <button
                    className="w-40 ml-16 text-white py-2 px-4 bg-pink-500 rounded flex justify-center gap-2"
                    onClick={() => HandleBook(flight.id)}
                  >
                    Book Now
                    <p className="w-7 mt-1 text-xl">
                      {" "}
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
        )}
      </div>
    </div>
  );
}

export default FilterFlight;
