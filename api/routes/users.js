import express from "express";
import User from '../models/User.js';

const router = express.Router();

// create user/sign up
router.post('/', async (req, res) => {
    const newUser = new User(req.body);

    try {
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);

    } catch(err) {
        res.status(500).json(err);
    }
})
// get user /  log in

router.get('/:id', async (req, res) => {
    try {
        const foundUser = await User.findById(req.params.id);
        res.status(200).json(foundUser);

    } catch(err) {
        res.status(500).json(err);
    }
})

export default router;