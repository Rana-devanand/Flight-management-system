import React from "react";
import skyImage from "../assets/images/sky.jpg";
import Footer from "./Footer";

function Flight() {
  return (
    <>
      <div className="bg-zinc-800 h-auto w-full text-white flex justify-center">
        <img className="relative w-full h-auto brightness-50" src={skyImage} alt="" />
        <div className="absolute w-[95%]">
          <h1 className="px-8 pt-5 text-2xl font-semibold"> Search Flights</h1>
          <hr className="w-[95%] h-1 mx-auto bg-gray-100 border-0 rounded md:my-3 dark:bg-[#FAA718]" />
          <div className="Search-form w-[95%] mx-auto border h-80 ">
            <h4 className="w-full p-2 bg-[#5A7FA1] text-lg">Search by Flight</h4>
            <form>
              <div className="flex justify-between items-center w-[70%]">
                <label className="text-sm font-mono ml-12 mt-3 " htmlFor="">Airline</label>
                <label className="text-sm font-mono mr-[36%] mt-3" htmlFor="">Flight No</label>
              </div>

              <div className="flex justify-between items-center w-[70%]">
                <input className="font-serif text-xs ml-10 rounded w-96 p-3 mt-1 text-black outline-none bg-zinc-300 border" type="text" placeholder="Example : AA or American Airline" />

                <input className="font-serif text-xs ml-10 rounded w-96 p-3 mt-1 text-black outline-none bg-zinc-300 border" type="text" placeholder="Example : 200" />

              </div>
              <div className="flex flex-col ml-10 mt-5">
                <label className="ml-2 font-mono" htmlFor="">Date</label>
                <input className="w-[29%] text-black p-2 rounded-md text-sm outline-none bg-zinc-300 border" placeholder="Enter Flight Date" type="Date" />
              </div>

              <br />
              <button className="px-20 py-2 bg-[#c58413] ml-[35%] mt-6" type="submit"> Search</button>
            </form>
          </div>
        </div >

        {/* Search by Airport or Route */}

        <div className="absolute top-[80%] w-full">
          <div className="Search-form w-[90%] mx-auto border h-80 ">
            <h4 className="w-full p-2 bg-[#5A7FA1] text-lg">Search by Airport or Route</h4>
            <form>
              <div className="flex justify-between items-center w-[70%]">
                <label className="text-sm font-mono ml-12 mt-3 " htmlFor="">Departure Airport</label>
                <label className="text-sm font-mono mr-[30%] mt-3" htmlFor="">Arrival Airport</label>
              </div>

              <div className="flex justify-between items-center w-[70%]">
                <input className="font-serif text-xs ml-10 rounded w-96 p-3 mt-1 text-black outline-none bg-zinc-300 border" type="text" placeholder="Example : Chhatrapati Shivaji International Airport" />

                <input className="font-serif text-xs ml-10 rounded w-96 p-3 mt-1 text-black outline-none bg-zinc-300 border" type="text" placeholder="Example : Shaheed Bhagat Singh International Airport, Chandigarh" />

              </div>

              <div className="flex justify-between items-center w-[70%]">
                <label className="text-sm font-mono ml-12 mt-3 " htmlFor="">Airline</label>
                {/* <label className="text-sm font-mono mr-[30%] mt-3" htmlFor="">Arrival Airport</label> */}
                <label className="text-sm font-mono mr-[40%] mt-3" htmlFor="">Date</label>
              </div>

              <div className="flex justify-between items-center w-[70%]">
                <input className="font-serif text-xs ml-10 rounded w-96 p-3 mt-1 text-black outline-none bg-zinc-300 border" type="text" placeholder="Example : AA or American Airline" />
                <input className="font-serif text-xs rounded  w-96 p-3 mt-1 text-black outline-none bg-zinc-300 border" type="Date" />
              </div>
              <br />
              <button className="px-20 py-2 bg-[#c58413] ml-[35%] mt-6" type="submit"> Search</button>
            </form>
          </div>
        </div >


        {/* Other Flight Option  */}
        <div className="absolute -bottom-[65%] w-full">
          <div className="Search-form w-[90%] mx-auto border h-52">
            <h4 className="w-full p-2 bg-[#5A7FA1] text-lg">Other Flight Option</h4>

            <form className="flex justify-start items-center flex-col">
              <div className="w-[80%] py-2 px-3 border-2 border-[#c58413] mt-3 text-center text-xl font-semibold flex justify-between">
                Just want to see the flight tracker?
                <button className="px-20 py-2 bg-[#c58413] text-xl" type="submit"> Search</button>
              </div>
              <div className="w-[80%] py-2 px-3 border-2 border-[#c58413] mt-3 text-center text-xl font-semibold flex justify-between">
                Flights details
                <button className="px-[9%] py-2 bg-[#c58413] text-lg" type="submit">Visit</button>
              </div>
            </form>

          </div>
        </div >

      </div >
      <Footer />
    </>
  );
}

export default Flight;
