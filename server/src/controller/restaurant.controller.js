import Restaurant from "../db/restaurant.js";

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
    const { limit, offset } = req.query;
    const maxLimit = 20;

    if (limit > maxLimit) {
      limit = maxLimit;
    }

    const restaurants = await Restaurant.find()
      .skip((offset - 1) * limit)
      .limit(limit);

    return res.status(200).json(restaurants);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
