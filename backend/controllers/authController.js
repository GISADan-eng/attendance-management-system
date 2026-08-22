const jwt = require("jsonwebtoken");
const user = require("../models/user");
const {JsonWebTokenError} = require("jsonwebtoken");

const generateToken = (id) =>
    JWT.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    });


const registerUser = async (req, res) => {
    try {
        const {name, email, password, role } = req.body;

        if (!name || !email || !password ) {
            return res.status(400).json({message: 'Please provide name,email or password'});
        }

        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(400).json({message: 'User already exists'});
        }

        const user = await user.create({ name, email, password, role });

        res.status(201.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user.id),
            });
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await user.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user.id),
            });
        } else {
            res.status(401).json({message: 'Invalid email or password'});
        }
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

module.exports = {registerUser, loginUser};