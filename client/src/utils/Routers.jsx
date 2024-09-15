import { Routes, Route, BrowserRouter } from "react-router-dom";
import Hotels from "../components/Hotels";
import Home from "../components/Home";
import City from "../components/City";
import Airports from "../components/Airports";
import Flight from "../components/Flight";
import CreateAccount from "../components/CreateAccount";
import UserLogin from "../components/Login";
import DashBoard from "../components/DashBoard";
import CreateCity from "../components/ADMIN/CreateCity";
import CreateAirport from "../components/ADMIN/CreateAirport";
import CreateFlight from "../components/ADMIN/CreateFlight";
import AdminDashboard  from "../components/ADMIN/AdminDashboard"
import UpdateCity from "../components/ADMIN/UpdateCity";
import UpdateFLight from "../components/ADMIN/UpdateFlight";
import UpdateAirport from "../components/ADMIN/UpdateAirport";
// import { useEffect, useState } from "react";

function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/hotels" element={<Hotels />} />
      <Route path="/city" element={<City />} />
      <Route path="/flight" element={<Flight />} />

      <Route path="/Airports" element={<Airports />}>
        <Route path="/Airports/:cityName" element={<Airports />} />
      </Route>
      <Route path="/CreateUser" element={<CreateAccount />} />
      <Route path="/login" element={<UserLogin />} />
      <Route path="/dashboard" element={<DashBoard />} />
      {/* <Route path="/Airports/:city" element={<AirportDetails />} /> */}

      {/* Admin Page  UI */}
      <Route path="/adminDashboard" element={<AdminDashboard />} />
      <Route path="/createCity" element={<CreateCity />} />
      <Route path="/createAirport" element={<CreateAirport />} />
      <Route path="/CreateFlight" element={<CreateFlight />} />
      <Route path="/updateCity/:id" element={<UpdateCity />} />
      <Route path="/updateFlight/:id" element={<UpdateFLight/>}/>
      <Route path="/updateAirport/:id" element={<UpdateAirport/>}/>
    </Routes>
  );
}

export default Routers;
