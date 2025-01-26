import React, { useEffect, useState } from "react";
// Import the CSS
import "../assets/css/SeatSelection.css";
import seat1 from "../assets/images/businessSeat.png";
import seat2 from "../assets/images/EconomySeat.png";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";
import { MdAirplaneTicket } from "react-icons/md";
import Footer from "../components/Comman Pages/Footer";

const SeatSelection = () => {
  const URL = import.meta.env.VITE_BACKEND_API_URL;
  const [flightTravelData ,setFlightsData] = useState({});
  const [seatSelection, setSeatSelection] = useState([]);
  const [flightId, setFlightId] = useState("");
  const [SeatData, setSeatData] = useState([]);
  const location = useLocation();
  const flightData = location.state?.flightId;
  const FLightDetails = flightData[0];
  // console.log(FLightDetails);
  const navigate = useNavigate();
  
  // Add new state for selected seats
  const [selectedBusinessSeats, setSelectedBusinessSeats] = useState([]);
  const [selectedEconomySeats, setSelectedEconomySeats] = useState([]);
  
  // http://localhost:4000/api/V1/airplane/:id
  const getFlightTravelData =async () => {
    try {
      const response = await axios.get(`${URL}/api/V1/airplane/${FLightDetails.flight_id}`);
      // console.log(response.data.data);
      setFlightsData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  //  http://localhost:4000/api/V1/getFlightSeatsByFlightId/:flight_id/:date
  const getFlightSeatsByFlightIdAndDate = async () => {
      try {
        const resonse = await axios.get(`${URL}/api/V1/getFlightSeatsByFlightId/${FLightDetails.flight_id}/${FLightDetails.Date}`)
        console.log(resonse.data.data);
        setFlightId(resonse.data.data[0].flight_id);
        setSeatSelection(resonse.data.data)
      } catch (error) {
        console.log(error);
      }
  }

  //  Get Seats Data for Row and Column bias...
  // http://localhost:4000/api/V1/getseatsBy/:flight_id
  const getSeatData = async (flightId) => {
    try {
      const response = await axios.get(`${URL}/api/V1/getseatsBy/${flightId}`)
      console.log(response.data.data);
      setSeatData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }
  // Update the seat selection handler
  const handleSeatSelectionForBusiness = (seatIndex,flight_id ,Flight_Date ,seatPrice ,seatNumber, seat_type) => {
    const newSelection = [...selectedBusinessSeats, { seatIndex,flight_id,Flight_Date,seatPrice, seatNumber, seat_type }];
    setSelectedBusinessSeats(newSelection);
  };

  // Add handler for economy seats
  const handleSeatSelectionForEconomy = (seatIndex,flight_id, Flight_Date, seatProice, seatNumber, seat_type) => {
    const newSelection = [...selectedEconomySeats, { seatIndex, flight_id, Flight_Date, seatProice,seatNumber, seat_type }];
    setSelectedEconomySeats(newSelection);
  };

  const RemoveSelectedSeat  = (seatIndex) => {
    const newSelection = selectedBusinessSeats.filter(seat => seat.seatIndex!== seatIndex);
    setSelectedBusinessSeats(newSelection);
  }

  const RemoveEconomySelectedSeat = (seatIndex) => {
    const newSelection = selectedEconomySeats.filter(seat => seat.seatIndex!== seatIndex);
    setSelectedEconomySeats(newSelection);
  }
  console.log("Economy seat" , selectedEconomySeats)

  const HandleBookTicket = () => {
    console.log("Book ticket API call...");
    navigate("/bookTicket" , {
      state: {
        businessSeats: selectedBusinessSeats,
        economySeats:  selectedEconomySeats,
        flightDetails: FLightDetails
      }
    });
  }

  useEffect(() => {
    getFlightTravelData();
    getFlightSeatsByFlightIdAndDate();  
    getSeatData(flightId);
   
  }, [flightId]);
  return (
    <>
      <div className="bg-zinc-100 w-full flex justify-between">
        <div className="w-[60%] h-screen relative">
          <div className="absolute flex justify-start items-center flight-wings ">
             <img src="/flightLeftWing1.png" alt="" style={{width:195 , height:300}} className="mt-56" />
          </div>
          <div className="absolute flex justify-end items-center flight-wings ml-[76%]">
             <img src="/flightRightWing.png" alt="" style={{width:195 , height:320}} className="mt-56" />
          </div>

          <div className="w-[52%] mx-auto rounded-t-full mt-5 bg-[#CACBFF] ">
            <div className="ml-[7%] mt-8 flex">
              <div className="w-36 h-20 ml-8 mt-14 bg-[#eeeeee] rounded-ss-full"></div>
              <div className="w-36 h-20 ml-3 mt-14 bg-[#eeeeee] rounded-se-full"></div>
            </div>
                <p className="flex justify-center p-2 border-b-2 items-center text-2xl text-purple-700 font-serif">{flightTravelData.Airline}</p>
            <div className="w-[82%] h-1 ml-10 mt-2 font-semibold ">
            </div>

            {/* Scrollable Seat Layout */}
            <div className="border w-96 mx-auto bg-[#EAEBFF] rounded-md h-[60vh] overflow-y-auto 
              scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent 
              hover:scrollbar-thumb-gray-400 scroll-smooth">

              {/* Business Class Section */}
              <div className="plane-layout pt-2 mt-3 w-[92%] mx-auto bg-[#FFFFFF]">
                <p className="text-center font-medium text-gray-600 mb-4">Business Class</p>
                {SeatData.map((seatData, index) => {
                  if (seatData.seat_type_name === "Bussiness") {
                    return (
                      <div key={index} className="flex flex-wrap   justify-center gap-4 mb-4">
                        {seatSelection.map((seat, seatIndex) => {
                          
                          const seats_per_row = parseInt(seatData.seats_per_row);
                          if(seatData.seat_type_name === "Bussiness" && seat.seat_type_id === seatData.seat_type_id) {
                          for(let j = 0; j < seats_per_row; j++) {
                            // {selectedBusinessSeats.map((selectedSeat, i) =>{
                            return (
                              <>
                                <button 
                                key={`${seatIndex}-${j}`}
                                onClick={() => handleSeatSelectionForBusiness(seatIndex,seat.flight_id,seat.Flight_Date,seatData.price,seat.seat_number, seatData.seat_type_name)}
                                className={`w-10 h-10 
                                  ${selectedBusinessSeats.some(s => s.seatIndex === seatIndex) ? 'bg-red-500 cursor-not-allowed' : 
                                  seat.is_Booked ? 'bg-[#8a8989] cursor-not-allowed hover:bg-[#414040]' : 
                                  'bg-[#16948e] hover:bg-[#13635f]'} 
                                  text-white rounded-lg transition-colors`}
                                disabled={seat.is_Booked || selectedBusinessSeats.some(s => s.seatIndex === seatIndex)}
                                >
                                {seat.seat_number}
                              </button>
                              </>
                            );
                          }
                          < br/>
                        }
                      } 
                       )}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>

              {/* Economy Class Section */}
              <div className="plane-layout w-[92%] mx-auto bg-[#FFFFFF] mt-4 pb-4">
                <p className="text-center font-medium text-gray-600 mb-4">Economy Class</p>
                {SeatData.map((seatData, index) => {
                  if (seatData.seat_type_name === "Economy") {
                    return (
                      <div key={index} className="flex flex-wrap justify-center gap-4 mb-4">
                        {seatSelection.map((seat, seatIndex) => {
                          const row = parseInt(seatData.total_seats);
                          const seats_per_row = parseInt(seatData.seats_per_row);
                          if(seatData.seat_type_name === "Economy" && seat.seat_type_id === seatData.seat_type_id) {
                          for(let j = 0; j < seats_per_row; j++) {
                            return (
                              <>
                                <button 
                                key={`${seatIndex}-${j}`}
                                onClick={() => handleSeatSelectionForEconomy(seatIndex,seat.flight_id,seat.Flight_Date, seatData.price, seat.seat_number, seatData.seat_type_name)}
                                className={`w-10 h-10 
                                  ${selectedEconomySeats.some(s => s.seatIndex === seatIndex) ? 'bg-red-500 cursor-not-allowed' : 
                                  seat.is_Booked ? 'bg-[#8a8989] cursor-not-allowed hover:bg-[#414040]' : 
                                  'bg-[#3462e2] hover:bg-[#33317b]'} 
                                  text-white rounded-lg transition-colors`}
                                disabled={seat.is_Booked || selectedEconomySeats.some(s => s.seatIndex === seatIndex)}
                                >
                                {seat.seat_number}
                              </button> 
                              </>
                            );
                          }
                          < br/>
                        }
                      }
                        )}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}

        {/* border border-[#d1d1d1] */}
        <div className="w-[40%] h-screen  text-[#FAFAFA] border ">
          <div className="flex bg-[#27273F] w-full shadow-2xl rounded-sm" >
            
            <div className="flightTravel-details flex p-3 gap-4 justify-center items-center">
              <h1 className="font-semibold text-xs">{flightTravelData.Departure}</h1>
              <h1 className="text-4xl font-semibold"> &rarr;</h1>
              <h1 className="font-semibold text-xs">{flightTravelData.Arrival}</h1>
            </div>

            <div className="departing-details flex items-center gap-5 ml-5">
              <p className="text-xs font-medium">
                Departure <br /> <span> {FLightDetails.Departure} <br /> {FLightDetails.departureTime}</span>
              </p>
              <p className="text-xs font-medium">
                Arrival <br /> {FLightDetails.Arrival} <br /> {FLightDetails.arrivalTime}
              </p>
              <p className="text-xs font-medium">Duration <br />{FLightDetails.totalTIme}</p>
            </div>

          </div>

          <div className="flex justify-around items-center">
            <img className="w-[30%] " src={seat1} alt="" />
            <img className="w-[30%] " src={seat2} alt="" />
          </div>

          <div className="text-black flex text-sm">
            <div className="w-[50%] ">
              <div className="flex gap-5">
                <p className="mt-1 ml-3 font-medium text-xl">Economy </p>
                <button className="px-4 text-xs font-semibold bg-[#43CEB5] text-white rounded-lg">
                  Booked
                </button>
              </div>
              <p className="text-xs font-medium p-2 leading-6">
                Rest and recharge during your flight with extended leg room,
                personalized service, and a multi-course meal service
              </p>
              <div className="p-2 flex flex-col gap-3">
                <p>• Built-in entertainment system </p>
                <p> • Complimentary snacks and drinks</p>
                <p>• One free carry-on and personal item</p>
              </div>
            </div>
            {/* ----------------------------------------------------- */}
            <div className="w-[50%] text-sm">
              <div className="flex gap-5 font-medium text-x">
                <p className="mt-1 ml-3">Business class </p>
                <button className="px-4 py-2 text-xs font-semibold bg-[#4441E3] text-white rounded-lg">
                  Booked
                </button>
              </div>
              <p className="text-xs font-medium p-2 leading-6">
                Rest and recharge during your flight with extended leg room,
                personalized service, and a multi-course meal service
              </p>
              <div className="p-2 flex flex-col gap-3 text-xs">
                <p>
                  <span className="text-green-600"> ✔</span> Extended leg room
                </p>
                <p>
                  <span className="text-green-600"> ✔</span> First two checked
                  bags free
                </p>
                <p>
                  <span className="text-green-600"> ✔</span> Priority boarding
                </p>
                <p>
                  <span className="text-green-600"> ✔</span> Enhanced food and
                  drink service
                </p>
                <p>
                  <span className="text-green-600"> ✔</span> Seats that recline
                  40% more than
                </p>
                
              </div>
            </div>
          </div>
          <div>
            <div className="Total-seats  h-40 text-black mt-5 ml-3">
              <p className="text-xs font-medium">
              <span className="w-10 text-white py-2 px-4 mt-3 m-2 bg-zinc-500 rounded">Booked</span>
              <span className="w-10 text-white py-2 px-4 mt-3 m-2 bg-[#16948E] rounded">Available</span>
              <span className="w-10 text-white py-2 px-4 mt-3 m-2 bg-[#EF4444] rounded">Selected</span>
            </p>
            <div className="flex justify-start items-center flex-wrap  ">
              <p className="mt-4 font-serif">Bussiness Seats</p>
                {selectedBusinessSeats.length > 0 && selectedBusinessSeats.map((BusinessClassSeatSelection ,index) =>(
                  <div key={index} className="flex items-center gap-1 mt-5 ml-5">
                    <p className="text-sm bg-amber-400 p-2 font-medium rounded ">{BusinessClassSeatSelection.seatNumber}</p>
                    <button className="absolute mb-8 ml-5 text-xl font-semibold text-red-700 rounded-lg"
                            onClick={() => RemoveSelectedSeat(BusinessClassSeatSelection.seatIndex)}
                    ><MdDeleteForever/></button>
                  </div>
                ))}
            </div>

            <div className="flex justify-start items-center flex-wrap ">
              <p className="mt-4 font-serif">Economy Seats</p>
                {selectedEconomySeats.length > 0 && selectedEconomySeats.map((EconomyClassSeatSelection ,index) =>(
                  <div key={index} className="flex items-center gap-1 mt-5 ml-5">
                    <p className="text-sm bg-amber-400 p-2 font-medium rounded ">{EconomyClassSeatSelection.seatNumber}</p>
                    <button className="absolute mb-8 ml-5 text-xl font-semibold text-red-700 rounded-lg"
                            onClick={() => RemoveEconomySelectedSeat(EconomyClassSeatSelection.seatIndex)}
                    ><MdDeleteForever/></button>
                  </div>
                ))}
            </div>

                <div className="Confirm-book mt-5">
                  <button 
                    onClick={HandleBookTicket}
                    disabled={selectedBusinessSeats.length === 0 && selectedEconomySeats.length === 0}
                    className={`px-4 py-2 flex justify-center items-center gap-2 text-md font-semibold text-white rounded-lg
                      ${selectedBusinessSeats.length === 0 && selectedEconomySeats.length === 0 
                        ? 'bg-[#1898be] opacity-50 cursor-not-allowed' 
                        : 'bg-[#1898be] hover:bg-[#ff7d31] cursor-pointer'
                      }`}
                  >
                    Confirm Booking 
                    <MdAirplaneTicket style={{width: 25 , height:25}}/>
                  </button>
                </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer/> */}
    </>
  );
};

export default SeatSelection;

