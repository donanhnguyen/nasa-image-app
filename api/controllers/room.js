import Room from "../models/Room.js";

// GET all rooms from a specific hotel
export const getAllRoomsFromHotel = async (req, res) => {
    try {
        const allRooms = await Room.find({hotelId: req.params.hotelId});
        res.status(200).json(allRooms);
    } catch(err) {
        res.status(500).json(err);
    }
}

// only used for testing api purposes
export const createRoomInHotel =  async (req, res) => {
    const newRoom = new Room(req.body);
    try {
        const savedRoom = await newRoom.save();
        res.status(200).json(savedRoom);

    } catch(err) {
        res.status(500).json(err);
    }
};

// PUT update a room's unavailableDates array when booking a room within a hotel
export const updateRoomUnavailableDates = async (req, res) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.roomId, { $set: req.body }, {new: true});
        res.status(200).json(updatedRoom);

    } catch(err) {
        res.status(500).json(err);
    }
};

export const getSingleRoom = async (req, res) => {
    try {
        const foundRoom = await Room.findById(req.params.roomId);
        res.status(200).json(foundRoom);
    } catch(err) {
        res.status(500).json(err);
    }
}