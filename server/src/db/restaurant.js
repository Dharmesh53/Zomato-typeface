import { Schema, model } from "mongoose";

const restaurantSchema = new Schema({
  restaurant_id: { type: String },
  restaurant_name: { type: String },
  country_code: { type: String },
  city: { type: String },
  address: { type: String },
  locality: { type: String },
  locality_verbose: { type: String },
  longitude: { type: String },
  latitude: { type: String },
  cuisines: { type: [String] },
  average_cost_for_two: { type: String },
  currency: { type: String },
  has_table_booking: { type: String, enum: ["Yes", "No"] },
  has_online_delivery: { type: String, enum: ["Yes", "No"] },
  is_delivering_now: { type: String, enum: ["Yes", "No"] },
  switch_to_order_menu: { type: String, enum: ["Yes", "No"] },
  price_range: { type: String },
  aggregate_rating: { type: String },
  rating_color: { type: String },
  rating_text: { type: String },
  votes: { type: String },
});

export default model("restaurants", restaurantSchema);
