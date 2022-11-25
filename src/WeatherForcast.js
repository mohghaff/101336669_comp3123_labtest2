import React, { useState, useEffect } from "react";
import image from "./assets/seasons.webp";
import imageDark from "./assets/dark.jpg";

const today = (d) => {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const day = days[d.getDay()];
  return `${day} `;
};

function WeatherForcast() {
  const [weather, setWeather] = useState({});
  const [locations, setLocations] = useState("toronto");

  useEffect(() => {
    ifClicked();
  }, []);

  function ifClicked() {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${locations}&units=metric&appid=533ecdf81460d7fd12d77753976270ab`
    )
      .then((res) => {
        if (res.ok) {
          console.log(res.status);
          return res.json();
        } else {
          if (res.status === 404) {
            return alert("Wrong location");
          }
          throw new Error("You have an error");
        }
      })
      .then((object) => {
        setWeather(object);
        console.log(weather);
      })
      .catch((error) => console.log(error));
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${locations}&units=metric&appid=533ecdf81460d7fd12d77753976270ab`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("There was a mistake");
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  }
  return (
    <div
      style={{
        boxSizing: "border-box",
        margin: 10,
        padding: 0,
        backgroundImage: `url(${image})`,
        backgroundRepeat: "no-repeat",
        borderRadius: 10,
      }}
    >
      
      <div
        style={{
          width: "15%",
          height: "400px",
          position: "relative",
          paddingLeft: 10,
          backgroundImage: `url(${imageDark})`,
          backgroundRepeat: "repeat",
          borderRadius: 10,
        }}
      >
        <div>
          <input
            type="text"
            value={locations}
            onChange={(e) => setLocations(e.target.value)}
            placeholder="Enter location"
            className="location_input"
          />
          <button className="location_searcher" onClick={ifClicked}>
            Search Location
          </button>
        </div>
        <div style={{ flex: 1, border: 1, alignItems: "center" }}>
          <h1 style={{ color: "white" }}>{weather.name}</h1>
        </div>

        <div
          style={{
            flex: 1,
            alignItems: "center",
            flexDirection: "row",
            marginTop: 10,
          }}
        >
          <h3 style={{ color: "white", fontWeight: "bold" }}>
            {today(new Date())}
          </h3>

          <p style={{ color: "white", fontWeight: "bold" }}>
            {Math.round(weather?.main?.temp)}°C
          </p>

          <p style={{ color: "white", fontWeight: "bold" }}>
            Humidity : {weather?.main?.humidity}%
          </p>
          <p style={{ color: "white", fontWeight: "bold" }}>
            Feels like : {Math.round(weather?.main?.feels_like)}°C
          </p>
          <p style={{ color: "white", fontWeight: "bold" }}>
            Pressure : {weather?.main?.pressure}
          </p>
          <p style={{ color: "white", fontWeight: "bold" }}>
            Max temp : {Math.round(weather?.main?.temp_max)}°C
          </p>
          <p style={{ color: "white", fontWeight: "bold" }}>
            Min temp : {Math.round(weather?.main?.temp_min)}°C
          </p>
          <p style={{ color: "white", fontWeight: "bold" }}>
            Wind : {weather?.wind?.speed} km/h
          </p>
        </div>
      </div>
    </div>
  );
}

export default WeatherForcast;
