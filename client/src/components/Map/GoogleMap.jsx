import React, { useEffect, useRef } from "react";

function GoogleMap({ city }) {
  const mapRef = useRef(null);
  const MAP_API = import.meta.env.VITE_API_MAP_API_KEY;
  const WEATHER_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    let map;

    const getWeather = async () => {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_KEY}&units=metric`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Google map: ", error);
      }
    };

    const loadMap = async () => {
      const weatherData = await getWeather(city);

      if (!weatherData || !weatherData.coord) {
        console.error("Weather data not available");
        return;
      }

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${MAP_API}&callback=initMap`;
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        window.initMap = function () {
          const mapProp = {
            center: new window.google.maps.LatLng(
              weatherData.coord.lat,
              weatherData.coord.lon
            ),
            zoom: 10,
            mapTypeId: window.google.maps.MapTypeId.HYBRID,
          };

          map = new window.google.maps.Map(
            document.getElementById("googleMap"),
            mapProp
          );
          mapRef.current = map;
        };

        if (window.google && window.google.maps) {
          window.initMap();
        }
      };

      return () => {
        if (mapRef.current) {
          mapRef.current = null;
        }
        document.body.removeChild(script);
      };
    };

    loadMap();
  }, [city]);

  return (
    <div
      className="mt-10 border"
      id="googleMap"
      style={{ width: "80%", height: "500px" }}
    ></div>
  );
}

export default GoogleMap;
