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
        type: Array,
        required: true,
        default: []
    },
    numberOfGuests: {
        type: Number,
        required: true
    }, 
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    roomId: {
        type: Schema.Types.ObjectId,
        ref: "Room",
        required: true
    },

}, {timestamps: true})

export default mongoose.model("Booking", BookingSchema);