import { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { TiLocationArrow } from "react-icons/ti";
import axios from "axios";
import RestaurantCard from "./restaurantCard.jsx";
import Pagination from "./pagination.jsx";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const page = searchParams.get("page") || 1;

  const [inputLocation, setInputLocation] = useState("");
  const [paginate, setPaginate] = useState({
    current: Number(page),
    maxPage: 1,
    limit: 9,
  });

  const [result, setResult] = useState([]);

  const handleLocationSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8080/api/v1/restaurantBylocation?address=${inputLocation}&dist=3`
      );
      const res = response.data;
      setResult(res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetcher = async () => {
      const response = await axios.get(
        `http://localhost:8080/api/v1/restaurants?offset=${paginate.current}&limit=${paginate.limit}`
      );
      const res = response.data;
      setResult(res.restaurants);
      setPaginate((prev) => ({
        ...prev,
        maxPage: Math.ceil(res.totalRestaurants / paginate.limit),
      }));
    };
    fetcher();
  }, [paginate.current, paginate.limit]);

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
          <button
            className="bg-black rounded flex items-center text-xl gap-1 px-2 text-white"
            onClick={handleLocationSearch}
          >
            <IoSearch size={25} className="text-white" /> Search
          </button>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center">Loading...</div>
      ) : (
        <>
          <div className="flex justify-center min-h-screen">
            <div className="grid grid-cols-3 gap-4 max-w-6xl">
              {result?.map((item, i) => (
                <RestaurantCard key={i} item={item} />
              ))}
            </div>
          </div>
          <div>
            {result && (
              <Pagination
                pages={paginate.maxPage}
                paginate={paginate}
                setPaginate={setPaginate}
                setSearchParams={setSearchParams}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
