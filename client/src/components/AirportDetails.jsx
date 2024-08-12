import React, { useState } from "react";
import skyImage from "../assets/images/sky.jpg";
import GoogleMap from "../components/Map/GoogleMap";
import windImage from "../assets/images/wind.png";
import HumidityImage from "../assets/images/humidity.png";
import minTemp from "../assets/images/min.png";
import maxTemp from "../assets/images/max.png";
import { useLocation } from "react-router-dom";
import Footer from "./Footer";

function AirportDetails() {
  const CurrentDate = new Date().toUTCString();

  // const location = useLocation();
  // const airport = location.state || {};
  const [weatherData, setWeatherData] = useState(null);
  const [image, setImage] = useState(null);

  useState(() => {
    const API_KEY = `a28f7d4fff30725ae2415189320ed654`;
    const getWeather = async (city) => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      const response = await fetch(url);
      const data = await response.json();
      setImage(
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      );
      setWeatherData(data);
    };
    getWeather("Odisha");
  }, []);

  const [value, setValue] = useState();
  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="bg-zinc-800 h-auto w-full text-white flex justify-center">
        <img
          className="relative w-full h-auto brightness-50"
          src={skyImage}
          alt=""
        />
        <div className="absolute flex w-[80%] mx-auto flex-col">
          <div className="w-full mt-2 ml-16 ">
            <h1 className="airport-h1 text-3xl">Search for an Airport</h1>
            <form action="" onSubmit={() => HandleSubmit}>
              <input
                className="w-[50%] p-2 rounded bg-zinc-300 text-black outline-none border "
                placeholder="Example : AA or American Airline"
                name="city"
                type="text"
                onChange={handleChange}
              />

              <button className="px-16 mt-6 ml-5 py-2 bg-[#FAA718]">
                Search
              </button>
            </form>
          </div>
          <hr className="w-[95%] h-1 mx-auto bg-gray-100 border-0 rounded md:my-3 dark:bg-[#FAA718]" />
          <div className="flex justify-between px-3 py-2 flex-col h-auto">
            <div className="flex justify-between">
              <h1 className="text-3xl font-semibold">Airport Name</h1>
              <b>{CurrentDate}</b>
            </div>
            <p>Address : 7000 NE Airport Way, Portland OR, US 97218</p>
            <GoogleMap city={"Roorkee"} />

            <h1 className="text-2xl font-semibold mt-10">City-Name</h1>
            {/* Airport details */}
            {weatherData ? (
              <div className="flex gap-10 text-center ">
                <div className="w-36 h-40 border mt-3 ">
                  <h1>Temperature</h1>
                  <p className="">{weatherData.main.temp}°C</p>
                  <img className="w-full h-auto" src={image} alt="" />
                </div>

                <div className="w-36 h-40 border mt-3">
                  <h1>min Temperature</h1>
                  <p className="">{weatherData.main.temp_min}</p>
                  <img className="w-28 h-28 ml-2" src={minTemp} alt="" />
                </div>
                <div className="w-36 h-40 border mt-3">
                  <h1>max Temperature</h1>
                  <p className="">{weatherData.main.temp_max}</p>
                  <img className="w-28 h-28" src={maxTemp} alt="" />
                </div>
                <div className="relative w-36 h-40 border mt-3">
                  <h1>Wind</h1>
                  <p className="mt-[0%]">{weatherData.wind.speed}</p>
                  <img className="" src={windImage} alt="" />
                </div>
                <div className="w-36 h-40 border mt-3">
                  <h1>Humidity</h1>
                  <p className="">{weatherData.main.humidity} g/kg</p>
                  <img
                    className="w-28 h-24 mt-3 ml-3"
                    src={HumidityImage}
                    alt=""
                  />
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AirportDetails;
