import React from "react";
import { NavLink } from "react-router-dom";
import { MdOutlineCardTravel } from "react-icons/md";
import { FaHome, FaCity } from "react-icons/fa";
import { MdFlight } from "react-icons/md";
import { MdOutlineConnectingAirports } from "react-icons/md";
import { CiLogin } from "react-icons/ci";
import { FaUserAlt } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="flex justify-between bg-[#071C35] items-center py-5 text-white font-semibold">
      <div className="flex gap-5 ml-10">
        <div className="mx-3 text-2xl font-extrabold">Flights India</div>
        <NavLink
          style={(e) => {
            return {
              color: e.isActive ? "#8AB4F8" : "",
              background: e.isActive ? "#394457" : "",
            };
          }}
          className="flex items-center shadow-sm px-3 py-2 rounded-full border "
          to="/"
        >
          <FaHome className="mx-1" />
          Home
        </NavLink>

        <NavLink
          style={(e) => {
            return {
              color: e.isActive ? "#8AB4F8" : "",
              background: e.isActive ? "#394457" : "",
            };
          }}
          className="flex items-center shadow-sm px-3 py-2 rounded-full border "
          to="/hotels"
        >
          <MdOutlineCardTravel className="mx-1  " />
          Hotels
        </NavLink>

        <NavLink
          style={(e) => {
            return {
              color: e.isActive ? "#8AB4F8" : "",
              background: e.isActive ? "#394457" : "",
            };
          }}
          className="flex items-center shadow-sm px-4 py-2 rounded-full border"
          to="/city"
        >
          <FaCity className="mx-1  " /> City
        </NavLink>

        <NavLink
          style={(e) => {
            return {
              color: e.isActive ? "#8AB4F8" : "",
              background: e.isActive ? "#394457" : "",
            };
          }}
          className="flex items-center shadow-sm px-3 py-2 rounded-full border"
          to="/flight"
        >
          <MdFlight className="mx-1  " /> Flights
        </NavLink>

        <NavLink
          style={(e) => {
            return {
              color: e.isActive ? "#8AB4F8" : "",
              background: e.isActive ? "#394457" : "",
            };
          }}
          className="flex items-center shadow-sm px-3 py-2 rounded-full border"
          to="/Airports"
        >
          <MdOutlineConnectingAirports className="mx-1  " /> Airport
        </NavLink>
      </div>

      <div className="login flex">

        <NavLink className="flex items-center shadow-sm px-3 py-2 rounded-full gap-2 hover:text-[#E89D1A]"
          to="/CreateUser"
        >
          
          <FaUserAlt />
          Create Account
        </NavLink>

        <NavLink className="flex items-center shadow-sm px-3 py-2 rounded-full gap-2 mr-2 hover:text-[#E89D1A] text-[#fff]" >
          <CiLogin />
          Login
        </NavLink>




      </div>
    </nav>
  );
}

export default Navbar;
