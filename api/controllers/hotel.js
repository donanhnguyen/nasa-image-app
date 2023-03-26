
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

// POST hotel

export const createHotel = async (req, res) => {
    const newHotel = new Hotel(req.body);

    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);

    } catch(err) {
        res.status(500).json(err);
    }
};