import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import skyImage from "../../assets/images/sky.jpg";
import "../../assets/css/Airport.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateAirport() {
  const URL = import.meta.env.VITE_BACKEND_API_URL;

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
  }, []);

  return (
    <>
      <div className="cross bg-zinc-800 w-full h-auto text-white flex justify-center">
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
    </>
  );
}

export default CreateAirport;
