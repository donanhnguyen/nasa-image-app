
import Hotel from "../models/Hotel.js";


// GET all hotels
export const getAllHotels = async (req, res) => {
    try {
        const allHotels = await Hotel.find();
        res.status(200).json(allHotels);
    } catch(err) {
        res.status(500).json(err);
    }
}