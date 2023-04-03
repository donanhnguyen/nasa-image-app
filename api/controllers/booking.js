import Booking from "../models/Booking.js";
import User from "../models/User.js";

// get all bookings from a user
export const getAllBookings = async (req, res) => {
    try {
        const allBookings = await Booking.find({userId: req.params.userId});
        res.status(200).json(allBookings);
    } catch(err) {
        res.status(500).json(err);
    }
};

// create a booking
export const createBooking = async (req, res) => {
    const newBooking = new Booking(req.body);

    try {
        const savedBooking = await newBooking.save();
        res.status(200).json(savedBooking);

    } catch(err) {
        res.status(500).json(err);
    }
};

// delete a booking

export const deleteBooking = async (req, res) => {

    try {
        await Booking.findByIdAndDelete(req.params.bookingId);
        res.status(200).json("Booking has been cancelled.");

    } catch(err) {
        res.status(500).json(err);
    }
};