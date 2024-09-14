import "./App.css";
import Home from "./home";
import { Routes, Route } from "react-router-dom";
import RestaurantPage from "./restaurantPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurant/:id" element={<RestaurantPage />} />
    </Routes>
  );
}

export default App;
