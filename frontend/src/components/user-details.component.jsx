import React, { Component } from "react";
import axios from "axios";

export default class UserDetails extends Component {
    constructor(props) {
        super(props);

        //state
        this.state = {
            username: "",
            wins: 0,
            losses: 0,
            dateCreated: "",
            dateUpdated: "",
        };

        // function bindings
        this.getUserDetails = this.getUserDetails.bind(this);
    }

    // retrieves user details from the database
    getUserDetails() {
        axios
            .get("http://localhost:5000/users/" + this.props.match.params.id)
            .then((res) => {
                const username = res.data.username;
                const wins = res.data.wins;
                const losses = res.data.losses;
                const dateCreated = res.data.createdAt.substring(0, 10);
                const dateUpdated = res.data.updatedAt.substring(0, 10);

                this.setState({
                    username: username,
                    wins: wins,
                    losses: losses,
                    dateCreated: dateCreated,
                    dateUpdated: dateUpdated,
                });
            })
            .catch((err) => {
                console.log(err.toString());
            });
    }

    // called upon intial render
    componentDidMount() {
        this.getUserDetails();
    }

    // called upon revisit to the page
    componentDidUpdate(prevProps) {
        if (this.props.userDetailOpenCount !== prevProps.gameOpenCount) {
            // guard to check if revisit
            this.getUserDetails();
        }
    }

    render() {
        return (
            <div className="justify-center items-center p-5">
                <table className="table-fixed text-center m-auto">
                    <thead>
                        <tr>
                            <th className="w-1/2 px-4 py-2">Data Title</th>
                            <th className="w-1/4 px-4 py-2">User Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border px-4 py-2">Username</td>
                            <td className="border px-4 py-2">
                                {this.state.username}
                            </td>
                        </tr>
                        <tr className="bg-gray-100">
                            <td className="border px-4 py-2">Wins</td>
                            <td className="border px-4 py-2">
                                {this.state.wins}
                            </td>
                        </tr>
                        <tr className="bg-gray-100">
                            <td className="border px-4 py-2">Losses</td>
                            <td className="border px-4 py-2">
                                {this.state.losses}{" "}
                            </td>
                        </tr>
                        <tr className="bg-gray-100">
                            <td className="border px-4 py-2">
                                Account Creation Date
                            </td>
                            <td className="border px-4 py-2">
                                {this.state.dateCreated}
                            </td>
                        </tr>
                        <tr className="bg-gray-100">
                            <td className="border px-4 py-2">Last Updated</td>
                            <td className="border px-4 py-2">
                                {this.state.dateUpdated}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
