import React, { Component } from "react";
import axios from "axios";

/**
 * Aspects of tic-tac-toe game implementation adapted from official react tutorial
 */

function Square(props) {
    // squares are functional components
    return (
        <button className="square" onClick={props.onClick}>
            {
                props.value // renders the appropriate letter depending on what is passed
            }
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]} // Board gets the squares array in its props and tells Square to display the letter in the board at all positions
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

export default class Game extends Component {
    constructor(props) {
        super(props);

        // set state with empty array of player positions
        this.state = {
            status: "Make the first move, Player X!",
            gameID: "",
            squares: [],
        };

        // function bindings
        this.handlePlayerClick = this.handlePlayerClick.bind(this);
        this.startNewGame = this.startNewGame.bind(this);
    }

    handlePlayerClick(i) {
        /**
         * handlePlayerClick is passed into Board which is passed into Square
         * Board sets up the indices of all the square buttons, and Square will invoke the function
         * This causes Game state to get updated
         * The board array is passed into board which is passed into all renderings of Square to update the client's board
         */
        // this function puts the slice of the state board in a variable
        // it then sends a patch request to the api to put board an X or O on the board with id
        /**
         * {
         *      index: i
         * }
         */
        // send a get request to api with id and make sliced array = the database game array
        // set state of the game board

        const gameID = this.state.gameID;
        const updateRequestBody = {
            index: i,
        };
        let currentBoard = this.state.squares.slice();
        let status = "";

        axios
            .patch(
                "http://localhost:5000/games/update/" + gameID,
                updateRequestBody
            )
            .then((res) => {
                status = res.data.status;
                console.log(status);
                currentBoard = res.data.squares;
                console.log(currentBoard);
                this.setState({
                    status: status,
                    squares: currentBoard.slice(),
                });
            })
            .catch((err) => console.log(err.toString()));
    }

    // starts a new game and sets squares state
    startNewGame() {
        // start a new game in database with the passed in id
        let gameIDFromDB = "";
        let boardArrayFromDB = [];
        axios
            .post("http://localhost:5000/games/start/" + this.props.id)
            .then((res) => {
                gameIDFromDB = res.data;
                this.setState({
                    gameID: gameIDFromDB,
                });
            })
            .catch((err) => {
                console.log(err.toString());
            });

        // get the empty board and set that as the state
        axios
            .get(
                "http://localhost:5000/games/get-board/5f225cddb5b2968c1eb8861b"
            )
            .then((res) => {
                console.log(res);
                boardArrayFromDB = res.data;
                console.log(boardArrayFromDB);
                this.setState({
                    squares: boardArrayFromDB.slice(),
                });
            })
            .catch((err) => console.log(err.toString()));
    }

    // called upon intial render
    componentDidMount() {
        this.startNewGame();
    }

    // called upon revisit to page
    componentDidUpdate(prevProps) {
        if (this.props.gameOpenCount !== prevProps.gameOpenCount) {
            // if the player plays another game
            this.startNewGame();
        }
    }

    render() {
        const squares = this.state.squares.slice();
        const status = this.state.status;
        return (
            <div>
                <div className="text-center text-lg font-bold my-4">
                    {status}
                </div>
                <div className="game">
                    <div className="game-board">
                        <Board
                            squares={squares}
                            onClick={(i) => this.handlePlayerClick(i)}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
