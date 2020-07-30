import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
//import { Redirect } from "react-router-dom";
import { Component } from "react";
// imports for components
import NavbarLoggedIn from "./components/navbar-loggedin.component";
import NavbarLoggedOut from "./components/navbar-loggedout.component";
import Dashboard from "./components/dashboard.component";
import Login from "./components/login.component";
import Game from "./components/game.component";
import EditUserDetails from "./components/edit-user-details.component";
import Error404 from "./components/error-404.component";
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false, // maintains whether or not user is logged in
        };
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }

    // changes the isLoggedIn to true
    handleLoginClick() {
        this.setState({ isLoggedIn: true });
    }

    // changes the isLoggedIn to fale
    handleLogoutClick() {
        this.setState({ isLoggedIn: false });
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;

        if (isLoggedIn) {
            // rendered when user is logged in
            return (
                <Router>
                    <NavbarLoggedIn logoutFunction={this.handleLogoutClick} />
                    <Route exact path={["/", "/login"]} component={Dashboard} />
                    <Route exact path="/game" component={Game} />
                    <Route exact path="/edit/:id" component={EditUserDetails} />
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
