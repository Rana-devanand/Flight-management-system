import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { GiCommercialAirplane } from "react-icons/gi";
import { FaArrowCircleRight } from "react-icons/fa";



function BookTicket() {
  const URL = import.meta.env.VITE_BACKEND_API_URL;
  const location = useLocation();
  const userData = location.state?.user;
  const flightId = userData.id;
  const userChoiceCost = parseFloat(userData.price);

  const [flightChoose, setChooseFlight] = useState({});
  // http://localhost:4000/api/V1/airplane/:id
  const getChooseFlightData = async () => {
    try {
      const response = await axios.get(`${URL}/api/V1/airplane/${flightId}`);
      const flightData = response.data.data;
      flightData.flightLogo = `${URL}/${flightData.flightLogo.replace(/\\/g, "/")}`;
      setChooseFlight(flightData);
    } catch (error) {
      console.error(error);
    }
  };  

  // console.log(flightChoose)

  useEffect(() => {
    getChooseFlightData();
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [countryName, setCountryName] = useState("");
  const [totalPassenger, setTotalPassenger] = useState("");
  const [totalFair, setTotalFair] = useState(userChoiceCost);

  const formData = new FormData();
  const handleSubmit = (e) => {
    e.preventDefault();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("countryName", countryName);
    formData.append("totalPassenger", totalPassenger);
    formData.append("flightId", flightId);
    formData.append("cost", userChoiceCost);
    formData.append("noOfSeats", totalPassenger);
  };

  const [passengerCount, setPassengerCount] = useState({
    adults: 1,
    children: 0,
    infantsInSeat: 0,
    infantsOnLap: 0,
  });

  const handleIncrement = (type) => {
    setPassengerCount((prevCount) => ({
      ...prevCount,
      [type]: prevCount[type] + 1,
    }));
  };

  const handleDecrement = (type) => {
    if (passengerCount[type] > 0) {
      setPassengerCount((prevCount) => ({
        ...prevCount,
        [type]: prevCount[type] - 1,
      }));
    }
  };

  const sendAllPassengerList = () => {
    const sum =
      passengerCount.adults +
      passengerCount.children +
      passengerCount.infantsInSeat +
      passengerCount.infantsOnLap;
    setTotalPassenger(sum);
    setTotalFair(sum * userChoiceCost);
  };

  return (
    <>
      <div class="min-h-screen  bg-gray-100 flex items-center justify-center">
        <div>
          <div class="bg-white rounded shadow-lg  w-full h-auto p-4 px-4 md:p-8 mb-6">
            <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-2  ">
              <div class="text-gray-600 ">
                  <img className="mb-10 w-full h-32" src={flightChoose.flightLogo} alt="" />
                <p class="font-medium text-lg">Personal Details</p>
                <p>Please fill out all the fields.</p>
              </div>

              <div class="lg:col-span-2 w-full">
                <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                  <div class="md:col-span-5">
                    <label for="full_name">Full Name</label>
                    <input
                      type="text"
                      name="full_name"
                      id="full_name"
                      class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      onClick={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div class="md:col-span-5">
                    <label for="email">Email Address</label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      placeholder="email@domain.com"
                      onClick={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div class="md:col-span-3">
                    <label for="address">Address / Street</label>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      placeholder=""
                      onClick={(e) => setAddress(e.target.value)}
                    />
                  </div>

                  <div class="md:col-span-2">
                    <label for="country">Country / region</label>
                    <div class="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <input
                        name="country"
                        id="country"
                        placeholder="Country"
                        class="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                        onClick={(e) => setCountryName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div class="md:col-span-2">
                    <label for="country">Choose Passengers</label>
                    <div class="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <input
                        name="passenger"
                        id="passenger"
                        placeholder="1 Adults, 2 Children"
                        value={totalPassenger}
                        class="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                        disabled
                      />
                    </div>
                    {/* ------------------- Passenger choice  ---------------------*/}
                    <div className="passenger-selector p-6 max-w-md mx-auto bg-[#fff] rounded-lg shadow-md space-y-6">
                      {/* <h2 className="text-2xl font-semibold">1 passenger</h2> */}

                      {/* Adults */}
                      <div className="passenger-group flex items-center justify-between">
                        <label htmlFor="adults" className="text-sm font-medium">
                          Adults
                        </label>
                        <div className="counter flex items-center space-x-4">
                          <button
                            onClick={() => handleDecrement("adults")}
                            className="bg-gray-200 text-gray-700 font-bold py-1 px-3 rounded focus:outline-none hover:bg-gray-300"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            id="adults"
                            value={passengerCount.adults}
                            readOnly
                            className="w-12 text-center bg-gray-50 border border-gray-300 rounded py-1 px-2 focus:outline-none"
                          />
                          <button
                            onClick={() => handleIncrement("adults")}
                            className="bg-gray-200 text-gray-700 font-bold py-1 px-3 rounded focus:outline-none hover:bg-gray-300"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Children */}
                      <div className="passenger-group flex items-center justify-between">
                        <label
                          htmlFor="children"
                          className="text-sm font-medium"
                        >
                          Children (aged 2-11)
                        </label>
                        <div className="counter flex items-center space-x-4">
                          <button
                            onClick={() => handleDecrement("children")}
                            className="bg-gray-200 text-gray-700 font-bold py-1 px-3 rounded focus:outline-none hover:bg-gray-300"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            id="children"
                            value={passengerCount.children}
                            readOnly
                            className="w-12 text-center bg-gray-50 border border-gray-300 rounded py-1 px-2 focus:outline-none"
                          />
                          <button
                            onClick={() => handleIncrement("children")}
                            className="bg-gray-200 text-gray-700 font-bold py-1 px-3 rounded focus:outline-none hover:bg-gray-300"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Infants (in seat) */}
                      <div className="passenger-group flex items-center justify-between">
                        <label
                          htmlFor="infants-in-seat"
                          className="text-sm font-medium"
                        >
                          Infants (in seat)
                        </label>
                        <div className="counter flex items-center space-x-4">
                          <button
                            onClick={() => handleDecrement("infantsInSeat")}
                            className="bg-gray-200 text-gray-700 font-bold py-1 px-3 rounded focus:outline-none hover:bg-gray-300"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            id="infants-in-seat"
                            value={passengerCount.infantsInSeat}
                            readOnly
                            className="w-12 text-center bg-gray-50 border border-gray-300 rounded py-1 px-2 focus:outline-none"
                          />
                          <button
                            onClick={() => handleIncrement("infantsInSeat")}
                            className="bg-gray-200 text-gray-700 font-bold py-1 px-3 rounded focus:outline-none hover:bg-gray-300"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Infants (on lap) */}
                      <div className="passenger-group flex items-center justify-between">
                        <label
                          htmlFor="infants-on-lap"
                          className="text-sm font-medium"
                        >
                          Infants (on lap)
                        </label>
                        <div className="counter flex items-center space-x-4">
                          <button
                            onClick={() => handleDecrement("infantsOnLap")}
                            className="bg-gray-200 text-gray-700 font-bold py-1 px-3 rounded focus:outline-none hover:bg-gray-300"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            id="infants-on-lap"
                            value={passengerCount.infantsOnLap}
                            readOnly
                            className="w-12 text-center bg-gray-50 border border-gray-300 rounded py-1 px-2 focus:outline-none"
                          />
                          <button
                            onClick={() => handleIncrement("infantsOnLap")}
                            className="bg-gray-200 text-gray-700 font-bold py-1 px-3 rounded focus:outline-none hover:bg-gray-300"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="buttons flex justify-end space-x-4">
                        {/* <button className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg focus:outline-none hover:bg-red-600">
                          Cancel
                        </button> */}
                        <button
                          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg focus:outline-none hover:bg-blue-600"
                          onClick={sendAllPassengerList}
                        >
                          Done
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* ------------------     Passenger choice End  ------------------*/}

                  <div class="md:col-span-2 mt-20 ml-28">
                    <label className="text-xl font-semibold" for="soda">
                      Your Choice Fair
                    </label>
                    <span className="italic text-lg mt-2 font-serif text-green-500">
                      {" "}
                      ₹ {userChoiceCost}{" "}
                    </span>

                    <p className="text-xl font-semibold mt-5">
                      {" "}
                      Total fair :{" "}
                      <span className="text-green-600">₹ {totalFair}</span>{" "}
                    </p>
                  </div>

                  <div class="md:col-span-5 text-right">
                    <div class="inline-flex items-end">
                      {/* <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Book Ticket
                      </button> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ----------------------- FLights Details :----------------------- */}

            <h1 className="text-xl font-semibold italic">FLights Details : </h1>
            <div
              // key={id}
              className="flex w-full h-auto bg-[#f7d0ff] border-2 border-blue-100  shadow-2xl rounded-lg text-lg font-semibold"
            >
              <div className="w-[35%] p-3">
                <img className="w-36 ml-6" src={flightChoose.flightLogo} alt="" /> 
                <p className="text-2xl ml-10 mt-2">{flightChoose.Airline} </p>
                <p className="mt-10  text-[#747474]">Model No</p>
                <p className="text-xl">{flightChoose.modelNo}</p>
                {/* <p className="mt-5">
                  <span className="text-[#747474]">Date :</span> {currentDate} <br />
                  <span className="text-[#747474]">Time :</span> {flight.DepartureTime} -  {flight.ArrivalTime} IST 
                </p> */}
              </div>

              <div className=" w-[44%] text-center mr-7 ">
                <p className="flex mt-14 text-3xl gap-5 font-semibold justify-center">
                  {flightChoose.Departure}
                  <p className="mt-2">
                    <GiCommercialAirplane />
                  </p>{" "}
                  {flightChoose.Arrival}{" "}
                </p>
                <div className="flex justify-around">
                  <p>{flightChoose.DepartureTime} </p>
                  <p>{flightChoose.ArrivalTime}</p>
                </div>
                <div className="mt-10">
                  <p className="text-xl">
                    <b>JOHN/DOE</b>
                  </p>
                </div>
              </div>
                    
              <div className="w-[24%] mr-5">
                <div className="border w-full h-52  bg-pink-800 m-2 rounded-xl text-center">
                  <button
                    className="w-40 ml-4 mt-20 text-white py-3 px-4 bg-pink-500 rounded flex justify-center gap-2"
                    // onClick={() => HandleBook(flight.id)}
                  >
                    Book Now
                    <p className="w-7 mt-1 text-xl">
                      <FaArrowCircleRight />
                    </p>
                  </button>
                </div>
              </div>
              </div>

              
            {/* flight end  */}
          </div>
        </div>
      </div>
    </>
  );
}

export default BookTicket;
