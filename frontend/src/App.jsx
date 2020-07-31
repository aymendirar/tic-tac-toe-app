import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Component } from "react";
// imports for components
import NavbarLoggedIn from "./components/navbar-loggedin.component";
import NavbarLoggedOut from "./components/navbar-loggedout.component";
import Dashboard from "./components/dashboard.component";
import Login from "./components/login.component";
import Game from "./components/game.component";
import UserDetails from "./components/user-details.component";
import Error404 from "./components/error-404.component";
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: true, // maintains whether or not user is logged in
            id: "",
        };
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }

    // changes the isLoggedIn to true
    handleLoginClick(id) {
        this.setState({ isLoggedIn: true, id: id });
    }

    // changes the isLoggedIn to fale
    handleLogoutClick() {
        this.setState({ isLoggedIn: false, id: "" });
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;

        if (isLoggedIn) {
            // rendered when user is logged in
            return (
                <Router>
                    <NavbarLoggedIn
                        id={this.state.id}
                        logoutFunction={this.handleLogoutClick}
                    />
                    <Route
                        exact
                        path={["/", "/login"]}
                        render={(props) => (
                            <Dashboard {...props} id={this.state.id} />
                        )}
                    />
                    <Route
                        exact
                        path="/game"
                        render={(props) => (
                            <Game {...props} id={this.state.id} />
                        )}
                    />
                    <Route exact path="/edit/:id" component={UserDetails} />
                </Router>
            );
        } else {
            // rendered when user is logged out
            return (
                <Router>
                    <NavbarLoggedOut />
                    <Route
                        exact
                        path={["/login", "/"]}
                        render={(props) => (
                            <Login
                                {...props}
                                loginFunction={this.handleLoginClick}
                            />
                        )}
                    />
                    <Route exact path="/game" component={Error404} />
                    <Route exact path="/edit/:id" component={Error404} />
                </Router>
            );
        }
    }
}
