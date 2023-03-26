import mongoose from "mongoose";
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
    picture: {
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

export default mongoose.model("Hotel", HotelSchema);