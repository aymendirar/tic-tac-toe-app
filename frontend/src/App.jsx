import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Component } from "react";
// imports for components
import NavbarLoggedIn from "./components/navbar-loggedin.component";
import NavbarLoggedOut from "./components/navbar-loggedout.component";
import Dashboard from "./components/dashboard.component";
import Login from "./components/login.component";
import Game from "./components/game.component";
import UserDetails from "./components/user-details.component";
import Error404 from "./components/error-404.component";
import Footer from "./components/footer.component";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false, // maintains whether or not user is logged in
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
        let gameOpenCount = 0; // maintains the number of times game page is opened
        let userDetailOpenCount = 0; // maintains the number of times the user detail is opened
        const isLoggedIn = this.state.isLoggedIn;

        if (isLoggedIn) {
            // rendered when user is logged in
            return (
                <Router>
                    <NavbarLoggedIn
                        id={this.state.id}
                        logoutFunction={this.handleLogoutClick}
                    />
                    <Route exact path={["/", "/login"]}>
                        <Redirect to="/dashboard" />
                    </Route>
                    <Route
                        exact
                        path="/dashboard"
                        render={(props) => (
                            <Dashboard {...props} id={this.state.id} />
                        )}
                    />
                    <Route
                        exact
                        path="/game"
                        render={(props) => (
                            <Game
                                {...props}
                                id={this.state.id}
                                gameOpenCount={gameOpenCount++}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/edit/:id"
                        render={(props) => (
                            <UserDetails
                                {...props}
                                userDetailOpenCount={userDetailOpenCount++}
                            />
                        )}
                    />
                    <Footer />
                </Router>
            );
        } else {
            // rendered when user is logged out
            return (
                <Router>
                    <NavbarLoggedOut />
                    <Route exact path="/">
                        <Redirect to="/login" />
                    </Route>
                    <Route
                        exact
                        path="/login"
                        render={(props) => (
                            <Login
                                {...props}
                                loginFunction={this.handleLoginClick}
                            />
                        )}
                    />
                    <Route />
                    <Route exact path={["/game", "/edit/:id", "/dashboard"]}>
                        <Redirect to="/error" />
                    </Route>
                    <Route exact path="/error" component={Error404} />
                </Router>
            );
        }
    }
}
