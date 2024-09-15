import {
  getRestaurant,
  getAllRestaurant,
  getRestaurantByLocation,
  getMyLocation,
} from "../controller/restaurant.controller.js";

export default (router) => {
  router.get("/restaurants", getAllRestaurant);
  router.get("/restaurant/:id", getRestaurant);
  router.get("/restaurantBylocation", getRestaurantByLocation);
  router.get("/getMyLocation", getMyLocation);
};
