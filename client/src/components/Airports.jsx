import React, { useState } from "react";
import RunwayImage from "../assets/images/Windsock.jpg";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import AirportDetails from "./AirportDetails";
import Footer from "./Footer";
import skyImage from "../assets/images/sky.jpg";
import { RxCross1 } from "react-icons/rx";
import "../assets/css/Airport.css";



function Airports() {
  // const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [cities, setCities] = useState([]);

  const handleChange = (e) => {
    setQuery(e.target.value);
    fetchCities(e.target.value);
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
  };
  const [selected, selectedCity] = useState(null);
  const handleSelect = (city) => {
    selectedCity(city);
  }

  // http://localhost:3000/airport/getCities
  const fetchCities = async (query) => {
    const URL = import.meta.env.VITE_BACKEND_API_URL;
    if (query.length > 0) {
      try {
        const response = await axios.get(URL + `/api/V1/allCity?name=${query}`);
        const data = await response.data.data;
        setCities(data);
      } catch (error) {
        console.error("error getting cities", error);
      }
    }
    else {
      setCities([]);
    }
  };

  const ClearSelectedData = () => {
    selectedCity(null);
    selected("");
    setQuery("");
    setCities([]);
  }


  return (
    <>
      <div className="cross bg-zinc-800 w-full h-auto text-white flex justify-center">
        <img
          className="w-full h-auto brightness-50"
          src={skyImage}
          alt=""
        />
        <div className="absolute flex w-[80%] mx-auto">
          <div className="w-full mt-10 ml-16 ">
            <h1 className="airport-h1 text-3xl">Airport Conditions</h1>
            <h1 className="text-sm mt-2">Enter Airport Name </h1>

            <form action="" onSubmit={HandleSubmit}>
              <input
                className="w-[40%] p-2 rounded bg-zinc-300 text-black outline-none border "
                placeholder="Example : AA or American Airline"
                type="text"
                name="airport"
                value={selected}
                onChange={handleChange}

              />
              {selected ? (<RxCross1 onClick={ClearSelectedData} className=" cross cursor-pointer" />) : ("")}
              <ul className={`absolute border ml-[6%]  w-[35%] mt-1 left-0 outline-none overflow-y-scroll
              ${query.length > 0 && setCities.length > 0 ? "h-48" : ""} ${selected ? "hidden" : ""}`
              }>
                {cities.map((city, index) => (
                  <li
                    className="bg-[#ffffff50] py-2 font-semibold cursor-pointer p-3 "
                    onClick={() => handleSelect(city.name)}
                    key={index}
                  >
                    {city.name}
                  </li>
                ))}
              </ul>

              <br />


              {/* <button
                className="relative px-16 py-2 ml-[45%] bg-[#FAA718] bottom-10"
                onClick={() => {
                }}
              >
                Search
              </button> */}
              {/* <Link className="relative px-16 py-2 ml-[45%] bg-[#FAA718] bottom-10"
              to={`/Airports/${selected}`}

            >
              Search
            </Link> */}
            </form>
            {/* <hr className="w-[100%] h-1 mx-auto bg-gray-100 border-0 rounded md:my-3 dark:bg-[#FAA718]" /> */}

            {selected ? <AirportDetails myCity={selected} /> : (null)}

          </div>
        </div>

      </div >
      <Footer />
    </>
  );
}

export default Airports;
