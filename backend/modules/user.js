const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userschema = new mongoose.schema (
    {
        name: {type: String, required: true, trim: true},
        email: {type: String, required: true, unique: true, lowercase: true, trim: true},
        password: {type: String, required: true, minLength:6},
        role: {
            type: String,
            enum: ['admin', 'teacher', 'hr'],
            default: 'teacher',
        },
    },
    { timestamps: true }
);

userschema.pre('save', async function (next) {})