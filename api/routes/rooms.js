import express from "express";
import { createRoomInHotel, getAllRoomsFromHotel } from "../controllers/room.js";

const router = express.Router();

// get ALL rooms from hotel
router.get('/:hotelId/rooms/', getAllRoomsFromHotel)

// create a room in hotel
router.post('/:hotelId/rooms/', createRoomInHotel)


export default router;