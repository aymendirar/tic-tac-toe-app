// imports and necessary tools
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// setting up server and port
const server = express();
const port = process.env.PORT || 5000;

// the server will make use of cors ane express json
server.use(cors()); // allows interaction between frontend and backend
server.use(express.json()); // recognizes incoming requests as JSON objects

// connect to MongoDB Atlas database
const atlas_uri = process.env.ATLAS_URI;
mongoose.connect(atlas_uri, {
    // necessary flags to handle deprecated implementations when working with mongoDB and nodejs
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
    // once the connection is open, logs the statement in the callback
    console.log("MongoDB Atlas database connection established successfully");
});

// tells server to use the

const usersRouter = require("./routes/users");
const gameRouter = require("./routes/game");

server.use("/users", usersRouter); // at the "/users" route, use the users API in usersRouter
// server.use("/game", gameRouter);

// creates a server that listens at the given port
server.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
