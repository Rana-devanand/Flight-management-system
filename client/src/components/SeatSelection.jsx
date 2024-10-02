import React, { useState } from "react";
// Import the CSS
import "../assets/css/SeatSelection.css";
import flightLeftWing from "../assets/images/flightLeftWing1.png";
import flightRightWing from "../assets/images/flightRightWing.png";
import FlightBack from "../assets/images/FlightBack.png";
import seat1 from "../assets/images/businessSeat.png";
import seat2 from "../assets/images/EconomySeat.png";

const SeatSelection = () => {
  // Create a 2D array to represent seats (0: available, 1: selected, 2: booked)
  const initialSeatsForBusiness = [
    [0, 0, 0, 0, 0],
    [2, 2, 0, 0, 0],
    [0, 0, 0, 0, 2],
    [2, 0, 2, 2, 0],
    [0, 0, 0, 0, 2],
  ];

  const initialSeatsForEconomy = [
    [0, 2, 0, 0, 0],
    [2, 0, 0, 2, 0],
    [0, 0, 0, 0, 2],
    [0, 0, 2, 2, 0],
    [0, 0, 0, 0, 2],
    [0, 0, 0, 0, 2],
    [0, 0, 2, 2, 0],
    [0, 0, 0, 0, 0],
  ];

  const [seats, setSeats] = useState(initialSeatsForBusiness);
  const [seatsForEconomy, setSeatsForEconomy] = useState(
    initialSeatsForEconomy
  );

  // Handle seat click
  const handleSeatClick = (rowIndex, seatIndex) => {
    if (seats[rowIndex][seatIndex] === 2) return; // Do nothing if the seat is booked

    const newSeats = seats.map((row, rIndex) =>
      row.map((seat, sIndex) => {
        if (rIndex === rowIndex && sIndex === seatIndex) {
          return seat === 1 ? 0 : 1; // Toggle between selected and available
        }
        <div
          key={seatIndex}
          className={`seat ${
            seat === 1 ? "selected" : seat === 2 ? "booked" : "available"
          }`}
          onClick={() => handleSeatClick(rowIndex, seatIndex)}
        />;
        return seat;
      })
    );
    setSeats(newSeats);
  };

  const handleSeatClickOnBusiness = (rowIndex, seatIndex) => {
    if (seatsForEconomy[rowIndex][seatIndex] === 2) return; // Do nothing if the seat is booked

    const newSeats = seatsForEconomy.map((row, rIndex) =>
      row.map((seat, sIndex) => {
        if (rIndex === rowIndex && sIndex === seatIndex) {
          return seat === 1 ? 0 : 1; // Toggle between selected and available
        }
        return seat;
      })
    );
    setSeatsForEconomy(newSeats);
  };

  var rowsB = 1;
  var rowsE = 1;
  return (
    <>
      <div className="bg-zinc-100 w-full flex justify-between">
  <div className="w-[55%] h-screen relative">
    {/* <img
      className="absolute w-[27%] mt-[33%]"
      src={flightLeftWing}
      alt=""
    />
    <img
      className="absolute w-[45%] ml-[55%] mt-[19%]"
      src={flightRightWing}
      alt=""
    /> */}

    <div className="w-[45%] mx-auto rounded-t-full mt-5 bg-[#CACBFF] ">
      <div className="ml-[7%] mt-8 flex">
        <div className="w-32 h-20 ml-2 mt-10 bg-[#D8D8FF] rounded-ss-full"></div>
        <div className="w-32 h-20 ml-1 mt-10 bg-[#D8D8FF] rounded-se-full"></div>
      </div>
      <div className="w-[82%] h-1 ml-10 mt-16 bg-[#D8D8FF]"></div>

      {/* Scrollable Seat Layout */}
      <div className="border w-80 mx-auto mt-3 bg-[#EAEBFF] rounded-md h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-300">
        {/* Business Class Section */}
        <div className="plane-layout pt-2 mt-3 w-[92%] mx-auto bg-[#FFFFFF]">
          <p className="pb-2">For Business class</p>
          {seats.map((row, rowIndex) => (
            <div className="seat-row p-2" key={rowIndex}>
              {rowsB++}
              {row.map((seat, seatIndex) => (
                <div
                  key={seatIndex}
                  className={`seat ml-2 ${
                    seatIndex == 2
                    ? "cursor"
                    : seat === 1
                    ? "selected"
                    : seat === 2
                    ? "BusinessBooked"
                    : "available"
                  }`}
                  onClick={() => handleSeatClick(rowIndex, seatIndex)}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Economy Class Section */}
        <div className="plane-layout w-[92%] mx-auto bg-[#FFFFFF]">
          <h1 className="pb-5">Economy Class</h1>
          {seatsForEconomy.map((row, rowIndex) => (
            <div className="seat-row p-2" key={rowIndex}>
              {rowsE++}
              {row.map((seat, seatIndex) => (
                <div
                  key={seatIndex}
                  className={`seat ml-2 ${
                    seatIndex == 2
                    ? "[  ]"
                    : seat === 1
                    ? "selected"
                    : seat === 2
                    ? "booked"
                    : "available"
                  }`}
                  onClick={() =>
                    handleSeatClickOnBusiness(rowIndex, seatIndex)
                  }
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
{/* </div> */}


{/* border border-[#d1d1d1] */}
        <div className="w-[50%] h-screen  text-[#FAFAFA] border border-amber-700">
          <div className="flex text-xs ">
            <div className="bg-[#27273F] px-5 p-2 ">
              <h1 className="font-semibold px-2 text-xl">SFO</h1>
              <span className="text-xs">Delhi</span>
            </div>
            <div className=" bg-[#27273F] px-3">
              <h1 className="text-4xl font-semibold mt-3"> &rarr;</h1>
            </div>
            <div className="bg-[#27273F] px-8 p-3">
              <h1 className="font-semibold px-2 text-xl">NRT</h1>
              <span className="text-xs">Punjab</span>
            </div>
            {/* Time */}
            <div className="bg-blue-600 p-3">
              <h1 className="font-semibold px-6 ">FEB 25</h1>
              <span className="text-xs font-mono">Departing </span>
            </div>
            <div className="bg-blue-600 p-3">
              <h1 className="font-semibold">7:00 AM</h1>
            </div>

            <div className="bg-[#27273F]  ">
              <h1 className="px-8">FEB 25</h1>
              <span className="px-7">Departing </span>
            </div>
            <div className="bg-[#27273F]">
              <h1 className="px-8">Time</h1>
            </div>
          </div>

          <div className="flex justify-center">
            <img className="w-[50%] " src={seat1} alt="" />
            <img className="w-[50%] " src={seat2} alt="" />
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
                <button className="px-4 text-xs font-semibold bg-[#4441E3] text-white rounded-lg">
                  Booked
                </button>
              </div>
              <p className="text-xs font-medium p-2 leading-6">
                Rest and recharge during your flight with extended leg room,
                personalized service, and a multi-course meal service
              </p>
              <div className="p-2 flex flex-col gap-3">
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
                <p>
                  <span className="text-green-600"> ✔ </span> economy
                </p>
              </div>
            </div>
          </div>
          <div>
            {/* <h1>
              <span className="text-green-600 bg-red-600 w-full ">✔</span>
              Extended leg room
            </h1> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default SeatSelection;

// Extended leg room
//
//
// Personalized service
//
//
//
