import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import AirIndia from "../assets/images/air-india-2.svg";
import { GiCommercialAirplane } from "react-icons/gi"
import { FaArrowCircleRight } from "react-icons/fa";

function FilterFlight() {
  const URL = import.meta.env.VITE_BACKEND_API_URL;
  const navigate = useNavigate();
  const [filterFlight, setFilterFlightData] = useState({});
  const [DailyFlight, setDailyFlightData] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());
  const location = useLocation();
  const userData = location.state?.user; // Retrieving the object data

  // http://localhost:4000/api/V1/dailyFlights
  const getDailyFlightsData = async () => {
    try {
      const url = `${URL}/api/V1/dailyFlights`;
      const response = await axios.get(url, {
        params: {
          Remark: "DAILY",
        },
      });
      setDailyFlightData(response.data.data);
      // console.log("Daily : ",response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setFilterFlightData(userData);
    getDailyFlightsData();
    setCurrentDate(
      new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  }, []);

  const HandleBook = (id) => {
    const type = localStorage.getItem("type");
    console.log(type);
    if (!type) {
      navigate("/login");
    } else if (type == "user") {
      navigate(`/bookTicket/${id}`);
    }
  };

  // console.log(currentDate);
  return (
    <div className="bg-zinc-200 w-full h-auto">
      <div className="rounded-md w-[70%] h-auto m-auto flex flex-col gap-5">
        <h4 className="text-black text-2xl mt-7 font-serif">
          Departing flights
        </h4>
        {filterFlight && filterFlight.length > 0 ? (
          filterFlight.map((flight, id) => (
            <div
              key={id}
              className="flex w-full h-80 bg-zinc-350 border border-blue-300  shadow-2xl rounded-lg text-lg font-semibold"
            >
              <div className="w-[32%] p-3">
                <img className="w-36 ml-6" src={AirIndia} alt="" />
                <p className="text-4xl ml-10 mt-2">{flight.Airline} </p>
                <p className="mt-10  text-[#747474]">Model No</p>
                <p className="text-2xl">{flight.modelNo}</p>
                <p className="mt-5">
                  <span className="text-[#747474]">Date :</span> {currentDate} <br />
                  <span className="text-[#747474]">Time :</span> {flight.DepartureTime} -  {flight.ArrivalTime} IST 
                </p>
              </div>

              <div className=" w-[44%] text-center" >
                <p className="flex mt-14 text-4xl gap-5 font-semibold justify-center">{flight.Departure} <p className="mt-2"><GiCommercialAirplane/></p> {flight.Arrival} </p>

                <div className="mt-10">
                    <p className="text-xl"><b>JOHN/DOE</b></p>
                </div>
                    <div className="mt-10 text-xl" >
                    <p className="text-red-600 font-semibold mb-5">No-Stoppage</p>  
                    <span className="text-[#747474]">left seats </span> 
                    <p>{flight.Capacity}</p>
                    </div>
              </div>            

              <div className="border w-[23%] bg-blue-800 flex flex-col  m-2 rounded-xl">
                <p className="p-5  text-white">Total Fair :</p>
                <p className="text-center text-2xl italic mt-5 text-white ">$ 6,500</p>
                  <button
                    className="w-40 ml-12 mt-16  text-white py-2 px-6 bg-blue-500 rounded flex"
                    onClick={() => HandleBook(flight.id)}
                  >Book Ticket <p className=" w-7 mt-3 text-3xl"> <FaArrowCircleRight/></p>
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

      <div className="rounded-md w-[70%] h-auto m-auto flex flex-col mt-20">
        <h4 className="text-black text-2xl mt-7 font-serif">
          Best departing flights
        </h4>
        {DailyFlight && DailyFlight.length > 0 ? (
          DailyFlight.map((flight, id) => (
            <div
              key={id}
              className="flex w-full h-80 bg-amber-200 border border-blue-300 shadow-2xl rounded-lg text-lg font-semibold mb-10"
            >
              <div className="w-[35%] p-3">
                <img className="w-36 ml-6" src={AirIndia} alt="" />
                <p className="text-4xl ml-10 mt-2">{flight.Airline} </p>
                <p className="mt-10  text-[#747474]">Model No</p>
                <p className="text-2xl">{flight.modelNo}</p>
                <p className="mt-10">
                  <span className="text-[#747474]">Date :</span> {currentDate} <br />
                  <span className="text-[#747474]">Time :</span> {flight.DepartureTime} -  {flight.ArrivalTime} IST 
                </p>
              </div>

              <div className=" w-[40%] text-center " >
                <p className="flex mt-14 text-4xl gap-5 font-semibold justify-center">{flight.Departure} <p className="mt-2"><GiCommercialAirplane/></p> {flight.Arrival} </p>

                <div className="mt-10">
                    <p className="text-xl"><b>JOHN/DOE</b></p>
                </div>
                    <div className="mt-10 text-xl" >
                    <p className="text-red-600 font-semibold mb-5">No-Stoppage</p>  
                    <span className="text-[#747474]">left seats </span> 
                    <p>{flight.Capacity}</p>
                    </div>
              </div>            

              <div className="border w-[23%] bg-blue-700 flex flex-col  m-2 rounded-xl">
                <p className="p-5  text-white">Total Fair :</p>
                <p className="text-center text-2xl italic mt-5 text-white ">$ 6,500</p>
                  <button
                    className="w-40 ml-12 mt-16  text-white py-2 px-6 bg-blue-500 rounded flex"
                    onClick={() => HandleBook(flight.id)}
                  >Book Ticket <p className=" w-7 mt-3 text-3xl"> <FaArrowCircleRight/></p>
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
