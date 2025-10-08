// routes/creditRoutes.js
import express from "express";
import { getPlans, purchasePlan } from "../controllers/creditController.js";
import { protect } from "../middlewares/auth.js";

const creditRouter = express.Router();

// Get all plans (public)
creditRouter.get("/plan", getPlans);

// Purchase a plan (protected)
creditRouter.post("/purchase", protect, purchasePlan);

export default creditRouter;
