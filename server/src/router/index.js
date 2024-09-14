import { Router } from "express";
import Restaurant from "./restaurant.router.js";

const router = Router();

Restaurant(router);

export default router;
