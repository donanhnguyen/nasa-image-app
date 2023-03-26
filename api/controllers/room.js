import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

// GET all rooms from a specific hotel
export const getAllRoomsFromHotel = async (req, res) => {
    try {
        const allRooms = await Room.find({hotel: req.params.hotelId});
        res.status(200).json(allRooms);
    } catch(err) {
        res.status(500).json(err);
    }
}

export const createRoomInHotel =  async (req, res) => {

    const newRoom = new Room(req.body);

    try {
        const savedRoom = await newRoom.save();
        res.status(200).json(savedRoom);

    } catch(err) {
        res.status(500).json(err);
    }
};