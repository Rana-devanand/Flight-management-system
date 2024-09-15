import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import skyImage from "../../assets/images/sky.jpg";
import "../../assets/css/Airport.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function CreateAirport() {
  const URL = import.meta.env.VITE_BACKEND_API_URL;
  const navigate = useNavigate();
  const [value, setValue] = useState({
    name: "",
    address: "",
    cityId: "",
    type : "",
  });

  const [cityID, setCity] = useState([]);

  const getCityID = async () => {
    try {
      const cityId = await axios.get(URL + "/api/V1/allCity");
      setCity(cityId.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
    //     console.log(value);
  };

  const formRef = useRef(null);
  const notify = (e) => {
     toast(e);
   };

   
  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(URL + `/api/V1/createAirport`, value);
      if(response.status === 200)
      {
          toast.success("Airport Created Successfully");
      }
      else{
          toast.error("Error Occurred while creating Airport");
      }
      formRef.current.reset();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCityID();
    // getAllAirports();
  }, []);

// Get all Airports from the database;
const [allAirports , setAllAirports] = useState([]);

const getAllAirports = async()=>{
  try {
    const airports = await axios.get(URL + "/api/V1/allAirports");
    setAllAirports(airports.data.data);
    // console.log(airports);
  } catch (error) {
    console.log(error);
  }
} 

const [filterAirport , setFilterAirport] = useState({
  name : "",
});

const [filterAirportData , setFilterAirportData] = useState([]);

const getFilterAirports = (e) =>{
  setFilterAirport({ ...filterAirport ,[e.target.name] : e.target.value });
  AirportFilter();
  // console.log(filterAirport.name);
}

const AirportFilter = async ()=> {
  try {
    const response = await axios.get(URL + "/api/V1/allAirports/?name=" + filterAirport.name);
    setFilterAirportData(response.data.data);
    // console.log(response);
  } catch (error) {
    console.log(error);
  }
}

const HandleDelete = async (airportId) =>{
  try {
    const response = await axios.delete(URL+`/api/V1/deleteAirport/${airportId}`);
    if(response.status === 200) {
      toast.success("Airport deleted successfully");
      getAllAirports();
    }
  } catch (error) {
    console.log(error);
  }
}

// Handle Edit Airport Data
const HandleEdit = (index) =>{
  navigate(`/updateAirport/${index}`)
}

  return (
    <>
      <div className="cross bg-zinc-800 w-full h-screen text-white flex justify-center">
        <img className="w-full h-auto brightness-50" src={skyImage} alt="" />
        <div className="absolute w-[80%] mx-auto">
          <div className="w-full mt-10  ">
            <h1 className="airport-h1 text-3xl">Add Airport </h1>
            <hr className="w-[100%] h-1 mx-auto bg-gray-100 border-0 rounded md:my-3 dark:bg-[#FAA718]" />
            <form action="" onSubmit={HandleSubmit} ref={formRef}>
              <div className="flex flex-wrap justify-between gap-5">
                <div className=" flex flex-col w-[30%]">
                  <label htmlFor="" className="font-semibold text-lg">
                    Enter Airport Name{" "}
                  </label>
                  <input
                    className=" p-3  rounded bg-zinc-300 text-black outline-none border "
                    placeholder="Example : AA or American Airline"
                    type="text"
                    name="name"
                    //  value={selected}
                    onChange={handleChange}
                  />
                </div>
                <div className=" flex flex-col w-[30%]">
                  <label htmlFor="" className="font-semibold text-lg">
                    Enter Airport Address{" "}
                  </label>
                  <input
                    className="p-3 rounded bg-zinc-300 text-black outline-none border "
                    placeholder="Example : Mumbai, Maharashtra"
                    type="text"
                    name="address"
                    //  value={selected}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col w-[30%]">
                  <label htmlFor="" className="font-semibold text-lg">
                    Enter Airport City{" "}
                  </label>
                  <select
                    id="countries"
                    className="p-3  rounded bg-zinc-300 text-black outline-none border gap-5"
                    onChange={handleChange}
                    name="cityId"
                  >
                    <option selected>Choose a City</option>
                    {cityID.length > 0 &&
                      cityID
                        .sort((a, b) => a.name.localeCompare(b.name)) // Sort by city name alphabetically
                        .map((data, index) => (
                          <option key={index} value={data.id}>
                            {data.name}
                          </option>
                        ))}
                  </select>
                </div>
               
                <div className="flex flex-col w-[30%]">
                  <label htmlFor="" className="font-semibold text-lg">
                    Enter Airport Type{" "}
                  </label>
                  <select
                    id="countries"
                    className="p-3  rounded bg-zinc-300 text-black outline-none border gap-5"
                    onChange={handleChange}
                    name="type"
                  >
                    <option selected>Choose airport type  </option>
                    <option value="International">International Airport</option>
                    <option value="Domestic">Domestic Airport</option>
                    <option value="Commercial">Commercial Airport</option>
                    <option value="Civil">Civil Enclave</option>

                  </select>
                </div>

              </div>
              <div className="flex justify-center">
                <button
                  className="px-6 py-3 mt-12 bg-[#c58413] ml-3 rounded-md"
                  type="submit"
                  onClick={notify}
                >
                  Add Airport
                </button>
              </div>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
              
      <div className="w-full h-screen bg-slate-300">
      <div className="w-[95%] mx-auto flex justify-center">
          <div>
            <h1 className="text-3xl font-semibold mt-10">All Airports</h1>
            <hr className="h-1 mx-auto bg-gray-100 border-0 rounded md:my-3 dark:bg-[#FAA718]" />
          </div>
        </div>

        <div className="flex justify-start gap-10 px-6 py-2 ">
          <button className="bg-blue-800 px-6 py-2 rounded text-white" onClick={getAllAirports} >
            CLick to load
          </button>

          <input type="search" placeholder="Search Airport..." 
             class="w-[60%] px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              onChange={getFilterAirports}
              name="name"
             />
        </div>

        <table class="min-w-full table-auto border-collapse border border-gray-300">
          <thead class="bg-gray-200">
               <tr>
                    <th class="border border-gray-300 px-4 py-2 text-left">ID</th>
                    <th class="border border-gray-300 px-4 py-2 text-left">Airport Name</th>
                    <th class="border border-gray-300 px-4 py-2 text-left">Airport Address</th>
                    <th class="border border-gray-300 px-4 py-2 text-left">City Id</th>
                    <th class="border border-gray-300 px-4 py-2 text-left">Airport Type </th>
                    <th class="border border-gray-300 px-4 py-2 text-left">Created At</th>
                    <th class="border border-gray-300 px-4 py-2 text-left">Updated At</th>
                    <th class="border border-gray-300 px-4 py-2 text-left">Edit</th>
                    <th class="border border-gray-300 px-4 py-2 text-left">Remove</th>
               </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
               {/* <!-- Rows here --> */}
              
                  {filterAirportData && filterAirportData.length > 0 
                  ?
                  (
                    filterAirportData.map((airports , index) =>(
                    <tr class="hover:bg-gray-100"> 
                     <td class="border border-gray-300 px-4 py-2 text-left">{index + 1}</td>
                     <td class="border border-gray-300 px-4 py-2 text-left">{airports.name}</td>
                     <td class="border border-gray-300 px-4 py-2 text-left">{airports.address}</td>
                     <td class="border border-gray-300 px-4 py-2 text-left">{airports.cityId}</td>
                     <td class="border border-gray-300 px-4 py-2 text-left">{airports.type}</td>
                     <td class="border border-gray-300 px-4 py-2 text-left">{airports.createdAt}</td>
                     <td class="border border-gray-300 px-4 py-2 text-left">{airports.updatedAt}</td>
                     <td class="border border-gray-300 px-4 py-2 text-left"> <button className="px-4 py-2 rounded text-white bg-blue-700" type="button">EDIT</button></td>
                     <td class="border border-gray-300 px-4 py-2 text-left"><button className="px-4 py-2 rounded text-white bg-red-500" type="button">Delete</button></td>
                </tr>
                )))
                  :
                  (
                    allAirports.map((airports , index) =>(
                      <tr class="hover:bg-gray-100"> 
                       <td class="border border-gray-300 px-4 py-2 text-left">{index + 1}</td>
                       <td class="border border-gray-300 px-4 py-2 text-left">{airports.name}</td>
                       <td class="border border-gray-300 px-4 py-2 text-left">{airports.address}</td>
                       <td class="border border-gray-300 px-4 py-2 text-left">{airports.cityId}</td>
                       <td class="border border-gray-300 px-4 py-2 text-left">{airports.type}</td>
                       <td class="border border-gray-300 px-4 py-2 text-left">{airports.createdAt}</td>
                       <td class="border border-gray-300 px-4 py-2 text-left">{airports.updatedAt}</td>
                       
                       <td class="border border-gray-300 px-4 py-2 text-left"> 
                            <button className="px-4 py-2 rounded text-white bg-cyan-600"      
                                    type="button"
                                    onClick={() => HandleEdit(airports.id)}
                                    >Update
                            </button>
                        </td>
                       
                       
                       <td class="border border-gray-300 px-4 py-2 text-left">
                        <button className="px-4 py-2 rounded text-white bg-red-500" 
                                type="button"
                                onClick={() => HandleDelete(airports.id)}>Delete
                        </button>
                        </td>
                  </tr>
                  ))
                  )}
          </tbody>
     </table>

      </div>

    </>
  );
}

export default CreateAirport;
