import React, { useEffect, useRef, useState } from "react";
import skyImage from "../../assets/images/sky.jpg";
import axios, { all } from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function CreateCity() {
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_BACKEND_API_URL;
  const [name, seName] = useState({
    name: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const HandleChange = (e) => {
    seName({ ...name, [e.target.name]: e.target.value });
    // console.log(name);
  };

  const notify = (e) => {
    toast(e);
  };

  const formRef = useRef(null);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const CityName = name.name;
      // console.log(CityName);
      const isExistCity = await axios.get(`${URL}/api/V1/cityByName/${CityName}`)
      // console.log("City Exist : ", isExistCity.data.data)
      if (isExistCity.data.data.length > 0) {
        toast.error("City already exists");
        return;
      }
      const response = await axios.post(`${URL}/api/V1/createCity`, { name });
      formRef.current.reset();
      if (response) {
        toast.success("City Created Successfully");
      }
      // console.log("data inserted ", response);
    } catch (error) {
      console.error(error);
    }
  };

// Load all City 
const [allCityData , setAllCityData ] = useState([]);
const LoadCity = async() =>{
  try {
    const city = await axios.get(URL + "/api/V1/allCity");
    setAllCityData(city.data.data);
  } catch (error) {
    console.error(error);
  }
}

useEffect(() => {
// LoadCity();
},[])

// get all cities Filtered Cities list from database..
const [FilterCity, setFilteredCity] = useState({
  name: "",
})

const [FilterCityData ,setFilterCityData ] = useState([]);
const getFilterCity = (e) =>{
  setFilteredCity({...FilterCity , [e.target.name] : e.target.value})
  fetchAllFilteredCities();
}
// console.log(allCityData)

const fetchAllFilteredCities = async() =>{
  try {
    const response = await axios.get(URL + "/api/V1/allCity/?name=" + FilterCity.name)
    console.log(response)
    setFilterCityData(response.data.data);
  } catch (error) {
    console.log(error);
  }
}
const HandleEdit = (index) =>{
  navigate(`/updateCity/${index}` );
}

// console.log(allCityData);
  return (
    <div className="bg-zinc-800 h-screen w-full text-white">
      {/* <h1 className="text-2xl">City </h1> */}
      <div className="bg-zinc-800 h-screen w-full text-white flex justify-center">
        <img
          className="relative w-full h-auto brightness-50"
          src={skyImage}
          alt=""
        />
        <div className="absolute w-[95%]">
          <h1 className="px-8 pt-5 text-2xl font-semibold"> Create City </h1>
          <hr className="w-[95%] h-1 mx-auto bg-gray-100 border-0 rounded md:my-3 dark:bg-[#FAA718]" />
          <div className="Search-form w-[95%] mx-auto border h-80 ">
            <h4 className="w-full p-2 bg-[#5A7FA1] text-lg">
              Enter City Name{" "}
            </h4>
            <form onSubmit={handleSubmit} ref={formRef}>
              <div className="flex justify-between items-center w-[70%]">
                <label className="text-lg font-mono ml-12 mt-3 " htmlFor="">
                  Add City Name
                </label>
                {/* <label className="text-sm font-mono mr-[36%] mt-3" htmlFor="">Flight No</label> */}
              </div>

              <div className="flex justify-between items-center w-[70%]">
                <input
                  className="font-serif text-lg ml-10 rounded w-96 p-4 mt-1 text-black outline-none bg-zinc-300 border"
                  type="text"
                  placeholder="Example : Jamshedpur"
                  name="name"
                  onChange={HandleChange}
                />

                {/* <input className="font-serif text-xs ml-10 rounded w-96 p-3 mt-1 text-black outline-none bg-zinc-300 border" type="text" placeholder="Example : 200" /> */}
                <button
                  className="px-20 py-4 text-lg font-bold bg-[#c58413]"
                  type="submit"
                  onClick={notify}
                >
                  ADD CITY
                </button>
                <ToastContainer />
              </div>
              {/* <div className="flex flex-col ml-10 mt-5">
                <label className="ml-2 font-mono" htmlFor="">Date</label>
                <input className="w-[29%] text-black p-2 rounded-md text-sm outline-none bg-zinc-300 border" placeholder="Enter Flight Date" type="Date" />
              </div> */}
            </form>
          </div>
        </div>
      </div>
                
      <div className="w-full h-screen bg-slate-300">
        <div className="w-[95%] mx-auto flex justify-center">
          <div>
            <h1 className="text-3xl font-semibold mt-10 text-black">All City</h1>
            <hr className="h-1 mx-auto bg-gray-100 border-0 rounded md:my-3 dark:bg-[#FAA718]" />
          </div>
        </div>
        <div className="px-6 py-2 ">
          <button className="bg-blue-800 px-6 py-2 rounded text-white" onClick={LoadCity} >
            CLick to load
          </button>

          <input type="search" placeholder="Search Airport..." 
             class="w-[60%] px-4 ml-5 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"
              onChange={getFilterCity}
              name="name"
             />
        </div>

{/* all City data in table  */}

       <table class="min-w-full table-auto border-collapse border border-gray-300">
          <thead class="bg-gray-200 text-black">
               <tr>
                    <th class="border border-gray-300 px-4 py-2 text-left">ID</th>
                    <th class="border border-gray-300 px-4 py-2 text-left">City Name</th>
                    <th class="border border-gray-300 px-4 py-2 text-left">City ID</th>
                    <th class="border border-gray-300 px-4 py-2 text-left">Created At</th>
                    <th class="border border-gray-300 px-4 py-2 text-left">Updated At</th>
                    <th class="border border-gray-300 px-4 py-2 text-left">Edit</th>
                    <th class="border border-gray-300 px-4 py-2 text-left">Remove</th>
               </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
               {/* <!-- Rows here --> */}
                
                {FilterCityData && FilterCityData.length > 0 
                ?
                (
                  FilterCityData.length > 0 && FilterCityData
                  .sort((a,b) => a.name.localeCompare(b.name))
                  .map((cityData , index) =>(
                           <tr className="hover:bg-gray-100 text-black"> 
                           <td class="border border-gray-300 px-4 py-2 text-left">{index + 1}</td>
                           <td class="border border-gray-300 px-4 py-2 text-left">{cityData.name}</td>
                           <td class="border border-gray-300 px-4 py-2 text-left">{cityData.id}</td>
                           <td class="border border-gray-300 px-4 py-2 text-left">{cityData.createdAt}</td>
                           <td class="border border-gray-300 px-4 py-2 text-left">{cityData.updatedAt}</td>
                          <td class="border border-gray-300 px-4 py-2 text-left"><button className="px-4 py-2 rounded text-white bg-blue-500" type="button">EDIT</button></td>
                           <td class="border border-gray-300 px-4 py-2 text-left"><button className="px-4 py-2 rounded text-white bg-red-500" type="button">Delete</button></td> 
                    </tr> 
                  ))
                )
                :
                (
                    allCityData.length > 0 && allCityData
                  .sort((a,b) => a.name.localeCompare(b.name))
                  .map((cityData , index) =>(
                           <tr className="hover:bg-gray-100 text-black"> 
                           <td class="border border-gray-300 px-4 py-2 text-left">{index + 1}</td>
                           <td class="border border-gray-300 px-4 py-2 text-left">{cityData.name}</td>
                           <td class="border border-gray-300 px-4 py-2 text-left">{cityData.id}</td>
                           <td class="border border-gray-300 px-4 py-2 text-left">{cityData.createdAt}</td>
                           <td class="border border-gray-300 px-4 py-2 text-left">{cityData.updatedAt}</td>
                          
                          <td class="border border-gray-300 px-4 py-2 text-left">
                            <button className="px-4 py-2 rounded text-white bg-blue-500" 
                                    type="button"
                                    onClick={() => HandleEdit(cityData.id)}
                                    >EDIT
                            </button>
                          </td>

                           <td class="border border-gray-300 px-4 py-2 text-left"><button className="px-4 py-2 rounded text-white bg-red-500" type="button">Delete</button></td> 
                    </tr> 
                  ))
                 )}                 
          </tbody>
     </table>
 </div>
    </div>
  );
}

export default CreateCity;
