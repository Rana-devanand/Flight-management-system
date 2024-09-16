import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function FilterFlight() {
  const URL = import.meta.env.VITE_BACKEND_API_URL;

  const [filterFlight , setFilterFlightData] = useState({});
  const location = useLocation();
  const userData = location.state?.user; // Retrieving the object data
  

  useEffect(()=>{
    setFilterFlightData(userData);
  },[])

  // const dateObject = new Date(myDate);
  // const day = dateObject.getDay();
  // const daysOfWeek = [
  //   "Sunday",
  //   "Monday",
  //   "Tuesday",
  //   "Wednesday",
  //   "Thursday",
  //   "Friday",
  //   "Saturday",
  // ];
  // const dayName = daysOfWeek[day];

  // const [filterFormData, setFormData] = useState({});

  // const filterData = () => {
  //   const filterDate = { ...userData, Date: dayName };
  //   setFormData(filterDate);
  //   console.log(filterDate);
  // };

  // const [filterFlight, setFilterFlightData] = useState({});

  // // http://localhost:4000/api/V1/filterFlight

  // const FetchAllFlightDetail = async () => {
  //   try {
  //     const url = `${URL}/api/V1/filterFlight`;

  //     const response = await axios(url, {
  //       params: filterFormData,
  //     });

  //     setFilterFlightData(response);
  //     console.log("filter flight data : ", response.data.data[0]);
  //   } catch (error) {
  //     console.error(" Couldn't get flight detail from server", error);
  //   }
  // };


  // useEffect(() => {
  //   filterData();
  //   FetchAllFlightDetail();
  // }, []);
  return (
    <div className="bg-slate-700 w-full h-screen">
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
    </div>
  );
}

export default FilterFlight;
