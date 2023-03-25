import express from "express";
import { getAllHotels } from "../controllers/hotel.js";

const router = express.Router();

// get ALL hotels
router.get('/', getAllHotels)


export default router;