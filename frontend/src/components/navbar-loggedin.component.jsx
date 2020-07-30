import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class NavbarLoggedIn extends Component {
    render() {
        return (
            <nav className="flex items-center justify-center flex-wrap bg-gray-800 p-5">
                <div className="flex flex-shrink-0 text-green-400 mr-6">
                    <span className="font-bold text-xl">
                        Tic-Tac-Toe Web App
                    </span>
                </div>
                <div className="flex items-center flex-shrink-0 text-white mr-6">
                    <Link
                        to="/"
                        className="font-bold text-xl transition duration-200 ease-in-out hover:text-yellow-500"
                    >
                        Dashboard
                    </Link>
                </div>
                <div className="flex items-center flex-shrink-0 text-white mr-6">
                    <Link
                        to="/edit/:id"
                        className="font-bold text-xl transition duration-200 ease-in-out hover:text-yellow-500"
                    >
                        User Details
                    </Link>
                </div>
                <div className="flex items-center flex-shrink-0 text-white mr-6">
                    <Link
                        to="/login"
                        className="font-bold text-xl transition duration-200 ease-in-out hover:text-yellow-500 cursor-pointer"
                        onClick={this.props.logoutFunction}
                    >
                        Sign out
                    </Link>
                </div>
            </nav>
        );
    }
}
