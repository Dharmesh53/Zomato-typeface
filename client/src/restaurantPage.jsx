import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const RestaurantPage = () => {
  const { id } = useParams();
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetcher = async () => {
      const response = await axios.get(
        `http://localhost:8080/api/v1/restaurant/${id}`
      );
      const res = response.data;
      setResult(res);
    };
    fetcher();
  }, [id]);

  if (!result) {
    return <div className="text-black">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 font-rale text-black">
      <h1 className="text-3xl font-bold mb-4">{result.restaurant_name}</h1>
      <ul className="space-y-2">
        {Object.entries(result).map(([key, value]) => (
          <li key={key}>
            <strong className="capitalize">{key.replace(/_/g, " ")}:</strong>{" "}
            {Array.isArray(value) ? value.join(", ") : value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantPage;
