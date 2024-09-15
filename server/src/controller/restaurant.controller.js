import Restaurant from "../db/restaurant.js";
import axios from "axios";

export const getRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send("Pleasee provide the id");
    }
    const restaurant = await Restaurant.findOne({ restaurant_id: id });
    return res.status(200).json(restaurant);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const getAllRestaurant = async (req, res) => {
  try {
    let { limit, offset } = req.query;
    if (!limit || !offset) {
      return res.status(400).send("Please enter limit and offset");
    }

    const maxLimit = 20;
    limit = Math.min(limit, maxLimit);

    const totalRestaurants = await Restaurant.countDocuments();

    const restaurants = await Restaurant.find()
      .skip((offset - 1) * limit)
      .limit(limit);

    return res.status(200).json({ restaurants, totalRestaurants });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const toRadians = (degree) => degree * (Math.PI / 180);

  const R = 6371;
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;
  return distance;
};

export const getRestaurantByLocation = async (req, res) => {
  try {
    const { address, dist } = req.query;
    if (!address || !dist) {
      return res.status(400).send("Address is required");
    }

    const coordsRes = await axios.get(
      `https://geocode.maps.co/search?q=${address}&api_key=${process.env.X_GEOCODE_API}`
    );
    const result = coordsRes.data;

    const lat = result[0].lat;
    const lon = result[0].lon;

    const allRestaurants = await Restaurant.find();

    const nearbyRestaurants = allRestaurants.filter((restaurant) => {
      const restaurantLat = restaurant.latitude;
      const restaurantLon = restaurant.longitude;
      const distance = haversineDistance(
        lat,
        lon,
        restaurantLat,
        restaurantLon
      );
      return distance <= dist;
    });
    return res.status(200).json(nearbyRestaurants);
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

export const getMyLocation = async (req, res) => {
  try {
    const { lat, lon } = req.query;
    const coordsRes = await axios.get(
      `https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}&api_key=${process.env.X_GEOCODE_API}`
    );
    const result = coordsRes.data;
    console.log(result);
    return res.status(200).send("sdnfjk");
  } catch (error) {
    return res.status(500).send(e.message);
  }
};
