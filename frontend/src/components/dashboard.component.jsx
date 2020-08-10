import React, { Component } from "react";
import { Link } from "react-router-dom";
import tictactoe from "../images/tictactoe.png";
import trophy from "../images/trophy.png";

export default class Dashboard extends Component {
    render() {
        return (
            <div className="flex justify-center">
                <Link to="/game">
                    <div className="my-12 mx-4 max-w-sm rounded overflow-hidden shadow-lg card">
                        <img
                            className="w-auto h-auto"
                            src={tictactoe}
                            alt="Tic-Tac-Toe"
                        />
                        <div className="px-6 py-4">
                            <div className="text-center font-bold text-xl mb-2">
                                Start a New Tic-Tac-Toe Game!
                            </div>
                            <p className="text-center text-gray-700 text-base items-center">
                                Get your gamer face on as you prepare to play
                                the classic yet timeless game of Tic-Tac-Toe!
                                Relive fond memories of childhood in a solo game
                                or alongside a friend. Whatever you do, you're
                                in for a fun time!
                            </p>
                        </div>
                    </div>
                </Link>
                <Link
                    to={
                        "/edit/" + this.props.id // passed in id used here
                    }
                >
                    <div className="my-12 mx-4 max-w-sm rounded overflow-hidden shadow-lg card">
                        <img
                            className="w-auto h-auto"
                            src={trophy}
                            alt="Tic-Tac-Toe"
                        />
                        <div className="px-6 py-4">
                            <div className="text-center font-bold text-xl mb-2">
                                Check Out Your Record!
                            </div>
                            <p className="text-center text-gray-700 text-base">
                                Look over your player stats and marvel at your
                                greatness! Show off your high win record and
                                post it to social media to rub it in everyone's
                                face ( ͡° ͜ʖ ͡°)
                            </p>
                        </div>
                    </div>
                </Link>
            </div>
        );
    }
}
