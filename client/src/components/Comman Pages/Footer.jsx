import React from "react";
import udaan from "../../assets/images/udaan_logo.png";
import { FaTwitter } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaGooglePlusSquare } from "react-icons/fa";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { FaYoutube } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";

function Footer() {
  return (
    <>
      <div className="row flex w-full h-screen bg-[#EBEFFE] text-[#000]">
        <div className=" w-[5%] "></div>
        <div className="w-[35% p-3">
          <img
            className="mt-10"
            src={udaan}
            alt=""
            style={{ width: 200, height: 70 }}
          />
          <p className="font-serif mt-3">
            Smart website solution for small business be part of the Udaan
            family.
          </p>

          <div class="flex items-center bg-gray-700 p-2 my-5 rounded-md">
            <input
              type="text"
              placeholder="Type a message..."
              class="bg-gray-600 text-white  px-4 py-2 w-full focus:outline-none"
            />
            <button class="bg-blue-500 p-2 rounded-full ml-2 flex items-center justify-center">
              {/* <!-- Icon here, such as a paper plane icon --> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2.94 9.06a.75.75 0 011.06 0L10 14.06l6.06-6.06a.75.75 0 111.06 1.06l-6.72 6.72a1.5 1.5 0 01-2.12 0L2.94 10.12a.75.75 0 010-1.06z" />
              </svg>
            </button>
          </div>

          <div className="w-[80%] flex flex-wrap text-3xl gap-6 ml-5 mt-10">
            <FaTwitter />
            <FaSquareFacebook />
            <FaGooglePlusSquare />
            <FaInstagram />
            <FaYoutube />
            <FaPinterest />
          </div>
          <div className="mt-10 text-7xl flex gap-2">
            <IoLogoGooglePlaystore />
            <p className="text-xl">Available on Google Play Store</p>
          </div>
        </div>
        <div className="w-[25%] p-6">
          <h2 className="font-semibold mt-10">About Udaan</h2>
          <ul className="mt-5 flex flex-col gap-3">
            <li>About Udaan</li>
            <li>Investor Relations</li>
            <li>Management</li>
            <li>Terms of Services</li>
            <li>User Agreement</li>
            <li>Privacy</li>
            <li>Careers</li>
            <li>YouTube Channel</li>
          </ul>
        </div>

        <div className="w-[25%] p-6">
          <h2 className="font-semibold mt-10">travel essentials</h2>
          <ul className="mt-5 flex flex-col gap-3">
            <li>PNR Status</li>
            <li>Offers</li>
            <li>Airline Routes</li>
            <li>Train Running Status</li>
          </ul>
        </div>

        <div className="w-[25%] p-5">
          <h2 className="font-semibold mt-10">more links </h2>
          <ul className="mt-5 flex flex-col gap-3">
            <li>Cheap Flights</li>
            <li>Hotels Near Me</li>
            <li> My Bookings</li>
            <li>Cancellation</li>
            <li>My Account</li>
            <li>Wallet</li>
            <li>Advertise with Us</li>
          </ul>
        </div>

        <div className="w-[30%] p-4">
          <h2 className="font-semibold mt-10">our products</h2>
          <ul className="mt-5 flex flex-col gap-2">
            <li>Domestic Hotels</li>
            <li>International Hotels</li>
            <li>Domestic Flights</li>
            <li>International Flights</li>
            <li>Multi-City Flights</li>
            <li>Couple Friendly Hotels</li>
            <li>Nearby Getaways</li>
            <li>Bus Booking</li>
            <li>Cab Booking</li>
            <li>Airport Cabs Booking</li>
            <li>Go Stay</li>
            <li>Gift Cards</li>
            <li>Trip Money</li>
            <li>Udaan Advertising Solutions</li>
          </ul>
        </div>
        <div className="w-[5%]"></div>
      </div>
      <div>
      <p className="bg-[#EBEFFE] text-center text-gray-500 text-xs py-2">
            &copy; 2024 Udaan. All rights reserved.
          </p>
      </div>
      
    </>
  );
}

export default Footer;
