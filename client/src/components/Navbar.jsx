import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MdOutlineCardTravel } from "react-icons/md";
import { FaHome, FaCity } from "react-icons/fa";
import { MdFlight } from "react-icons/md";
import { MdOutlineConnectingAirports } from "react-icons/md";
import { CiLogin } from "react-icons/ci";
import { FaUserAlt } from "react-icons/fa";

function Navbar() {

  const navigate = useNavigate();

  const [token, setToken] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userType, setUserType] = useState(null);
  useEffect(() => {
    // Retrieve the token from localStorage
    const storedToken = localStorage.getItem('token');
    const userName = localStorage.getItem('username');
    const userType = localStorage.getItem('type');
    if (storedToken && userName) {
      // Parse it if necessary (e.g., if it's stored as a JSON string)
      setToken(storedToken);
      setUserName(userName);
      setUserType(userType);
    }
  });

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    setToken(null);
    navigate("/login");
  };

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

        <>
          {userType == 1 ? (
            <NavLink
              style={(e) => {
                return {
                  color: e.isActive ? "#8AB4F8" : "",
                  background: e.isActive ? "#394457" : "",
                };
              }}
              className="flex items-center shadow-sm px-4 py-2 rounded-full border"
              to="/createCity"
            >
              <FaCity className="mx-1  " /> City
            </NavLink>
          ) :
            (<NavLink
              style={(e) => {
                return {
                  color: e.isActive ? "#8AB4F8" : "",
                  background: e.isActive ? "#394457" : "",
                };
              }}
              className="flex items-center shadow-sm px-4 py-2 rounded-full border"
              to="/city"
            >
              <FaCity className="mx-1  " /> About
            </NavLink>)}

        </>

      </div>

      <div className="login flex">
        {token ? (
          <>
            <div className="text-sm font-bold mr-3 mt-3 italic">
              <NavLink
                className="" to="/dashboard">
                Welcome, {userName}!
              </NavLink>
            </div>
            <button className=" flex items-center shadow-sm gap-2 mr-6 hover:text-[#0c0c0c] text-[#fff] px-4 py-2 bg-red-400 rounded-md"
              onClick={handleLogout}
            >Logout</button>
          </>
        ) : (
          <>
            <NavLink className="flex items-center shadow-sm px-3 py-2 rounded-full gap-2 hover:text-[#E89D1A]"
              to="/CreateUser"
            >

              <FaUserAlt />
              Create Account
            </NavLink>

            <NavLink className="flex items-center shadow-sm px-3 py-2 rounded-full gap-2 mr-2 hover:text-[#E89D1A] text-[#fff]"
              to="/login"
            >
              <CiLogin />
              Login
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
