import React, { useState } from "react";
import HotelImage from "../assets/images/hotels.jpg";
import "../assets/css/hotels.css";

import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css"; // Import a theme (optional)
import "flatpickr/dist/flatpickr.css";
import Footer from "./Footer"

// Date
// const currentDate = new Date().toISOString();
// const onlyDate = currentDate.split('T')[0];

const currentDate = new Date().toISOString(); // e.g., "2024-08-13T08:15:30.000Z"
const dateObj = new Date(currentDate);

const options = { year: 'numeric', month: 'long', day: 'numeric' };
const formattedDate = dateObj.toLocaleDateString('en-US', options);

function Travel() {

  const CityHostels = [
    {
      name: 'Hotel Prestige',
      image: 'https://images.pexels.com/photos/2507010/pexels-photo-2507010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      description: 'A luxurious hotel located in the heart of Paris, offering a unique blend of elegance, comfort, and tranquility.',
      rating: 3,
      price: "15,000",
      stars: "★★★",
      location: 'Paris, France',
      amenities: ['Breakfast included', 'Free Wi-Fi', 'Private bathroom', '24-hour front desk', 'Concierge service'],
      services: ['Room service', '24-hour reception'],
      facilities: ['Swimming pool ,', 'Fitness center ']
    },
    {
      name: 'Hotel Oasis',
      image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      description: 'A spacious hotel located in the heart of New York City, offering a unique blend of elegance, comfort, and tranquility.',
      rating: 4,
      price: "10,000",
      stars: "★★★★",
      location: 'New York, USA',
      amenities: ['Breakfast included', 'Free Wi-Fi', 'Private bathroom', '24-hour front desk', 'Concierge service'],
      services: ['Room service', '24-hour reception'],
      facilities: ['Swimming pool', 'Fitness center']
    },
    {
      name: 'Hotel Sunset',
      image: 'https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      description: 'A luxurious hotel located in the heart of Tokyo, offering a unique blend of elegance, comfort, and tranquility.',
      rating: 5,
      price: "8,000",
      stars: "★★★★★",
      location: 'Tokyo, Japan',
      amenities: ['Breakfast included', 'Free Wi-Fi', 'Private bathroom', '24-hour front desk', 'Concierge service'],
      services: ['Room service', '24-hour reception'],
      facilities: ['Swimming pool', 'Fitness center']
    }
  ]


  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);

  return (
    <>
      <div className="bg-zinc-800 h-screen w-full text-white flex justify-start">
        <img
          className="relative brightness-50 w-full h-[100%]"
          src={HotelImage}
          alt=""
        />
        <div className="hotel-heading absolute mt-[5%] w-full ">
          <h1 className="text-6xl ml-[10%]">Find the right hotel today</h1>

          <div className="hotel-form w-[80%] mx-auto border p-3 rounded py-4 bg-[#05203c96]">
            <form className="" action="">
              <label className="" htmlFor="">
                Where Do you Want to stay
              </label>
              <label className="ml-[20%]" htmlFor="">
                Check-in{" "}
              </label>
              <label className="ml-[15%]" htmlFor="">
                Check-out{" "}
              </label>
              <label className="ml-[14%]" htmlFor="">
                Guests and rooms
              </label>

              <br />
              <input
                className="py-3 px-3 mr-3 w-[35%] rounded outline-none text-black"
                type="text"
                placeholder="Enter Destination "
              />
              <Flatpickr
                value={checkIn}
                onChange={([selectedDate]) => setCheckIn(selectedDate)}
                options={{
                  dateFormat: "Y-m-d",
                  altInput: true,
                  altFormat: "F j, Y",
                  minDate: new Date().toISOString().split('T')[0],
                }}
                placeholder={formattedDate}
                className="custom-flatpickr py-3 px-3 mr-3 w-[20%] rounded outline-none text-black"
              />

              <Flatpickr
                value={checkOut}
                onChange={([selectedDate]) => setCheckOut(selectedDate)}
                options={{
                  dateFormat: "Y-m-d",
                  altInput: true,
                  altFormat: "F j, Y",
                  minDate: new Date().toISOString().split('T')[0],
                }}
                placeholder={formattedDate}
                className="custom-flatpickr py-3 px-3 mr-3 w-[20%] rounded outline-none text-black"
              />

              <input
                className="py-3 px-3 mr-3 w-[20%] rounded outline-none text-black"
                type="text"
                placeholder="Person , Rooms"
              />

              <div className="Filtration flex mt-5 gap-2">
                <p className="mt-3">Popular Filtration : </p>
                <input
                  type="checkbox"
                  id="hotel"
                  name="hotel"
                  value="cancelation"
                  className="ml-[5%] mt-3 w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded cursor-pointer"
                />
                <label className="mt-3 cursor-pointer" htmlFor="hotel"> Free cancelation Hotels</label>

                <input
                  type="checkbox"
                  id="4_Start"
                  name="hotel"
                  value="4"
                  className="ml-[5%] mt-3 w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded cursor-pointer"
                />
                <label className="mt-3 cursor-pointer" htmlFor="4_Start"> 4 Stars</label>

                <input
                  type="checkbox"
                  id="3_star"
                  name="hotel"
                  value="3"
                  className="ml-[5%] mt-3 w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded cursor-pointer"
                />
                <label className="mt-3 cursor-pointer" htmlFor="3_star"> 3 Stars </label>

                <button className="ml-[23%] py-3 px-10 border bg-[#00357A] rounded" type="submit">Search Hotels</button>
              </div>
            </form>
          </div>
        </div>



      </div>
      <div className="absolute w-full">
        <div className="w-[90%] mx-auto mt-10 ">
          <p className="text-xl font-semibold">Hotels  </p>
          <h3 className="text-2xl font-bold mt-10">Hotels in your home country</h3>
          <h3 className="font-serif text-lg">Your next adventure may be closer than you think. Discover hotels just beyond your doorstep.</h3>
        </div>

        <div className="w-full ">
          <div className="w-[90%] mx-auto flex gap-6 ">
            <button className="py-2 px-6 mt-3 text-sm hover:bg-blue-400 font-serif border rounded-md ">Bangalore</button>
            <button className="py-2 px-6 mt-3 text-sm hover:bg-blue-400 font-serif border rounded-md ">Mumbai</button>
            <button className="py-2 px-6 mt-3 text-sm hover:bg-blue-400 font-serif border rounded-md ">New Delhi</button>
            <button className="py-2 px-6 mt-3 text-sm hover:bg-blue-400 font-serif border rounded-md ">Jaipur</button>
            <button className="py-2 px-6 mt-3 text-sm hover:bg-blue-400 font-serif border rounded-md ">Chennai</button>
            <button className="py-2 px-6 mt-3 text-sm hover:bg-blue-400 font-serif border rounded-md ">Hyderabad</button>
          </div>

          <div className="flex justify-center gap-8 w-[95%] h-auto mx-auto my-10 flex-wrap">
            {CityHostels && CityHostels.map((data) => (
              <div className="w-[30%] h-auto border-2 bg-white rounded-lg " key={data.id} >
                <img className="w-full h-44 rounded-md" src={data.image} alt="" />
                <div className="flex justify-between px-2 py-1">
                  <b className="font-serif text-xl">{data.name}</b>
                  <p className="text-yellow-500 text-2xl">{data.stars}</p>
                </div>
                <p className="ml-2 font-medium">{data.location}</p>
                <p className="ml-2"> <b>Facilities :</b> {data.facilities}</p>
                <p className="ml-2"><b>Services : </b> {data.services}</p>
                <p className="ml-2"><b>Ratings : </b>{data.rating}</p>
                <hr className="" />
                <div className="p-3">
                  <b className="p-3 ml-[50%] text-xl font-mono">₹ {data.price}</b>
                  <span className="text-sm font-sans">per night</span>
                </div>
              </div>
            ))}
          </div>

        </div>
        <Footer />
      </div >
    </>
  );
}

export default Travel;
