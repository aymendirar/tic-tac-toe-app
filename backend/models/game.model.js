const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const gameSchema = new Schema(
    {
        boardArray: { type: Array, required: true }, // array 9 long of X, O, or null
        playerOne: { type: String, required: true }, // id of player one
        playerTwo: { type: String, required: false }, // id of player two
        completed: { type: Boolean, default: false }, // keeps track if game ended
        xIsNext: { type: Boolean, default: true }, // X is always the first player
    },
    {
        timestamps: true,
    }
);

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
