import express from "express";
import Booking from '../models/Booking.js';

const router = express.Router();

// get a single booking
router.get('/:id', async (req, res) => {
    try {
        const foundBooking = await Booking.findById(req.params.id);
        res.status(200).json(foundBooking);
    } catch(err) {
        res.status(500).json(err);
    }
})
// get ALL bookings
router.get('/', async (req, res) => {
    try {
        const allBookings = await Booking.find();
        res.status(200).json(allBookings);
    } catch(err) {
        res.status(500).json(err);
    }
})

// create a new booking under a user
router.post('/', async (req, res) => {
    const newBooking = new Booking(req.body);

    try {
        const savedBooking = await newBooking.save();
        res.status(200).json(savedBooking);

    } catch(err) {
        res.status(500).json(err);
    }
})
 
// update the date duration of a booking

router.put('/:id', async (req, res) => {

    try {
        const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, { $set: req.body }, {new: true});
        res.status(200).json(updatedBooking);

    } catch(err) {
        res.status(500).json(err);
    }
})

// delete a booking


router.delete('/:id', async (req, res) => {

    try {
        await Booking.findByIdAndDelete(req.params.id);
        res.status(200).json("Booking has been cancelled.");

    } catch(err) {
        res.status(500).json(err);
    }
})


export default router;