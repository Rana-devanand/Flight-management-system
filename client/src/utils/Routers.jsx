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
import FilterFlight from "../components/FilterFlight";
import BookTicket from "../components/BookTicket";
import BookTicketInfo from "../components/BookTicketInfo"
import PaymentSuccess from "../components/PaymentSuccess"
import Payment from "../components/PaymentDone"
import PlainTicket from "../components/PlainTicket"
import SeatSelection from "../components/SeatSelection";
import ForgetPassword from "../components/ForgetPassword";
import SetNewPassword from "../components/SetnewPassword";
import FlightSchedule from "../components/ADMIN/FlightSchedule";
import CreateSeats from "../components/ADMIN/CreateSeats";
import Seats from "../components/ADMIN/Seats";

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
      <Route path="/forgetpassword" element={<ForgetPassword />} />
      <Route path="/newpassword/:id" element={<SetNewPassword />} />
      <Route path="/dashboard" element={<DashBoard />} />
      {/* <Route path="/Airports/:city" element={<AirportDetails />} /> */}
      <Route path="/filterFLights" element={<FilterFlight/>}/>
      <Route path="/bookTicket" element={<BookTicket/>}/>
      <Route path="/bookTicketInfo" element={<BookTicketInfo/>}/>
      <Route path="/PaymentSuccess" element={<PaymentSuccess/>}/>
      <Route path="/Payment" element={<Payment/>}/>
      <Route path="/PlainTicket" element={<PlainTicket/>}/>
      <Route path="/seats" element={<SeatSelection/>}/>

      {/* Admin Page  UI */}
      <Route path="/adminDashboard" element={<AdminDashboard />} />
      <Route path="/createCity" element={<CreateCity />} />
      <Route path="/createAirport" element={<CreateAirport />} />
      <Route path="/CreateFlight" element={<CreateFlight />} />
      <Route path="/updateCity/:id" element={<UpdateCity />} />
      <Route path="/updateFlight/:id" element={<UpdateFLight/>}/>
      <Route path="/updateAirport/:id" element={<UpdateAirport/>}/>
      <Route path="/flightschedule" element={<FlightSchedule/>} />
      <Route path="/creteSeatsclass" element={<CreateSeats/>}/>
      <Route path="/createseats" element={<Seats/>}/>
    </Routes>
  );
}

export default Routers;
