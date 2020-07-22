// imports and necessary tool
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// defines the user schema
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 4,
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 4,
        },
        // users have a record of wins and losses
        wins: { type: Number, default: 0 },
        losses: { type: Number, default: 0 },
    },
    {
        timestamps: true, // when it was created and modified
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
