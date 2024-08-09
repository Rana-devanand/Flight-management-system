import { Routes, Route } from "react-router-dom";
import Travel from "../components/Travel";
import Home from "../components/Home";
import City from "../components/City";
import Airports from "../components/Airports";
import Flight from "../components/Flight";
function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/travel" element={<Travel />} />
      <Route path="/city" element={<City />} />
      <Route path="/flight" element={<Flight />} />
      <Route path="/Airports" element={<Airports />} />
    </Routes>
  );
}

export default Routers;
