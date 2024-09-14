import {
  getRestaurant,
  getAllRestaurant,
} from "../controller/restaurant.controller.js";

export default (router) => {
  router.get("/restaurants", getAllRestaurant);
  router.get("/restaurant/:id", getRestaurant);
};
