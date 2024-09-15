import React, { useEffect, useRef, useState } from "react";
import skyImage from "../../assets/images/sky.jpg";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
function UpdateFlight() {

     const URL =  import.meta.env.VITE_BACKEND_API_URL;
     const [allCity , setAllCity] = useState({});

     const flightId =  useParams();
     const id = flightId.id;

// http://localhost:4000/api/V1/allCity
const getAllCity = async () =>{
     try {
          const response = await axios.get(URL+"/api/v1/allCity");
          // console.log(response)
          setAllCity(response.data.data);
     } catch (error) {
          console.log(error);
     }
}

const [flightData , setFlightData] = useState({
     Airline: "",
     modelNo: "",
     Capacity: "",
     Departure: "",
     Arrival: "",
     DepartureTime: "",
     ArrivalTime: "",
     Remark: "",
});
// http://localhost:4000/api/V1/airplane/:id
const getFlightByPk = async () => {
     try {
          const response = await axios.get(URL+`/api/V1/airplane/${id}`);
          setFlightData(response.data.data);
          console.log(response.data.data);
     } catch (error) {
          console.error(error);
     }
}
console.log("Flight Data: " , flightData);

const handleChange = (e) =>{
     const updateData = {...flightData , [e.target.name] : e.target.value};
     console.log(flightData)
     setFlightData(updateData);
}

// http://localhost:4000/api/V1/updateAirplane/:id
const HandleSubmit = async (e) => {
     e.preventDefault();
     try {
          const updateURL  = `${URL}/api/V1/updateAirplane/${id}`; 
          const updateFlight = await axios.patch(updateURL ,flightData)
          console.log(updateFlight)
     } catch (error) {
          console.error(error);
     }
}


useEffect(() => {
     getAllCity();
     getFlightByPk();

},[])


const notify = () => {
     toast.success("Flight Updated Successfully");
}
  return (
     <>
     <div className="bg-zinc-800 h-screen w-full text-white flex justify-center">
        <img
          className="relative w-full h-auto brightness-50"
          src={skyImage}
          alt=""
        />
        <div className="absolute w-[95%]">
          <h1 className="px-8 pt-5 text-2xl font-semibold"> update Flights Data</h1>
          <hr className="w-[95%] h-1 mx-auto bg-gray-100 border-0 rounded md:my-3 dark:bg-[#FAA718]" />
          <div className="Search-form w-[95%] mx-auto h-80 ">
            <h4 className="w-full p-2 bg-[#5A7FA1] text-lg">Update Flight</h4>

            <form onSubmit={HandleSubmit}  >
              <div className="flex flex-wrap justify-start gap-5 mt-5">
                <div className=" flex flex-col w-[32%]">
                  <label htmlFor="" className="font-semibold text-lg">
                    Enter Airline Name{" "}
                  </label>
                  <input
                    className=" p-3  rounded bg-zinc-300 text-black outline-none border "
                    placeholder="Example : AA or American Airline"
                    type="text"
                    name="Airline"
                    value={flightData.Airline}
                    onChange={handleChange}
                  />
                </div>
                <div className=" flex flex-col w-[32%]">
                  <label htmlFor="" className="font-semibold text-lg">
                    Enter Model-No{" "}
                  </label>
                  <input
                    className="p-3 rounded bg-zinc-300 text-black outline-none border "
                    placeholder="Example : Mumbai, Maharashtra"
                    type="text"
                    name="modelNo"
                     value={flightData.modelNo}
                    onChange={handleChange}
                  />
                </div>

                <div className=" flex flex-col w-[32%]">
                  <label htmlFor="" className="font-semibold text-lg">
                    Enter Capacity{" "}
                  </label>
                  <input
                    className="p-3 rounded bg-zinc-300 text-black outline-none border "
                    placeholder="Example : Mumbai, Maharashtra"
                    type="text"
                    name="Capacity"
                    value={flightData.Capacity}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col w-[32%]">
                  <label htmlFor="" className="font-semibold text-lg">
                    Enter Departure City{" "}
                  </label>
                  <select
                    id="countries"
                    className="p-3 rounded bg-zinc-300 text-black outline-none border gap-5"
                    onChange={handleChange}
                    value={flightData.Departure}
                    name="Departure"
                  >
                    <option selected>Choose a City</option>
                    {allCity.length > 0 &&
                      allCity
                        .sort((a, b) => a.name.localeCompare(b.name)) // Sort by city name alphabetically
                        .map((data, index) => (
                          <option key={index} value={data.name}>
                            {data.name}
                          </option>
                        ))}
                  </select>
                </div>

                <div className="flex flex-col w-[32%]">
                  <label htmlFor="" className="font-semibold text-lg">
                    Enter Arrival City{" "}
                  </label>
                  <select
                    id="countries"
                    className="p-3  rounded bg-zinc-300 text-black outline-none border gap-5"
                    onChange={handleChange}
                    value={flightData.Arrival}
                    name="Arrival"
                  >
                    <option selected>Choose a City </option>
                    {allCity.length > 0 &&
                      allCity
                        .sort((a, b) => a.name.localeCompare(b.name)) // Sort by city name alphabetically
                        .map((data, index) => (
                          <option key={index} value={data.name}>
                            {data.name}
                          </option>
                        ))}
                  </select>
                </div>

                <div className="flex flex-col w-[32%]">
                  <label className="font-semibold text-lg" for="appt">
                    Select Departure Time:
                  </label>
                  <input
                    className="p-3  rounded bg-zinc-300 text-black outline-none border-zinc-950 gap-5 "
                    type="time"
                    id="appt"
                    name="DepartureTime"
                    value={flightData.DepartureTime}
                    onChange={handleChange}
                  />
                </div>

                {/* <div className="flex justify-around"> */}
                <div className="flex flex-col w-[32%]">
                  <label className="font-semibold text-lg" for="appt">
                    Select Arrival Time:
                  </label>
                  <input
                    className="p-3  rounded bg-zinc-300 text-black outline-none border gap-5"
                    type="time"
                    id="appt"
                    name="ArrivalTime"
                    value={flightData.ArrivalTime}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col w-[32%]">
                  <label htmlFor="" className="font-semibold text-lg">
                    Choose Remark{" "}
                  </label>
                  <select
                    id="countries"
                    className="p-3  rounded bg-zinc-300 text-black outline-none border gap-5"
                    onChange={handleChange}
                    name="Remark"
                    value={flightData.Remark}
                  >
                    <option selected>Choose Airline Remark </option>
                    <option value="DAILY">DAILY</option>
                    <option value="MONDAY">MONDAY</option>
                    <option value="TUESDAY">TUESDAY</option>
                    <option value="WEDNESDAY">WEDNESDAY</option>
                    <option value="THURSDAY">THURSDAY</option>
                    <option value="FRIDAY">FRIDAY</option>
                    <option value="SATURDAY">SATURDAY</option>
                    <option value="SUNDAY">SUNDAY</option>
                  </select>
                </div>
                {/* </div> */}
              </div>

              <button
                className="px-20 py-2 bg-[#c58413] ml-[35%] mt-6"
                type="submit"
                onClick={notify}
              >
                {" "}
                Update Flight
              </button>
            </form>
            <ToastContainer />
          </div>
        </div>
        </div>
     </>
  )
}

export default UpdateFlight