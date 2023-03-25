import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    nameOfHotel: {
        type: String,
        required: true
    },
    planet: {
        type: Number,
        required: true
    },
    dateDuration: {
        type: String,
        required: true
    },
    numberOfGuests: {
        type: Number,
        required: true
    }

}, {timestamps: true})

export default mongoose.model("Booking", BookingSchema);