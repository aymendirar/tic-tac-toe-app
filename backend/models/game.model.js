const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const gameSchema = new Schema(
    {
        boardArray: { type: Array, required: true },
        playerOne: { type: String, required: true },
        playerTwo: { type: String, required: false },
    },
    {
        timestamps: true,
    }
);

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
