import express from "express";
import { createBooking, deleteBooking, getAllBookings, getBooking, updateBooking } from "../controllers/booking.js";

const router = express.Router();

// get a single booking
router.get('/:id', getBooking)

// get ALL bookings
router.get('/', getAllBookings)

// create a new booking under a user
router.post('/', createBooking)
 

// update the date duration of a booking
router.put('/:id', updateBooking)

// delete a booking
router.delete('/:id', deleteBooking)

export default router;