import React, { Component } from "react";

export default class NavbarLoggedOut extends Component {
    render() {
        return (
            <nav className="flex items-center justify-center flex-wrap bg-gray-800 p-5">
                <div className="flex flex-shrink-0 text-green-400 mr-6">
                    <span className="font-bold text-xl">
                        Tic-Tac-Toe Web App
                    </span>
                </div>
            </nav>
        );
    }
}
