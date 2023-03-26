import express from "express";
import { createHotel, getAllHotels } from "../controllers/hotel.js";

const router = express.Router();

// get ALL hotels
router.get('/', getAllHotels)
// create a hotel
router.post('/', createHotel)

export default router;