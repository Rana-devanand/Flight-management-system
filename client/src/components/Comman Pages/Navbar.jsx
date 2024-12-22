import React, { useCallback, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MdOutlineCardTravel } from "react-icons/md";
import { FaHome, FaCity } from "react-icons/fa";
import { MdFlight } from "react-icons/md";
import { MdOutlineConnectingAirports } from "react-icons/md";
import { CiLogin } from "react-icons/ci";
import { FaUserAlt } from "react-icons/fa";

import { GrSchedule } from "react-icons/gr";
// import ADMINNAVBAR from "../components/ADMIN/Navbar";

function Navbar() {
  const navigate = useNavigate();

  const [token, setToken] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userType, setUserType] = useState(null);
  useEffect(() => {
    // Retrieve the token from localStorage
    let storedToken = localStorage.getItem("token");
    let userName = localStorage.getItem("username");
    let userType = localStorage.getItem("type");
    if (storedToken && userName) {
      // Parse it if necessary (e.g., if it's stored as a JSON string)
      setToken(storedToken);
      setUserName(userName);
      setUserType(userType);
    }
  }, [window.location.href]);

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("type");
    setToken(null);
    navigate("/login");
  };

  // console.log(typeof userType)
  return (
    <>
    {/*  bg-[#ffffffec] items-center */}
    {/* 071C35 */}
      <nav className="sm:block sm:w-full lg:flex lg:w-full lg:justify-between  py-2  text-[#000] text-sm font-semibold shadow-2xl">
        <div className="sm:block lg:flex gap-2 ml-4">
          <div className="mx-3 mt-1 text-lg font-serif text-[#0D6AA0]">
            Flight Udaan
          </div>
          {/* ---------------------------------------------------------------- 
                                  Home page 
              ------------------------------------------------------------------*/}
          {token && userType == "admin" ? (
            <NavLink
              style={(e) => {
                return {
                  color: e.isActive ? "#15A0EF" : "",
                  // background: e.isActive ? "#394457" : "",
                };
              }}
              className="flex items-center  px-3 py-2 "
              to="/adminDashboard"
            >
              <FaHome className="mx-1" />
              Home
            </NavLink>
          ) : (
            <NavLink
              style={(e) => {
                return {
                  color: e.isActive ? "#15A0EF" : "",
                  // background: e.isActive ? "#394457" : "",
                };
              }}
              className="flex items-center px-3 py-2 "
              to="/"
            >
              <FaHome className="mx-1" />
              Home
            </NavLink>
          )}

          {/* ---------------------------------------------------------------- 
                                  Hotels 
              ------------------------------------------------------------------*/}
          <NavLink
            style={(e) => {
              return {
                color: e.isActive ? "#15A0EF" : "",
                // background: e.isActive ? "#394457" : "",
              };
            }}
            className="flex items-center  px-3 py-2 "
            to="/hotels"
          >
            <MdOutlineCardTravel className="mx-1  " />
            Hotels
          </NavLink>
          {/* ---------------------------------------------------------------- 
                                  Create Flight 
              ------------------------------------------------------------------*/}
          {token && userType == "admin" ? (
            <>
              <NavLink
                style={(e) => {
                  return {
                    color: e.isActive ? "#15A0EF" : "",
                    // background: e.isActive ? "#394457" : "",
                  };
                }}
                className="flex items-center  px-4 py-2"
                to="/createFlight"
              >
                <MdFlight className="mx-1  " /> Create Flight
              </NavLink>              
            </>
          ) : (
            <NavLink
              style={(e) => {
                return {
                  color: e.isActive ? "#8AB4F8" : "",
                  // background: e.isActive ? "#394457" : "",
                };
              }}
              className="flex items-center  px-3 py-2"
              to="/flight"
            >
              <MdFlight className="mx-1  " /> Flights
            </NavLink>
          )}

          {token && userType == "admin" ? (
            <>
              <NavLink
                style={(e) => {
                  return {
                    color: e.isActive ? "#15A0EF" : "",
                    // background: e.isActive? "#394457" : "",
                  };
                }}
                className="flex items-center px-4 py-2"
                to="/flightschedule"
              >
                <GrSchedule className="mx-1" />
                Flight Schedule
              </NavLink>
              
            </>
          ) : (
            ""
          )}
          {/* ---------------------------------------------------------------- 
                                  Create Airport 
              ------------------------------------------------------------------*/}

          {token && userType == "admin" ? (
            <>
              <NavLink
                style={(e) => {
                  return {
                    color: e.isActive ? "#15A0EF" : "",
                    // background: e.isActive ? "#394457" : "",
                  };
                }}
                className="flex items-center  px-4 py-2"
                to="/createAirport"
              >
                <MdOutlineConnectingAirports className="mx-1  " /> Create
                Airport
              </NavLink>
            </>
          ) : (
            <NavLink
              style={(e) => {
                return {
                  color: e.isActive ? "#15A0EF" : "",
                  // background: e.isActive ? "#394457" : "",
                };
              }}
              className="flex items-center  px-3 py-2"
              to="/Airports"
            >
              <MdOutlineConnectingAirports className="mx-1  " /> Airport
            </NavLink>
          )}

          {/* ---------------------------------------------------------------- 
                                  Create City 
              ------------------------------------------------------------------*/}
          {token && userType == "admin" ? (
            <>
              <NavLink
                style={(e) => {
                  return {
                    color: e.isActive ? "#15A0EF" : "",
                    // background: e.isActive ? "#394457" : "",
                  };
                }}
                className="flex items-center  px-4 py-2"
                to="/createCity"
              >
                <FaCity className="mx-1  " /> Create City
              </NavLink>
            </>
          ) : (
            <NavLink
              style={(e) => {
                return {
                  color: e.isActive ? "#15A0EF" : "",
                  // background: e.isActive ? "#394457" : "",
                };
              }}
              className="flex items-center  px-4 py-2"
              to="/city"
            >
              <FaCity className="mx-1  " /> About
            </NavLink>
          )}
        </div>
        {/* ---------------------------------------------------------------- 
                                  Welcome user 
              ------------------------------------------------------------------*/}
        <div className="login flex">
          {token ? (
            <>
              <div className="text-sm font-bold mr-3 mt-3 italic">
                <NavLink className="" to="/dashboard">
                  Welcome, {userName}!
                </NavLink>
              </div>
              <button
                className=" flex items-center  gap-2 mr-6 hover:text-[#0c0c0c] text-[#fff] px-4 py-2 bg-red-400 rounded-md"
                onClick={handleLogout}
              >
                {/* ---------------------------------------------------------------- 
                                  Handle Logout 
              ------------------------------------------------------------------*/}
                Logout
              </button>
            </>
          ) : (
            <>
              {/* ---------------------------------------------------------------- 
                                  Login 
              ------------------------------------------------------------------*/}
              <NavLink
                className="flex items-center px-3 py-2 rounded-full gap-2 mr-2 hover:text-[#E89D1A] text-[#000]"
                to="/login"
              >
                <CiLogin />
                Login
              </NavLink>
              {/* ---------------------------------------------------------------- 
                                  Create Account 
              ------------------------------------------------------------------*/}
              <NavLink
                className="flex items-center bg-[#0D6AA0] text-white  px-3 py-2 mr-3 gap-2 hover:text-[#E89D1A] rounded-md text-sm"
                to="/CreateUser"
              >
                <FaUserAlt />
                SignIn
              </NavLink>

            </>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
