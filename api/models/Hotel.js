import mongoose from "mongoose";
import Room from "./Room.js";

const {Schema} = mongoose;

const HotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    planet: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    rooms: [{
        type: Schema.Types.ObjectId, 
        ref: "Room"
    }]
})

// doesnt work
HotelSchema.methods.getRooms = function () {
    console.log("Get ROOMS!!!!");
}

export default mongoose.model("Hotel", HotelSchema);