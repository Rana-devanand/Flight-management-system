import React, { useEffect, useState } from "react";
import flight from "../assets/images/flight-3.jpg";
import destination from "../assets/images/destination.png";
import map from "../assets/images/map.jpg";

import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css"; // Import a theme (optional)
import "flatpickr/dist/flatpickr.css";
import { useNavigate } from "react-router-dom";
// import "../assets/css/HomeStyle.css";
import { RiFlightTakeoffFill } from "react-icons/ri";

import { FaLocationDot } from "react-icons/fa6";
import { IoSearchSharp } from "react-icons/io5";
import { MdCompareArrows } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import Footer from "./Footer";

import FilterFlight from "./FilterFlight";
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
  const URL = import.meta.env.VITE_BACKEND_API_URL;

  //   const [query, setQuery] = useState("");    // for Where from
  //   const [cities, setCities] = useState([]);  // for Where from

  //   const fetchCities = async (query) => {
  //     if (query.length > 0) {
  //       try {
  //         const response = await axios.get(URL +`/api/v1/allCity?name=${query}`
  //         );
  //         const data = await response.data.data;
  //         setCities(data);
  //       } catch (error) {
  //         console.error("Error fetching cities:", error);
  //       }
  //     } else {
  //       setCities([]);
  //     }
  //   };

  //   const [formData , setFormData] = useState({
  //     Departure : "",
  //     Arrival : "",
  //     Date : "",
  //   })

  //   const handleInputChange = (e) => {
  // setQuery(e.target.value);
  //     fetchCities(e.target.value);
  //     setFormData({...formData, [e.target.name]: e.target.value});
  //   };

  // console.log(formData);

  //   const [selectedItem, setSelectedItem] = useState(null);
  //   const handleSelect = (item) => {
  //     setSelectedItem(item);
  //   };

  //   // For Where to
  //   const [whereToQuery, setWhereToQuery] = useState("");
  //   const [whereToCities, setWhereToCities] = useState([]);

  //   const handleWhereToInputChange = (e) => {
  //     setWhereToQuery(e.target.value);
  //     getWhereToCities(e.target.value);
  //   };

  //   const getWhereToCities = async (whereToQuery) => {
  //     if (whereToQuery.length > 0) {
  //       try {
  //         const response = await axios.get(URL+ `/api/v1/allCity?name=${whereToQuery}`
  //         );
  //         const data = await response.data.data;
  //         setWhereToCities(data);
  //       } catch (error) {
  //         console.error("Error fetching cities:", error);
  //       }
  //     } else {
  //       setWhereToCities([]);
  //     }
  //   }
  //   const [selectedWhereToItem, setSelectedWhereToItem] = useState(null);
  //   const handleWhereToSelect = (item) => {
  //     setSelectedWhereToItem(item);
  //   };

  //   // OnCross Click data should be cleared.
  //   const WhereToDataClear = () => {
  //     setSelectedItem("");
  //   }
  //   const whereFromDataClear = () => {
  //     setSelectedWhereToItem("");
  //   }

  const navigate = useNavigate();
  const [Cities, setCities] = useState({});
  const getAllCity = async () => {
    try {
      const response = await axios.get(URL + `/api/V1/allCity`);
      // console.log(response.data.data);
      setCities(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const [formData, setData] = useState({
    Departure: "",
    Arrival: "",
    Date: "",
  });
  const handleInputChange = (e) => {
    const chooseFilter = { ...formData, [e.target.name]: e.target.value };
    console.log(formData)
    setData(chooseFilter);
  };


  const chooseDate = (selectDate) => {
    const myDate = selectDate[0];
    const dateObject = new Date(myDate);

    // Format the date using local time (to avoid UTC conversion)
    let year = dateObject.getFullYear();
    let month = (dateObject.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
    let day = dateObject.getDate().toString().padStart(2, "0");

    // Create the formatted date string in YYYY-MM-DD format
    let formattedDate = `${year}-${month}-${day}`;
    
    setData({...formData, Date: formattedDate + "T00:00:00.000Z"});
};

  useEffect(() => {
    getAllCity();
  }, []);

  const [filterFlight, setFilterFlightData] = useState({});
  // console.log(formData)

 // http://localhost:4000/api/V1/filterFlight
  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${URL}/api/V1/filterFlight`;
      const response = await axios.get(url, {
        params: formData,
      });

      setFilterFlightData(response.data.data);
      console.log("filter flight data : ", response.data.data);
    } catch (error) {
      console.error(" Couldn't get flight detail from server", error);
    }
  };
  // console.log(filterFlight);
  if (filterFlight && filterFlight.length >= 0) {
    navigate(`/filterFLights`, { state: { user: filterFlight }});
    // { state: { user: data } }
  }


  // Date
  const [date, setDate] = useState(null);
  const todayDate = new Date();
  const onlyDate = todayDate.toISOString().slice(0, 10);

  return (
    <>
      <div className="input-container relative w-full h-screen bg-gray-500 flex justify-center items-center ">
        <img
          className="flex flex-col justify-center items-center shadow-lg w-full mt-16 opacity-80"
          src={map}
          alt=""
        />
        <h1 className="absolute text-7xl font-black top-28 w-[40%] text-center mx-auto text-[#0d6aa0]">
          Its more than just a trip
        </h1>

        {/* <div className="absolute border border-blue-600 w-[80%] h-32 bg-[#E9ECEE]  ">
          <form
            action=""
            onSubmit={HandleSubmit}
            className="rounded-md  "
          >
            <select
              className="p-3 py-4 mt-10 ml-6 rounded-md mr-5 w-[32%] outline-none overflow-y-auto text-lg"
              type="text"
              // value={selectedItem}
              onChange={handleInputChange}
              placeholder="Where From"
              name="Departure"
            >
              <option className="bg-gray-100 text-gray-500" disabled selected>
                Where From{" "}
              </option>
              {Cities.length > 0 &&
                Cities.sort((a, b) => a.name.localeCompare(b.name)) // Sort by city name alphabetically
                  .map((data, index) => (
                    <option
                      className="bg-gray-50 hover:bg-blue-500 font-serif text-lg"
                      key={index}
                      value={data.name}
                    >
                      {data.name}
                    </option>
                  ))}
            </select>


            <select
              className="p-3 py-4 mt-10 ml-3 rounded-md mr-5 w-[32%] outline-none overflow-y-auto text-lg"
              type="text"
              // value={selectedWhereToItem}
              onChange={handleInputChange}
              placeholder="Where to"
              name="Arrival"
            >
              <option className="bg-gray-100 text-gray-500" disabled selected>
                Where To{" "}
              </option>
              {Cities.length > 0 &&
                Cities.sort((a, b) => a.name.localeCompare(b.name)) // Sort by city name alphabetically
                  .map((data, index) => (
                    <option
                      className="bg-gray-50 hover:bg-blue-500 font-serif text-lg"
                      key={index}
                      value={data.name}
                    >
                      {data.name}
                    </option>
                  ))}
            </select>
            <Flatpickr
              value={date}
              onChange={chooseDate}
              options={{
                dateFormat: "Y-m-d",
                altInput: true,
                altFormat: "F j, Y",
                minDate: `${onlyDate}`,
                maxDate: "",
              }}
              placeholder="Select a date"
              className="custom-flatpickr p-3 py-4 mt-10  rounded-md mr-5 w-[27%] outline-none text-lg"
              name="Date"
            />

            <div className="search flex justify-center items-center mt-6">
              <button
                className="bg-[#7FBFF0] px-8 py-2 text-xl rounded-full font-semibold border text-[#0d6aa0] hover:bg-[#43aae6] hover:text-white"
                // type="submit"
              >
                Search
              </button>
            </div>
          </form>
        </div> */}

        <div className="absolute flex w-[80%] mt-36 mx-auto rounded-md ">
          <div className="w-[27%]">
            <select
              name="Departure"
              id=""
              className="w-[100%] px-5 py-3 outline-none appearance-none  border border-[#b9b9b9]"
              onChange={handleInputChange}
              required
            >
              <option value="" defaultChecked>
                From Where
              </option>
              {Cities &&
                Cities.length > 0 &&
                Cities.sort((a, b) => a.name.localeCompare(b.name)).map(
                  (city) => <option value={city.name}>{city.name}</option>
                )}
            </select>
          </div>

          <div className=" w-[27%] border border-[#b9b9b9]">
            {/* <label htmlFor="" className="text-xl">
                Arrival city{" "}
              </label> */}
            <select
              name="Arrival"
              id=""
              className="w-[100%]  px-5 py-3 outline-none appearance-none"
              onChange={handleInputChange}
              required
            >
              <option value="" defaultChecked>
                From to
              </option>
              {Cities &&
                Cities.length > 0 &&
                Cities.sort((a, b) => a.name.localeCompare(b.name)).map(
                  (city) => (
                    <option value={city.name} className="overflow-scroll">
                      {city.name}
                    </option>
                  )
                )}
            </select>
          </div>

          <div className="custom-flatpickr w-[27%] outline-none border border-[#b9b9b9]">
            <Flatpickr
              // value={date}
              onChange={chooseDate}
              options={{
                dateFormat: "Y-m-d",
                altInput: true,
                altFormat: "F j, Y",
                // minDate: `${onlyDate}`,
                maxDate: "",
              }}
              placeholder="Date"
              className="custom-flatpickr pl-4 py-3 w-[100%] outline-none"
              name="Date"
              required
            />
          </div>

          <div className="w-[20%] flex justify-center items-center border border-[#E1E3E6]">
            <button className="w-full h-11 bg-blue-600 text-lg text-white"
                    onClick={HandleSubmit}
                  >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* 86C1ED */}

      <div className="explore input-container relative w-full h-screen bg-[#D4D9DF] flex justify-center items-center flex-col ">
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
