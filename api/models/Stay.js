import mongoose from "mongoose";
const {Schema} = mongoose;

const StaySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
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
    price: {
        type: Number,
        required: true
    }

})

export default mongoose.model("Stay", StaySchema);