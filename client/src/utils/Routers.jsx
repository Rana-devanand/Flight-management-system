import { Routes, Route, BrowserRouter } from "react-router-dom";
import Hotels from "../components/Hotels";
import Home from "../components/Home";
import City from "../components/City";
import Airports from "../components/Airports";
import Flight from "../components/Flight";

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


      {/* <Route path="/Airports/:city" element={<AirportDetails />} /> */}
    </Routes >

  );
}

export default Routers;
