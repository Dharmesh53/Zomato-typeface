import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  return res.sendStatus(200);
});

export default router;
