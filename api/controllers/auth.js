import User from "../models/User.js";

export const register = async (req, res, next) => {
    try {
        const newUser = new User({
            username: req.body.username,
            password: req.body.password
        });

        await newUser.save();
        res.status(200).send("User has been created.");
    } catch(err) {
        res.status(500).json(err);
    }
}