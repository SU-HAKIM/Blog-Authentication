import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

import { formatter } from "../utils/formatter.js";


export const register = async (req, res) => {
    const error = validationResult(req).formatWith(formatter);
    if (!error.isEmpty()) {
        return res.status(400).json(error.mapped())
    }
    try {
        let { name, email, password } = req.body;
        let user = new User({ name, email, password });
        let savedUser = await user.save();

        res.status(200).send({ registered: true, userId: savedUser._id, email: savedUser.email })
    } catch (error) {

    }
}

export const login = async (req, res) => {
    const error = validationResult(req).formatWith(formatter);
    if (!error.isEmpty()) {
        return res.status(400).json(error.mapped())
    }
    try {
        console.log("login successfully")
        res.status(200).json({ loggedIn: true })


    } catch (error) {

    }
}