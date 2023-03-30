import mongoose from "mongoose";
const {Schema} = mongoose;

const RoomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    unavailableDates: {
        type: [{type: String}]
    },
    hotelId: {
        type: Schema.Types.ObjectId,
        ref: "Hotel",
        required: true
    }

}, {timestamps: true})

export default mongoose.model("Room", RoomSchema);