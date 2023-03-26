import mongoose from "mongoose";
const {Schema} = mongoose;


const BookingSchema = new mongoose.Schema({
    nameOfHotel: {
        type: String,
        required: true
    },
    planet: {
        type: String,
        required: true
    },
    dateDuration: {
        type: String,
        required: true
    },
    numberOfGuests: {
        type: Number,
        required: true
    }, 
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    room: {
        type: Schema.Types.ObjectId,
        ref: "Room",
        required: true
    },

}, {timestamps: true})

export default mongoose.model("Booking", BookingSchema);