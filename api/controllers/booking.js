import Booking from "../models/Booking.js";

// get a single booking
export const getBooking = async (req, res) => {
    try {
        const foundBooking = await Booking.findById(req.params.id);
        res.status(200).json(foundBooking);
    } catch(err) {
        res.status(500).json(err);
    }
};

// get all bookings
export const getAllBookings = async (req, res) => {
    try {
        const allBookings = await Booking.find();
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

// update a booking
export const updateBooking = async (req, res) => {
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, { $set: req.body }, {new: true});
        res.status(200).json(updatedBooking);

    } catch(err) {
        res.status(500).json(err);
    }
};

// delete a booking

export const deleteBooking = async (req, res) => {

    try {
        await Booking.findByIdAndDelete(req.params.id);
        res.status(200).json("Booking has been cancelled.");

    } catch(err) {
        res.status(500).json(err);
    }
};