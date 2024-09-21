import React, { useEffect, useState } from "react";
import "../assets/css/plainTicket.css"; // Import CSS for styling
import ticketFlightLogo from "../assets/images/ticketFlightLogo.svg";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";


const PlaneTicket = () => {
  const URL = import.meta.env.VITE_BACKEND_API_URL;
  const location = useLocation();
  const userData = location.state;
  const FlightId = userData.flightId;
  const totalFair = userData.totalFair;
  const [flightChoose, setChooseFlight] = useState({});
  const [bookUserData, setUserData] = useState({});

  const navigate = useNavigate();
  // Fetch flight data
  const getChooseFlightData = async () => {
    try {
      const response = await axios.get(`${URL}/api/V1/airplane/${FlightId}`);
      const flightData = response.data.data;
      setChooseFlight(flightData);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch user data
  const geyUserDetails = async () => {
    try {
      const email = localStorage.getItem("email");
      const url = `${URL}/api/V1/getByEmail/${email}`;
      const response = await axios.get(url);
      const data = response.data.data;
      setUserData(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    getChooseFlightData();
    geyUserDetails();
  }, []);

  // Function to trigger print
  const handlePrint = () => {
    window.print();
  };

  const DashBoard = () =>{
     navigate("/dashboard")
  }


  return (
    <div className="ticket-container w-full h-screen">
      {/* Header */}
      <div className="header">
        <div className="logo">
          <img className="w-52 h-52" src={ticketFlightLogo} alt="Plane Logo" />
        </div>
        <h1>Plane Ticket Booked</h1>
      </div>

      {/* Booking Details */}
      <div className="booking-details">
        <p>
          <strong>Booking Date:</strong> Sunday, September 22, 2024
        </p>
        <p>
          <strong>Guest Name:</strong> {bookUserData.username}
        </p>
      </div>

      {/* Flight Details */}
      <div className="flight-details">
        <h2>Flight Details</h2>
        <div className="route">
          <div>
            <p>
              <strong>From:</strong>
              {flightChoose.Departure}
            </p>
            <p>
              <strong>To:</strong> {flightChoose.Arrival}
            </p>
          </div>
          <div>
            <p>
              <strong>Airline:</strong> {flightChoose.Airline}
            </p>
            <p>
              <strong>Flight Number:</strong> {flightChoose.modelNo}
            </p>
          </div>
          <div>
            <p>
              <strong>Departure Date:</strong> {flightChoose.Remark} September
              23, {flightChoose.DepartureTime}
            </p>
            <p>
              <strong>Arrival Date:</strong> {flightChoose.Remark}, September
              23, 2022 {flightChoose.ArrivalTime}
            </p>
          </div>
        </div>
        <div className="seat-info">
          <p>
            <strong>Seat Class:</strong> Business Class
          </p>
          <p>
            <strong>Extra Baggage Allowance:</strong> 8
          </p>
          <p>
            <strong>Seat Number:</strong> 3-A
          </p>
        </div>
      </div>

      {/* Fare Breakdown */}
      <div className="fare-breakdown">
        <h2>Fare Breakdown</h2>
        <p>
          <strong>Base Fare:</strong> $100
        </p>
        <p>
          <strong>Passenger Service Charge:</strong> $0
        </p>
        <p>
          <strong>Surcharge:</strong> $80
        </p>
        <p>
          <strong>Fuel/Insurance Surcharge:</strong> $30
        </p>
        <p>
          <strong>Ticketing Service Charge:</strong> $5
        </p>
        <p>
          <strong>Total Amount:</strong> {totalFair}
        </p>
      </div>

      {/* Important Information */}
      <div className="important-info">
        <p>
          Passengers are required to bring this itinerary/receipt along with an
          official ID with a photo issued by the government when entering the
          terminal.
        </p>
      </div>

      {/* Print Button */}
      <div className="print-button">
        <button
          onClick={handlePrint}
          className="px-6 py-2 bg-blue-600 text-lg rounded-md font-semibold text-white"
        >
          Print Ticket
        </button>
      </div>

      <div className="row d-print-none">
      <button
          onClick={DashBoard}
          className="px-6 py-2 mt-2 mb-10 bg-zinc-600 text-lg rounded-md font-semibold text-white"
        >
          Dashboard
        </button>
      </div>
    </div>
  );
};

export default PlaneTicket;
