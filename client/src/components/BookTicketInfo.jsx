import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../assets/images/card.jpg";
import axios from "axios";

function BookTicketInfo() {
  const location = useLocation();
  const userData = location.state;
  const FlightId = userData.flightId;
  const navigate = useNavigate();

  const [updateUserData , setupdateUserdata] = useState({});
  const URL = import.meta.env.VITE_BACKEND_API_URL;


    const [flightChoose, setChooseFlight] = useState({});
    // http://localhost:4000/api/V1/airplane/:id
    const getChooseFlightData = async () => {
      try {
        const response = await axios.get(`${URL}/api/V1/airplane/${FlightId}`);
        const flightData = response.data.data;
     //    console.log(flightData);
     //    flightData.flightLogo = `${URL}/${flightData.flightLogo.replace(/\\/g, "/")}`;
        setChooseFlight(flightData);
      } catch (error) {
        console.error(error);
      }
    }; 

    const [bookUserData , setUserData] = useState({});
    // http://localhost:4000/api/V1/getByEmail
    const geyUserDetails = async () => {
          try {
               const email = localStorage.getItem('email');
               const url = `${URL}/api/V1/getByEmail/${email}`;
               const response = await axios.get(url);
               const data = response.data.data;
               // console.log(data);
               setUserData(data);
          } catch (error) {
               console.error(error);
          }
    }

    const MakePayment =() =>{
          navigate("/PaymentSuccess" ,  { state:  updateUserData } );
    }

    useEffect(()=>{
     getChooseFlightData();
     geyUserDetails();
     const updateTotalFairData = ({...userData , totalFair : userData.cost * userData.noOfSeats})
     setupdateUserdata(updateTotalFairData)

    },[])
  return (
    <>
      <div className=" w-[90%] m-auto  flex">
        <div className="w-[30%] mt-5">
          <div className="bg-blue-500 text-white p-6 rounded-md">
            <h2 className="text-xl font-bold mb-4"> {flightChoose.Airline} &rarr; {flightChoose.modelNo}</h2>

            <div>
              <h3 className="font-bold text-lg">Ticket</h3>
              <div className="mt-2">
                <div className="">
                  <div className="flex justify-between">
                    <span> {flightChoose.Departure} &rarr; {flightChoose.Arrival} </span>
                    <p className="font-bold">2 TER</p>
                  </div>
                  <p className="text-sm">
                    {flightChoose.Remark}  {flightChoose.DepartureTime} &rarr; {flightChoose.ArrivalTime} 
                  </p>
                  <p className="text-sm">1 x Bag | 40 x 20 x 20 cm</p>
                </div>
                {/* <div className="border border-spacing-2 mt-3"></div> */}

                <div className="mt-10">
                  <p className="font-semibold text-lg">Return :</p>
                  <div className="flex justify-between mt-2">
                    <span> City From &rarr; City TO </span>
                    <p className="font-bold">5 TER</p>
                  </div>
                  <p className="text-sm">
                    Day : DepartureTime &rarr; ArrivalTime{" "}
                  </p>
                  <p className="text-sm">1 x Bag | 40 x 20 x 20 cm</p>
                </div>
              </div>
            </div>
            <div className="border border-spacing-2 mt-10 mb-10"></div>

            <div className="mb-6 mt-6">
              <h3 className="font-bold">Your Luggage</h3>
              <p> 2 Trolley | 1 Suitcase</p>
            </div>
            <div className="border border-spacing-2 mt-10 mb-10"></div>

            <div className="flex justify-between items-center">
              <span className="font-bold">Total</span>
              <span className="font-bold text-xl italic text-green-400">
              ₹ {userData.cost * userData.noOfSeats} 
              </span>
            </div>
          </div>
        </div>
        {/* ------------------------------------------- */}
        <div className="w-[70%] mt-5 shadow-2xl ">
          <div className="bg-white p-6 rounded-md ">
               <h2 className="font-bold text-xl ml-64">Invoice Details</h2>
            <div className="flex justify-between">
              <div className="Personal ml-8 flex flex-col gap-2">
                <p className="font-semibold">{userData.name}</p>
                <p className="font-semibold">{bookUserData.number}</p>
                <p className="font-semibold">{userData.address}</p>
                <p className="font-semibold">{userData.email}</p>

              </div>
              <div>
               
              </div>
              {/* <button className="text-blue-500 underline">edit</button> */}
              <div className=" my-auto mr-3 rounded-md ">
                <img className="w-72 rounded-md" src={Card} alt="" />
              </div>
            </div>
          </div>

          <div className="">
            <div className="bg-white p-2 mx-10 rounded-md shadow-2xl">
              <h2 className="font-bold text-lg bg-blue-300 p-3">Payment Card</h2>

              <div className="mt-4">
                <label className="block mb-2">Card number</label>
                <input
                  type="text"
                  className="w-full border p-2 rounded-md text-zinc-500"
                  //  value=""
                  placeholder="4569 XXXX XXXX XXXX"
                />

                <div className="flex mt-4 space-x-4">
                  <div className="w-1/2">
                    <label className="block mb-2">Card Holder Name:</label>
                    <input
                      type="text"
                      className="w-full border p-2 rounded-md"
                      placeholder="ABCD"
                      // value=""
                    />
                  </div>
                  <div className="w-1/4">
                    <label className="block mb-2">
                      Valid Date / Expiry Date
                    </label>
                    <input
                      type="text"
                      className="w-full border p-2 rounded-md"
                      // value="12/24"
                      // readOnly
                      placeholder="12/26"
                    />
                  </div>
                  <div className="w-1/4">
                    <label className="block mb-2">CVC</label>
                    <input
                      type="text"
                      className="w-full border p-2 rounded-md"
                      placeholder="123"
                      // value="000"
                      // readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-between items-center ml-14">
               <div>
                    <input type="checkbox" id="saveCard" className="mr-2" />
                    <label htmlFor="saveCard">Save the Card</label>
               </div>

               <div>
                    <button className="px-10 py-3 mr-10 bg-amber-500 rounded-md text-lg font-semibold"
                         onClick={MakePayment}
                    >Payment</button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookTicketInfo;
