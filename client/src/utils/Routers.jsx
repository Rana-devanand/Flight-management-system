import { Routes, Route, BrowserRouter } from "react-router-dom";
import Hotels from "../components/Hotels";
import Home from "../components/Home";
import City from "../components/City";
import Airports from "../components/Airports";
import Flight from "../components/Flight";
import CreateAccount from "../components/CreateAccount";
import UserLogin from "../components/Login"
import DashBoard from "../components/DashBoard";
import CreateCity  from "../components/ADMIN/CreateCity"
import CreateAirport from "../components/ADMIN/CreateAirport";
// import { useEffect, useState } from "react";

function Routers() {


  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/hotels" element={<Hotels />} />
      <Route path="/city" element={<City />} />
      <Route path="/flight" element={<Flight />} />

      <Route path="/Airports" element={<Airports />} >
        <Route path="/Airports/:cityName" element={<Airports />} />
      </Route>
      <Route path="/CreateUser" element={<CreateAccount />} />
      <Route path="/login" element={<UserLogin />} />
      <Route path="/dashboard" element={<DashBoard />} />
      {/* <Route path="/Airports/:city" element={<AirportDetails />} /> */}
      
      
      {/* Admin Page  UI */}
      <Route path="/createCity" element={<CreateCity />} />
      <Route path="/createAirport" element={<CreateAirport/>}/>
    </Routes >

  );
}

export default Routers;
