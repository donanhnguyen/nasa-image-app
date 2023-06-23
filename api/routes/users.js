import express from "express";
import { createUser, logInUser } from "../controllers/user.js";

const router = express.Router();

// create user/sign up
router.post('/register', createUser)

// get user /  log in
router.post('/logIn', logInUser)

export default router;