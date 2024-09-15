import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import skyImage from "../../assets/images/sky.jpg";
import "../../assets/css/Airport.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";


function UpdateAirport() {
     const URL = import.meta.env.VITE_BACKEND_API_URL;
     const [cityID , setCity ] = useState({});
     const airportId = useParams();
     const id = airportId.id;
     // console.log(id)

     
// http://localhost:4000/api/V1/allCity
     const getAllCity = async () =>{
          try {
               const cityData = await axios.get(URL+`/api/V1/allCity`);
               setCity(cityData.data.data);
          } catch (error) {
               console.error(error);
          }
     }

     const [airportData, setAirport] = useState({
          name: "",
          address: "",
          cityId: "",
          type : "",
        });

// http://localhost:4000/api/V1/getAirport/:id
     const airportDataByPk = async () =>{
          try {
               const airportData = await axios.get(URL+`/api/V1/getAirport/${id}`);
               // console.log(airportData);
               setAirport(airportData.data.data);
          } catch (error) {
               console.error(error);
          }
     }
     // console.log('Airport', airportData);

const handleChange = (e) => {
     const data = {...airportData, [e.target.name] : e.target.value};
     setAirport(data);
     // console.log(airportData);
}

// http://localhost:4000/api/V1/updateAirport/:id
const HandleSubmit = async (e) => {
     e.preventDefault();
     try {
          const UpdateUrl = `${URL}/api/V1/updateAirport/${id}`;
          const response = await axios.patch(UpdateUrl, airportData);
          // if(response){
          //      toast.success("Airport Created Successfully");
          // }
     } catch (error) {
          console.error(error);
          toast.error("Error Occurred while updating Airport");
     }
}


     useEffect(() => {
          getAllCity();
          airportDataByPk();
     }, []);

     const notify = () =>{
          toast.success("Airport Updated Successfully!");
     }

  return (
    <>
    <div className="cross bg-zinc-800 w-full h-screen text-white flex justify-center">
        <img className="w-full h-auto brightness-50" src={skyImage} alt="" />
        <div className="absolute w-[80%] mx-auto">
          <div className="w-full mt-10  ">
            <h1 className="airport-h1 text-3xl">Update Airport Data </h1>
            <hr className="w-[100%] h-1 mx-auto bg-gray-100 border-0 rounded md:my-3 dark:bg-[#FAA718]" />

            <form action="" onSubmit={HandleSubmit} >
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
                     value={airportData.name}
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
                     value={airportData.address}
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
                    value={airportData.cityId}
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
                    value={airportData.type}
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
                  className="px-6 py-3 mt-12 bg-[#c57213] ml-3 rounded-md"
                  type="submit"
                  onClick={notify}
                >
                  Update Airport
                </button>
              </div>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
    </>
  )
}

export default UpdateAirport