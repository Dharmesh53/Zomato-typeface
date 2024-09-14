import { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { TiLocationArrow } from "react-icons/ti";
import axios from "axios";
import { FaHouseUser } from "react-icons/fa";
import RestaurantCard from "./restaurantCard.jsx";

const Home = () => {
  const [inputLocation, setInputLocation] = useState("");
  const [result, setResult] = useState();
  const [currentLocation, setCurrentLocation] = useState({
    lat: null,
    long: null,
  });

  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
      });
    }
  };

  console.log(currentLocation);

  const fetcher = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/v1/restaurants?offset=1&limit=9"
    );
    const res = response.data;
    setResult(res);
  };

  useEffect(() => {
    fetcher();
  }, []);

  return (
    <div className="h-lvh font-rale font-medium">
      <div className="front-page flex items-center">
        <div className="flex mx-8 gap-1 relative">
          <div className="absolute pt-2 pl-2 text-black flex items-center">
            <TiLocationArrow size={30} />
          </div>
          <input
            className="bg-white text-black p-2 pl-9 w-96 outline-none border-2 focus-within:border-black rounded text-lg"
            placeholder="Enter your delivery address"
            value={inputLocation}
            onChange={(e) => setInputLocation(e.target.value)}
          />
          <button className="bg-black rounded flex items-center text-xl gap-1  px-2 text-white">
            <IoSearch size={25} className="text-white" /> Search
          </button>
          <button
            className="bg-black rounded flex items-center text-xl gap-1  px-2 text-white"
            onClick={getLocation}
          >
            <FaHouseUser className="mr-2" />
            Use Current Location
          </button>
        </div>
      </div>
      <div className="flex justify-center min-h-screen">
        <div className="grid grid-cols-3 gap-4 max-w-6xl">
          {result?.map((item, i) => (
            <RestaurantCard key={i} item={item} />
          ))}
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Home;
