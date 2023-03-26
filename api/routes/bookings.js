import express from "express";
import { createBooking, deleteBooking, getAllBookings, updateBooking } from "../controllers/booking.js";

const router = express.Router();


// get ALL bookings from a user
router.get('/:userId/bookings/', getAllBookings)

// create a new booking under a user
router.post('/:userId/bookings/', createBooking)
 

// update the date duration of a booking
router.put('/:userId/bookings/:bookingId/', updateBooking)

// delete a booking
router.delete('/:userId/bookings/:bookingId/', deleteBooking)

export default router;