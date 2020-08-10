// imports and necessary tool
const router = require("express").Router(); // express router tools
const axios = require("axios"); // promise based http client for node.js and browser
let Game = require("../models/game.model"); // the mongoDB game model

/* 
************************************************************
                    GAME LOGIC
************************************************************
*/

// returns "X", "O", or null depending on circumstances
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return squares[a];
        }
    }
    return null;
}

// determines if the game has no winner
function noWinner(squares) {
    let zeroSum = true;
    for (let i = 0; i < squares.length; i++) {
        if (!squares[i]) {
            zeroSum = false;
        }
    }
    return zeroSum;
}

/* 
************************************************************
                    GAME API ENDPOINTS
************************************************************
*/

// gets all games in database
router.route("/").get((req, res) => {
    Game.find()
        .then((games) => res.json(games))
        .catch((err) => res.status(400).json("Error: " + err));
});

// create a new game with the user who started
router.route("/start/:userid").post((req, res) => {
    // empty board is represented by array 9 long with null values
    const boardArray = Array(9).fill(null);
    const playerOne = req.params.userid; //! assuming that the player id exists and is valid

    // make a new game document
    const newGame = new Game({
        boardArray: boardArray,
        playerOne: playerOne,
    });

    // saves the new game document into the database
    newGame
        .save()
        .then(() => res.json(newGame._id)) // returns the id of the created game
        .catch((err) => res.status(400).json("Error: " + err));
});

// update game board and check if someone won
router.route("/update/:gameid").patch((req, res) => {
    // find the specific game associated with the gameid
    //! think about handling updates when the game is full/ when the spot is taken
    Game.findOne({
        _id: req.params.gameid,
    })
        .then((game) => {
            if (!game.completed) {
                // extract out the request body values
                const index = Number(req.body.index);
                const playerLetter = game.xIsNext ? "X" : "O";
                const playerID = game.playerOne;

                let nextPlayer = playerLetter;

                // updates the game board
                let board = game.boardArray.slice();
                if (board[index] == null) {
                    // should only update if the index is currently null
                    board[index] = playerLetter;
                    game.boardArray = board;
                    nextPlayer = game.xIsNext ? "O" : "X"; // nextPlayer changed if valid move is made
                    game.xIsNext = !game.xIsNext;
                }
                // set up variables to check if winner, zero sum game, or game should continue
                const winner = calculateWinner(game.boardArray);
                const zeroSum = noWinner(game.boardArray);
                let response = ""; // response will change depending on outcome

                // check if there's a winner and update game document accordingly
                if (winner) {
                    // update the user's win/loss record by making a request to the user api
                    if (winner == "X") {
                        // "X" is the player that started the game
                        // make patch request to update-record endpoint with appropriate request body
                        axios
                            .patch(
                                "http://localhost:5000/users/update-record/" +
                                    playerID,
                                {
                                    win: true,
                                }
                            )
                            .then((res) => {
                                console.log(res.data);
                            })
                            .catch((err) => console.log("Error: " + err));
                    } else if (winner == "O") {
                        // "O" is the second player. If they win, "X", the player that started, loses
                        axios
                            .patch(
                                "http://localhost:5000/users/update-record/" +
                                    playerID,
                                {
                                    win: false,
                                }
                            )
                            .then((res) => {
                                console.log(res.data);
                            })
                            .catch((err) => console.log("Error: " + err));
                    }
                    game.completed = true;
                    response = "Game has ended. Winner is " + winner;
                } else if (zeroSum) {
                    game.completed = true;
                    response = "No possible winner. Game has ended";
                } else {
                    response = "It's your turn, player " + nextPlayer;
                }

                // save the game document regardless of whether an update occurs or if the game ends or not
                game.save()
                    .then(() => {
                        res.json({
                            status: response,
                            squares: board,
                        });
                    })
                    .catch((err) => res.status(400).json("Error: " + err));
            }
        })
        .catch((err) => res.status(400).json("Error: " + err));
});

// gets the game board for a particular game
router.route("/get-board/:userid").get((req, res) => {
    Game.findOne({
        playerOne: req.params.userid,
    })
        .then((game) => res.json(game.boardArray))
        .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
