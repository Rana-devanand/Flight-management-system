import React, { useState } from "react";
import RunwayImage from "../assets/images/Windsock.jpg";
import "../assets/css/Airport.css";
import { useNavigate } from "react-router-dom";

function Airports() {
  const navigate = useNavigate();

  const [value, setValue] = useState({
    airport: "",
  });

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="bg-zinc-800 h-auto w-full text-white flex justify-center">
      <img
        className="fixed w-full h-auto brightness-50"
        src={RunwayImage}
        alt=""
      />
      <div className="absolute flex w-[80%] mx-auto">
        <div className="w-full mt-10 ml-16 ">
          <h1 className="airport-h1 text-3xl">Airport Conditions</h1>
          <p className="text-sm mt-2">Enter Airport Name </p>

          <form action="" onSubmit={HandleSubmit}>
            <input
              className="w-[50%] p-2 rounded bg-zinc-300 text-black outline-none border "
              placeholder="Example : AA or American Airline"
              type="text"
              name="airport"
              onChange={handleChange}
            />
            <br />
            <button
              className="px-16 mt-6 py-2 bg-[#FAA718]"
              onClick={() => {
                navigate("/AirportDetails", { airport: value });
              }}
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </div >
  );
}

export default Airports;
