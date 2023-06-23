import User from '../models/User.js';
import bcrypt from 'bcryptjs'

// sign up
export const createUser = async (req, res) => {
    try {

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            password: hash,
        });

        await newUser.save();
        res.status(200).send(newUser);
    } catch(err) {
        res.status(500).json(err);
    }
};

// log in or get single user info

export const logInUser = async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username});
        if (!user) {
            res.status(404).send("User Not Found.");
        } else {
            const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
            if (!isPasswordCorrect) {
                res.status(400).send("Wrong Password!");
            } else {
                const {password, ...otherDetails} = user._doc
                res.status(200).send({...otherDetails});
            }
        }

    } catch(err) {
        res.status(500).json(err);
    }
};