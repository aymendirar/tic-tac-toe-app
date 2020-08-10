import React, { Component } from "react";

export default class Footer extends Component {
    render() {
        return (
            <div className="items-center justify-center absolute w-full bottom-0 mt-8">
                <footer className="text-center bg-gray-800 p-3 text-green-400 font-semibold">
                    <span>
                        Thanks for checking out Tic-Tac-Toe Online! Browse
                        through the code and consider contributing
                    </span>
                    {/* way to get around adding space below*/}
                    <span>&nbsp;</span>
                    <a
                        className="transition duration-200 ease-in-out hover:text-yellow-500"
                        href="https://github.com/adirar111/tic-tac-toe-app"
                    >
                        here!
                    </a>
                </footer>
            </div>
        );
    }
}
