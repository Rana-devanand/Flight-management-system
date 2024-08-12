import React, { useEffect } from "react";

function GoogleMap({ city }) {
     useEffect(async () => {
          const API_KEY = `a28f7d4fff30725ae2415189320ed654`;

          const getWeather = async (city) => {
               console.log(city);
               const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
               const response = await fetch(url);
               const data = await response.json();
               return data;
          };
          const weatherData = await getWeather(city);
          console.log(weatherData);

          // Dynamically load the Google Maps script
          const script = document.createElement("script");
          script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDRUyLVof4O4LDodtuStfWuOKJDUJ6exQ8&callback=initMap`;
          script.async = true;
          document.body.appendChild(script);

          // Initialize the map after the script is loaded
          script.onload = () => {
               window.initMap = function () {
                    var mapProp = {
                         center: new window.google.maps.LatLng(
                              weatherData.coord.lat,
                              weatherData.coord.lon
                         ),
                         zoom: 10,
                         mapTypeId: google.maps.MapTypeId.HYBRID,
                    };

                    var map = new window.google.maps.Map(
                         document.getElementById("googleMap"),
                         mapProp,
                    );
               };

               // Call the callback function directly if the script has already loaded
               if (window.google && window.google.maps) {
                    window.initMap();
               }
          };

          return () => {
               // Clean up script when the component unmounts
               document.body.removeChild(script);
          };
     }, []);

     return (
          <div
               className="mt-10 border"
               id="googleMap"
               style={{ width: "80%", height: "500px" }}
          ></div>
     );
}

export default GoogleMap;
