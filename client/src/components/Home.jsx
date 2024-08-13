import React, { useState } from "react";
import flight from "../assets/images/flight-3.jpg";
import destination from "../assets/images/destination.png";

import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css'; // Import a theme (optional)
import 'flatpickr/dist/flatpickr.css';

import "../assets/css/HomeStyle.css";
import { FaLocationDot } from "react-icons/fa6";
import { IoSearchSharp } from "react-icons/io5";
import { MdCompareArrows } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import Footer from "./Footer";
function Home() {
  const data = [
    {
      id: 1,
      name: "Delhi",
      country: "India",
      image:
        "https://www.holidify.com/images/cmsuploads/compressed/5621259188_e74d63cb05_b_20180302140149.jpg",
      airports: 1000,
    },
    {
      id: 2,
      name: "Mumbai",
      country: "India",
      image:
        "https://www.godigit.com/content/dam/godigit/directportal/en/contenthm/gateway-of-india.jpg",
      airports: 2000,
    },
    {
      id: 3,
      name: "Bangalore",
      country: "India",
      image:
        "https://www.holidify.com/images/cmsuploads/compressed/shutterstock_154851008_20200123162547_20200123162603.png",
      airports: 3000,
    },
    {
      id: 4,
      name: "Kolkata",
      country: "India",
      image:
        "https://www.theindianpanorama.news/wp-content/uploads/2022/02/Travel-678x381.jpg",
      airports: 4000,
    },
    {
      id: 5,
      name: "Chennai",
      country: "India",
      image:
        "https://www.shutterstock.com/image-photo/beautiful-view-valluvar-kottamauditorium-monument-600nw-1763868740.jpg",
      airports: 5000,
    },
    {
      id: 6,
      name: "Hyderabad",
      country: "India",
      image:
        "https://images.herzindagi.info/image/2022/Oct/places-to-visit.jpg",
      airports: 6000,
    },
    {
      id: 7,
      name: "Pune",
      country: "India",
      image:
        "https://www.tourmyindia.com/blog//wp-content/uploads/2015/08/chaturshringi-temple.jpg",
      airports: 7000,
    },
    {
      id: 4,
      name: "Kolkata",
      country: "India",
      image:
        "https://www.theindianpanorama.news/wp-content/uploads/2022/02/Travel-678x381.jpg",
      airports: 4000,
    },
    {
      id: 5,
      name: "Chennai",
      country: "India",
      image:
        "https://www.shutterstock.com/image-photo/beautiful-view-valluvar-kottamauditorium-monument-600nw-1763868740.jpg",
      airports: 5000,
    },
    {
      id: 6,
      name: "Hyderabad",
      country: "India",
      image:
        "https://images.herzindagi.info/image/2022/Oct/places-to-visit.jpg",
      airports: 6000,
    },
    {
      id: 7,
      name: "Pune",
      country: "India",
      image:
        "https://www.tourmyindia.com/blog//wp-content/uploads/2015/08/chaturshringi-temple.jpg",
      airports: 7000,
    },
  ];

  // To get the City details from the database
  const [query, setQuery] = useState("");    // for Where from
  const [cities, setCities] = useState([]);  // for Where from

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    fetchCities(e.target.value);
  };

  const fetchCities = async (query) => {
    if (query.length > 0) {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/allCity?name=${query}`
        );
        const data = await response.data.data;
        setCities(data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    } else {
      setCities([]);
    }
  };

  const [selectedItem, setSelectedItem] = useState(null);
  const handleSelect = (item) => {
    setSelectedItem(item);
  };

  // For Where to 
  const [whereToQuery, setWhereToQuery] = useState("");
  const [whereToCities, setWhereToCities] = useState([]);

  const handleWhereToInputChange = (e) => {
    setWhereToQuery(e.target.value);
    getWhereToCities(e.target.value);
  };

  const getWhereToCities = async (whereToQuery) => {
    if (whereToQuery.length > 0) {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/allCity?name=${whereToQuery}`
        );
        const data = await response.data.data;
        setWhereToCities(data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    } else {
      setWhereToCities([]);
    }
  }
  const [selectedWhereToItem, setSelectedWhereToItem] = useState(null);
  const handleWhereToSelect = (item) => {
    setSelectedWhereToItem(item);
  };

  // OnCross Click data should be cleared.
  const WhereToDataClear = ()=>{
    setSelectedWhereToItem("");
  }
  const whereFromDataClear = ()=>{
    setSelectedItem("");
  }
// Date 
  const [date, setDate] = useState(null);


  return (
    <>
      <div className="input-container relative w-full h-screen bg-gray-500 flex justify-center items-center ">
        <img
          className="flex flex-col justify-center items-center shadow-lg shadow-black"
          src={flight}
          alt=""
        />

        <form
          action=""
          className="absolute top-0 w-3/4 h-36 bg-[#7FBFF0] border rounded-md mt-10 "
        >
          <input
            className="p-3 py-4 mt-10 ml-6 rounded-md mr-5 w-[32%] outline-none"
            type="text"
            value={selectedItem}
            onChange={handleInputChange}
            placeholder="Where From"
          />
          <ul className={`cityList absolute border ml-10 w-80 mt-1 left-0 outline-none overflow-y-scroll ${query.length > 0 && setCities.length > 0 ? "h-48" : ""} ${selectedItem ? "hidden" : ""} `}>


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

          {/* <MdCompareArrows /> */}
          {query.length > 0  ? (<RxCross1 onClick={whereFromDataClear} className="cursor-pointer"/>) : (null)}

          {query.length > 0 ? (<RxCross1 onClick={WhereToDataClear} className="rightCross -ml-[35%]  cursor-pointer"/>) : (null)}



          <input
            className="p-3 py-4 mt-10 ml-3 rounded-md mr-3 w-[32%] outline-none" 
            type="text" 
            value={selectedWhereToItem}
            onChange={handleWhereToInputChange}
            placeholder="Where to"
          />
          <ul className={`cityList absolute border left-[39%] w-80 mt-1  outline-none overflow-y-scroll ${whereToQuery.length > 0 ? "h-48" : ""} ${selectedWhereToItem ? "hidden" : ""} `}>

            {whereToCities.map((city, index) => (
              <li
                className="bg-[#ffffff50] py-2 font-semibold cursor-pointer p-3 "
                onClick={() => handleWhereToSelect(city.name)}
                key={index}
              >
                {city.name}
              </li>
            ))}
          </ul>

          <Flatpickr
           value={date}
           onChange={([selectedDate]) => setDate(selectedDate)}
           options={{
             dateFormat: 'Y-m-d',
             altInput: true,
             altFormat: 'F j, Y',
             minDate: '2024-08-15',
             maxDate: '2024-08-31',
           }}
           placeholder="Select a date"
           className="custom-flatpickr p-3 py-4 mt-10  rounded-md mr-5 w-[28%] outline-none"
         />

          <div className="search flex justify-center items-center mt-6">
            <button
              className="bg-[#7FBFF0] px-8 py-2 text-xl rounded-full font-semibold border text-[#0d6aa0] hover:bg-[#43aae6] hover:text-white"
              type="submit"
            >
              Search
            </button>
          </div>
        </form>

        <h1 className="absolute text-6xl font-black pb-32 text-[#0d6aa0]">
          Welcome to India
        </h1>
      </div>

      {/* 86C1ED */}

      <div className="explore input-container relative w-full h-screen bg-blue-200 flex justify-center items-center flex-col ">
        <img
          className="flex w-[60%]  flex-col justify-center items-center"
          src={destination}
          alt=""
        />
        <h1 className="absolute text-6xl pb-32 text-black top-10 font-medium">
          Popular destinations :
        </h1>

        <button className="px-9 py-3 rounded-full text-xl font-semibold bg-red-600 mt-28 text-white">
          Explore more
          {/* <MdKeyboardDoubleArrowRight /> */}
        </button>
      </div>
      {/* 86C1ED */}
      <div className="bg-[#86C1ED]  w-full h-auto flex justify-center pb-10">
        <div className="w-[80%] flex flex-wrap gap-10  py-6 ">
          <div className="absolute">
            <h1 className=" font-normal text-2xl">
              Popular destination in India
            </h1>
          </div>
          {data.map((product) => (
            <div className="w-36 h-24 mt-10 ">
              <img
                className="w-full h-full rounded-md"
                src={product.image}
                alt=""
              />
              <div className="flex justify-center ">
                <h1 className="">{product.name}</h1>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
