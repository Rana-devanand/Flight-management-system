import React, { useEffect, useRef, useState } from "react";
import skyImage from "../../assets/images/sky.jpg";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function CreateFlight() {
  const navigate = useNavigate();
  const [allCity, setAlCity] = useState([]);
  const URL = import.meta.env.VITE_BACKEND_API_URL;
  const getAlCity = async () => {
    try {
      const response = await axios.get(URL + "/api/V1/allCity");
      setAlCity(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };



  // console.log(allCity);
  useEffect(() => {
    getAlCity();
    // LoadAllFlight();
  }, []);
  const [Airline , setAirline] = useState("");
  const [modelNo , setModelNo] = useState("");
  const [Capacity , setCapacity] = useState("");
  const [Departure , setDeparture] = useState("");
  const [Arrival , setArrival] = useState("");
  const [flightType , setFlightType] = useState("");
  const [DepartureTime , setDepartureTime] = useState("");
  const [ArrivalTime , setArrivalTime] = useState("");
  const [Remark , setRemark] = useState("");
  const [flightLogo , setFlightLogo] = useState(null);

  const handleImage = (e) => {
    setFlightLogo(e.target.files[0]);
  };

  // const [value, SetValue] = useState({
  //   Airline: "",
  //   modelNo: "",
  //   Capacity: "",
  //   Departure: "",
  //   Arrival: "",
  //   DepartureTime: "",
  //   ArrivalTime: "",
  //   Remark: "",
  //   flightLogo : "",
  // });


  // console.log(image)
  // const handleChange = (e) => {
  //   SetValue({ ...value, [e.target.name]: e.target.value });
  //   console.log(value);
  // };
  const notify = (e) => {
    toast(e);
  };

  const FormRef = useRef(null);

  const HandleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Airline", Airline);
    formData.append("modelNo", modelNo);
    formData.append("Capacity", Capacity);
    formData.append("flight_type" ,flightType);
    formData.append("Departure", Departure);
    formData.append("Arrival", Arrival);
    // formData.append("DepartureTime", DepartureTime);
    // formData.append("ArrivalTime", ArrivalTime);
    formData.append("Remark", Remark);
    formData.append("flightLogo", flightLogo);

    try {
      const response = await axios.post(URL + "/api/V1/create", formData);
      if (response.status === 200) {
        toast.success("Flight Created Successfully");
        FormRef.current.reset();
        return;
      } else {
        toast.error("Flight Not Created ");
      }
     //  console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

//   Fetch all flight data from the server 
const [flightData , setFlightData] = useState([]);

const LoadAllFlight = async () => {
     try {
          const response = await axios.get(URL + "/api/V1/allFlights");

          const updateFlightData = response.data.data.map((flight) => {
            return {
              ...flight,
              flightLogo: `${URL}/${flight.flightLogo.replace(/\\/g,"/")}`,
          }});
          
          setFlightData(updateFlightData);
          console.log(response);
     } catch (error) {
          console.error(error);
     }
}

// fetch all filtered flights data from the server..

const [getAllFilteredFlightData, setAllFilteredFlightData] = useState([]);
const [filterFlight , setFilteredFlight] = useState({
  Airline : "",
})

const getFilteredFlight = (e) => {
  setFilteredFlight({...filterFlight ,[e.target.name] : e.target.value});
  getAllFilteredFlight();
}

const getAllFilteredFlight = async()=>{
  try {
    const response = await axios.get(URL + "/api/V1/allFlights/?Airline=" + filterFlight.Airline);
    setAllFilteredFlightData(response.data.data);
    // console.log(response)
  } catch (error) {
    console.log(error)
  }
}

// Update Flights with data from server and update flight
 const updateFlight = (id) =>{
  navigate(`/updateFlight/${id}`)
 }

 // Handle DeleteFlight 
 // http://localhost:4000/api/V1/delete/:id
 const HandleDelete = async(id) =>{
  try {
    const flight = await axios.delete(URL+`/api/V1/delete/${id}`);
    if(flight){
      toast.success("Flight Deleted Successfully");
      LoadAllFlight();
    }
  } catch (error) {
    console.error(error);
  }
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
          <h1 className="px-8 pt-5 text-2xl font-semibold"> Create Flights</h1>
          <hr className="w-[95%] h-1 mx-auto bg-gray-100 border-0 rounded md:my-3 dark:bg-[#FAA718]" />
          <div className="Search-form w-[95%] mx-auto h-80 ">
            <h4 className="w-full p-2 bg-[#5A7FA1] text-sm">Add Flight</h4>

            <form onSubmit={HandleSubmit} ref={FormRef}>
              <div className="flex flex-wrap justify-start gap-5 mt-5">
                <div className=" flex flex-col w-[32%]">
                  <label htmlFor="" className="font-semibold text-sm">
                    Enter Airline Name{" "}
                  </label>
                  <input
                    className=" p-2  rounded bg-zinc-300 text-black outline-none border "
                    placeholder="Example : AA or American Airline"
                    type="text"
                    name="Airline"
                    onChange={(e) => setAirline(e.target.value)}
                    required
                  />
                </div>
                <div className=" flex flex-col w-[32%]">
                  <label htmlFor="" className="font-semibold text-sm">
                    Enter Model-No{" "}
                  </label>
                  <input
                    className="p-2 rounded bg-zinc-300 text-black outline-none border "
                    placeholder="Example : Mumbai, Maharashtra"
                    type="text"
                    name="modelNo"
                    //  value={selected}
                    onChange={(e) => setModelNo(e.target.value)}
                    required
                  />
                </div>

                <div className="flex flex-col w-[32%]">
                  <label htmlFor="" className="font-semibold text-sm">
                    Enter Flight type
                  </label>
                  <select
                    id="countries"
                    className="p-2  rounded bg-zinc-300 text-black outline-none border gap-5"
                    onChange={(e) => setFlightType(e.target.value)}
                    name="flight_type"
                    required
                  >
                    <option selected disabled>Choose flight type</option>
                    <option value="Domestic">Domestic</option>  
                    <option value="International">International</option>  
                  </select>
                </div>

                <div className=" flex flex-col w-[32%]">
                  <label htmlFor="" className="font-semibold text-sm">
                    Enter Capacity{" "}
                  </label>
                  <input
                    className="p-2 rounded bg-zinc-300 text-black outline-none border "
                    placeholder="Example : 200 , 80 , 120"
                    type="text"
                    name="Capacity"
                    onChange={(e) => setCapacity(e.target.value)}
                    required
                  />
                </div>

                <div className="flex flex-col w-[32%]">
                  <label htmlFor="" className="font-semibold text-sm">
                    Enter Departure City{" "}
                  </label>
                  <select
                    id="countries"
                    className="p-2  rounded bg-zinc-300 text-black outline-none border gap-5"
                    onChange={(e) => setDeparture(e.target.value)}
                    name="Departure"
                    required
                  >
                    <option selected disabled>Choose a City</option>
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
                  <label htmlFor="" className="font-semibold text-sm">
                    Enter Arrival City
                  </label>
                  <select
                    id="countries"
                    className="p-2  rounded bg-zinc-300 text-black outline-none border gap-5"
                    onChange={(e) => setArrival(e.target.value)}
                    name="Arrival"
                    required
                  >
                    <option selected disabled>Choose airport type </option>
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

                {/* <div className="flex flex-col w-[32%]">
                  <label className="font-semibold text-sm" for="appt">
                    Select Departure Time:
                  </label>
                  <input
                    className="p-2  rounded bg-zinc-300 text-black outline-none border-zinc-950 gap-5 "
                    type="time"
                    id="appt"
                    name="DepartureTime"
                    onChange={(e) => setDepartureTime(e.target.value)}
                  />
                </div> */}

                {/* <div className="flex justify-around"> */}
                {/* <div className="flex flex-col w-[32%]">
                  <label className="font-semibold text-sm" for="appt">
                    Select Arrival Time:
                  </label>
                  <input
                    className="p-2  rounded bg-zinc-300 text-black outline-none border gap-5"
                    type="time"
                    id="appt"
                    name="ArrivalTime"
                    onChange={(e) => setArrivalTime(e.target.value)}
                  />
                </div> */}

                {/* <div className="flex flex-col w-[32%]">
                  <label htmlFor="" className="font-semibold text-sm">
                    Choose Remark{" "}
                  </label>
                  <select
                    id="countries"
                    className="p-2  rounded bg-zinc-300 text-black outline-none border gap-5"
                    onChange={(e) => setRemark(e.target.value)}
                    name="Remark"
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
                </div> */}
                
                <div className=" flex flex-col w-[32%]">
                  <label htmlFor="" className="font-semibold text-sm">
                    Choose Flight Logo
                  </label>
                  <input
                    className=" p-2  rounded bg-zinc-300 text-black outline-none border "
                    placeholder="Example : AA or American Airline"
                    type="file"
                    name="flightLogo"
                    required
                    onChange={handleImage}
                  />
                </div>

                
              </div>

              <button
                className="px-20 py-2 bg-[#c58413] ml-[35%] mt-6"
                type="submit"
                onClick={notify}
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
            <h1 className="text-2xl font-semibold mt-10">All Flight</h1>
            <hr className="h-1 mx-auto bg-gray-100 border-0 rounded md:my-3 dark:bg-[#FAA718]" />
          </div>
        </div>
        <div className="px-6 py-2 ">
          <button className="bg-blue-800 px-4 py-2 rounded text-white text-sm" onClick={LoadAllFlight}>
            CLick to load
          </button>

          <input type="search" placeholder="Search Flight by name..." 
             class="w-[60%] px-4 ml-5 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"
              onChange={getFilteredFlight}
              name="Airline"
             />
        </div>

 {/* all flight data in table  */}

       <table class="min-w-full table-auto border-collapse border border-gray-300 text-sm">
          <thead class="bg-gray-200">
               <tr>
                    <th class="border border-gray-300 px-4 py-2 text-left">ID</th>
                    <th class="border border-gray-300 px-4 py-2 text-left">Airline</th>
                    <th class="border border-gray-300 px-4 py-2 text-left">Model No</th>
                    <th class="border border-gray-300 px-4 py-2 text-left">Capacity</th>
                    <th class="border border-gray-300 px-4 py-2 text-left">Departure City</th>
                    <th class="border border-gray-300 px-4 py-2 text-left">Arrival City</th>
                    {/* <th class="border border-gray-300 px-4 py-2 text-left">Departure Time</th>
                    <th class="border border-gray-300 px-4 py-2 text-left">Arrival Time</th> */}
                    {/* <th class="border border-gray-300 px-4 py-2 text-left">Remark</th> */}
                    <th class="border border-gray-300 px-4 py-2 text-left">Flight Logo</th>
                    <th class="border border-gray-300 px-4 py-2 text-left">Created At</th>
                    <th class="border border-gray-300 px-4 py-2 text-left">Updated At</th>
                    <th class="border border-gray-300 px-4 py-2 text-left">Edit</th>
                    <th class="border border-gray-300 px-4 py-2 text-left">Remove</th>
               </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
               {/* <!-- Rows here --> */}
                        
                        { getAllFilteredFlightData && getAllFilteredFlightData.length > 0 ? 
                        
                        (
                          getAllFilteredFlightData.map((flight , index) =>(
                            <tr class="hover:bg-gray-100"> 
                             <td class="border border-gray-300 px-4 py-2 text-left">{index + 1}</td>
                             <td class="border border-gray-300 px-4 py-2 text-left">{flight.Airline}</td>
                             <td class="border border-gray-300 px-4 py-2 text-left">{flight.modelNo}</td>
                             <td class="border border-gray-300 px-4 py-2 text-left">{flight.Capacity}</td>
                             <td class="border border-gray-300 px-4 py-2 text-left">{flight.Departure}</td>
                             <td class="border border-gray-300 px-4 py-2 text-left">{flight.Arrival}</td>
                             {/* <td class="border border-gray-300 px-4 py-2 text-left">{flight.DepartureTime}</td>
                             <td class="border border-gray-300 px-4 py-2 text-left">{flight.ArrivalTime}</td> */}
                             {/* <td class="border border-gray-300 px-4 py-2 text-left">{flight.Remark}</td> */}
                             <td class="border border-gray-300 px-4 py-2 text-left"><img src={flight.flightLogo} alt=""/></td>
                             <td class="border border-gray-300 px-4 py-2 text-left">{flight.createdAt}</td>
                             <td class="border border-gray-300 px-4 py-2 text-left">{flight.updatedAt}</td>
                             <td class="border border-gray-300 px-4 py-2 text-left"> <button className="px-4 py-2 rounded text-white bg-blue-700" type="button">EDIT</button></td>
                             <td class="border border-gray-300 px-4 py-2 text-left"><button className="px-4 py-2 rounded text-white bg-red-500" type="button">Delete</button></td>
                        </tr>
                        ))
                        )
                        :
                        (
                          flightData.map((flight , index) =>(
                            <tr class="hover:bg-gray-100"> 
                             <td class="border border-gray-300 px-4 py-2 text-left">{index + 1}</td>
                             <td class="border border-gray-300 px-4 py-2 text-left">{flight.Airline}</td>
                             <td class="border border-gray-300 px-4 py-2 text-left">{flight.modelNo}</td>
                             <td class="border border-gray-300 px-4 py-2 text-left">{flight.Capacity}</td>
                             <td class="border border-gray-300 px-4 py-2 text-left">{flight.Departure}</td>
                             <td class="border border-gray-300 px-4 py-2 text-left">{flight.Arrival}</td>
                             {/* <td class="border border-gray-300 px-4 py-2 text-left">{flight.DepartureTime}</td>
                             <td class="border border-gray-300 px-4 py-2 text-left">{flight.ArrivalTime}</td> */}
                             {/* <td class="border border-gray-300 px-4 py-2 text-left">{flight.Remark}</td> */}
                             <td class="border border-gray-300 px-4 py-2 text-left"><img src={flight.flightLogo} style={{width:60, height:50}} alt="" /></td>
                             <td class="border border-gray-300 px-4 py-2 text-left">{flight.createdAt}</td>
                             <td class="border border-gray-300 px-4 py-2 text-left">{flight.updatedAt}</td>
                             
                             <td class="border border-gray-300 px-4 py-2 text-left"> 
                                <button className="px-4 py-2 rounded text-white bg-cyan-600" 
                                        type="button"
                                        onClick={() => updateFlight(flight.flight_id)}
                                        >Update
                                </button>
                             </td>


                             <td class="border border-gray-300 px-4 py-2 text-left">
                                  <button className="px-4 py-2 rounded text-white bg-red-500"       
                                          type="button"
                                          onClick={() => HandleDelete(flight.flight_id)}
                                          >Delete
                                  </button>
                             </td>
                        </tr>
                        ))
                        )
                      }
          </tbody>
     </table>
 </div>

        
    </>
  );
}

export default CreateFlight;
