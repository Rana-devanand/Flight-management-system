import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function FilterFlight() {
  const URL = import.meta.env.VITE_BACKEND_API_URL;

  const [filterFlight , setFilterFlightData] = useState({});
  const [DailyFlight , setDailyFlightData ]= useState({})
  const location = useLocation();
  const userData = location.state?.user; // Retrieving the object data

  // http://localhost:4000/api/V1/dailyFlights
  const getDailyFlightsData = async () =>{
    try {
      const url = `${URL}/api/V1/dailyFlights`;
      const response = await axios.get(url  ,{
        params :{
          Remark : "DAILY",
        }
      })
      setDailyFlightData(response.data.data);
      console.log("Daily : ",response);
    } catch (error) {
      console.error(error);
    }
  }



  useEffect(()=>{
    setFilterFlightData(userData);
    getDailyFlightsData();
  },[])

  return (
    <div className="bg-slate-700 w-full h-auto">
      <div className="rounded-md w-[70%] h-auto m-auto flex flex-col justify-between">
      <h4 className="text-white text-xl mt-5 font-semibold" >Best departing flights</h4>
        {filterFlight && filterFlight.length > 0 ? (
          filterFlight.map((flight, id) => (
            <div key={id} className="flex justify-between w-full h-auto text-white border bg-zinc-600 border-black p-3  rounded-md mt-3 text-lg font-semibold">
              
              <div className="">
                <span className="">{flight.DepartureTime} -  {flight.ArrivalTime}</span>
                <p className="mt-5">{flight.Airline}  {flight.modelNo}</p>
              </div>

              <div className="flex flex-col justify-between">
              </div>

              <div className="">
                <p className="mb-5 text-center italic">Direct </p>
                <span className="font-medium text-amber-500">{flight.Departure} <i className="font-semibold">  to </i> {flight.Arrival} </span>
              </div>

              <div className="text-center text-sm">
                <i className=""> left seats :</i>  <span> {flight.Capacity}</span>
              </div>

              <div className="flex flex-col justify-between gap-5">
                <span>Total cost: {flight.TotalCost}</span>
                <button className="py-2 px-6 bg-blue-600 rounded-md">Book Ticket</button>
              </div>
            </div>
          ))
        ) : (
          <p>No flights available</p>
        )}
      </div>

      {/* Daily flights Data  */}

      <div className="rounded-md w-[70%] h-auto mt-10 pb-10 m-auto flex flex-col justify-between">
      <h4 className="text-white text-xl mt-5 font-semibold" >Daily  departing flights</h4>
        {DailyFlight && DailyFlight.length > 0 ? (
          DailyFlight.map((flight, id) => (
            <div key={id} className="flex justify-between w-full h-auto text-white border bg-zinc-600 border-black p-3  rounded-md mt-3 text-lg font-semibold">
              
              <div className="w-32">
                <span className="">{flight.DepartureTime} -  {flight.ArrivalTime}</span>
                <p className="mt-5">{flight.Airline}  {flight.modelNo}</p>
              </div>

              <div className="flex flex-col justify-between">
              </div>

              <div className="">
                <p className="mb-5 text-center italic">Direct </p>
                <span className="font-medium text-amber-500">{flight.Departure} <i className="font-semibold">  to </i> {flight.Arrival} </span>
              </div>

              <div className="text-center text-sm">
                <i className=""> left seats :</i>  <span> {flight.Capacity}</span>
              </div>

              <div className="flex flex-col justify-between gap-5">
                <span>Total cost: {flight.TotalCost}</span>
                <button className="py-2 px-6 bg-blue-600 rounded-md">Book Ticket</button>
              </div>
            </div>
          ))
        ) : (
          <p>No flights available</p>
        )}
      </div>
    </div>
  );
}

export default FilterFlight;
