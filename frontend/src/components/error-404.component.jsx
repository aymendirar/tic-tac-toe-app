import React, { Component } from "react";
import { Link } from "react-router-dom";
import Error404Monkey from "../images/404-monkey.gif";

export default class Error404 extends Component {
    render() {
        return (
            <div className="py-5">
                <h1 className="text-xl font-bold text-center">
                    Error 404: Page Not Found
                </h1>
                <p className="text-l font-bold text-center px-12 py-2">
                    Hey... you navigated to a broken page. Please try logging in
                    again
                </p>
                <div className="flex justify-center">
                    <img
                        src={Error404Monkey}
                        alt="Error 404"
                        className="py-2 transform scale-75"
                    />
                </div>
                <div className="flex justify-center py-4">
                    <Link to="/login">
                        <button
                            className="bg-green-400 hover:bg-green-700 text-white font-bold py-2 px-4 mx-2 rounded ptransition duration-200 ease-in-out"
                            type="button"
                        >
                            Go back to login page!
                        </button>
                    </Link>
                </div>
            </div>
        );
    }
}
