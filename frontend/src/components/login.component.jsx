import React, { Component } from "react";
import axios from "axios";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            tryAgain: false,
            tooShort: false,
        };

        this.login = this.props.loginFunction; // updates the App state

        // function bindings
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
        this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.setTryAgainTrue = this.setTryAgainTrue.bind(this);
        this.setTryAgainFalse = this.setTryAgainFalse.bind(this);
        this.setTooShortTrue = this.setTooShortTrue.bind(this);
        this.setTooShortFalse = this.setTooShortFalse.bind(this);
        this.clearState = this.clearState.bind(this);
    }

    // checks if users's credentials are valid and logs them in. Otherwise, asked to try again.
    handleLoginSubmit(e) {
        e.preventDefault();
        this.setTooShortFalse(); // ensure the too short message is removed

        const loginData = {
            username: this.state.username,
            password: this.state.password,
        };

        axios
            .post("http://localhost:5000/users/check", loginData)
            .then((res) => {
                if (res.data) {
                    console.log(
                        res.data.username +
                            "'s credentials are valid and in the database"
                    );
                    this.login(res.data._id); // sends the id of the user to app
                } else {
                    this.clearState();
                    this.setTryAgainTrue();
                    console.log("incorrect credentials, try again");
                }
            })
            .catch((err) => {
                console.log(err.response);
                this.clearState();
            });
        console.log("finished");
    }

    // adds a new user to the database and logs them in
    handleRegisterSubmit(e) {
        e.preventDefault();
        this.setTryAgainFalse(); // ensure the incorrect cred message is removed

        const loginData = {
            username: this.state.username,
            password: this.state.password,
        };

        axios
            .post("http://localhost:5000/users/add", loginData)
            .then((res) => {
                console.log(res);
                this.login();
            })
            .catch((err) => {
                console.log(err.toString());
                this.clearState();
                this.setTooShortTrue();
            });
    }

    // changes state username based on what's typed in the username input
    onChangeUsername(e) {
        this.setState({
            username: e.target.value,
        });
    }

    // changes state password based on what's typed in the password input
    onChangePassword(e) {
        this.setState({
            password: e.target.value,
        });
    }

    setTryAgainTrue() {
        this.setState({
            tryAgain: true,
        });
    }

    setTryAgainFalse() {
        this.setState({
            tryAgain: false,
        });
    }

    setTooShortTrue() {
        this.setState({
            tooShort: true,
        });
    }

    setTooShortFalse() {
        this.setState({
            tooShort: false,
        });
    }

    // clears the username and password values in state
    clearState() {
        this.setState({
            username: "",
            password: "",
        });
    }

    render() {
        return (
            <div>
                <h1 className="text-gray-800 font-bold text-center text-2xl p-4">
                    Log In To Your <br />
                    Tic-Tac-Toe Account!
                </h1>
                <div>
                    <form>
                        <div className="md:flex md:items-center mb-6 justify-center">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                Username
                            </label>
                            <div>
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500"
                                    type="text"
                                    value={this.state.username}
                                    onChange={this.onChangeUsername}
                                />
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-6 justify-center">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                Password
                            </label>
                            <div>
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500"
                                    type="password"
                                    value={this.state.password}
                                    onChange={this.onChangePassword}
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            <button
                                className="bg-green-400 hover:bg-green-700 text-white font-bold py-2 px-4 mx-2 rounded ptransition duration-200 ease-in-out"
                                type="button"
                                onClick={this.handleLoginSubmit}
                            >
                                Sign in
                            </button>
                            <button
                                className="bg-green-400 hover:bg-green-700 text-white font-bold py-2 px-4 mx-2 rounded ptransition duration-200 ease-in-out "
                                type="button"
                                onClick={this.handleRegisterSubmit}
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>
                {this.state.tryAgain && (
                    <div className="flex justify-center py-5">
                        <h1 className="font-bold text-red-600 text-center">
                            Given username/ password incorrect.
                            <br /> Please try again.
                        </h1>
                    </div>
                )}
                {this.state.tooShort && (
                    <div className="flex justify-center py-5">
                        <h1 className="font-bold text-green-600 text-center">
                            Your username/ password is too short. <br />
                            Please ensure they are both at least 4 characters
                            long and try again.
                        </h1>
                    </div>
                )}
            </div>
        );
    }
}
