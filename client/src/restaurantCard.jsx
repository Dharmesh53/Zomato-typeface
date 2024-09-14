import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const RestaurantCard = ({ item }) => {
  return (
    <div className="max-w-sm mx-auto my-4 bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          {item.restaurant_name}
        </h2>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Address:</span> {item.address}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          <span className="font-semibold">Locality:</span>{" "}
          {item.locality_verbose}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          <span className="font-semibold">Cuisines:</span>{" "}
          {item.cuisines.join(", ")}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          <span className="font-semibold">Average Cost for Two:</span>{" "}
          {item.average_cost_for_two} {item.currency}
        </p>
        <div className="flex items-center mt-3">
          <div
            className={`text-sm text-white px-2 py-1 rounded bg-${item.rating_color
              .replace(" ", "-")
              .toLowerCase()}`}
          >
            Rating: {item.aggregate_rating}
          </div>
        </div>
        <div>
          <Link to={`/restaurant/${item.restaurant_id}`}>
            <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

RestaurantCard.propTypes = {
  item: PropTypes.shape({
    restaurant_id: PropTypes.string.isRequired,
    restaurant_name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    locality_verbose: PropTypes.string.isRequired,
    cuisines: PropTypes.arrayOf(PropTypes.string).isRequired,
    average_cost_for_two: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    aggregate_rating: PropTypes.string.isRequired,
    rating_color: PropTypes.string.isRequired,
    votes: PropTypes.string.isRequired,
  }).isRequired,
};

export default RestaurantCard;
