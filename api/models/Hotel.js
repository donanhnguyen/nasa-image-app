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

HotelSchema.methods.getRooms = function () {
    return mongoose.model('Room').find( {hotedId: this._id} )
}

export default mongoose.model("Hotel", HotelSchema);