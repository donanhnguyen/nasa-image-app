import express from "express";
import { createRoomInHotel, getAllRoomsFromHotel, updateRoomUnavailableDates } from "../controllers/room.js";

const router = express.Router();

// get ALL rooms from hotel
router.get('/:hotelId/rooms/', getAllRoomsFromHotel)


// update a room when booked, update the unavailableDates array by adding in the dates
router.put('/:hotelId/rooms/:roomId', updateRoomUnavailableDates)


// create a room in hotel
// ONLY used for testing API, not used in app
router.post('/:hotelId/rooms/', createRoomInHotel)



export default router;