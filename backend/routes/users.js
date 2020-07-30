// imports and necessary tool
const router = require("express").Router(); // express router tools
let User = require("../models/user.model"); // the mongoDB user model

/* 
************************************************************
                    USER API ENDPOINTS
************************************************************
*/

// gets all users in database
router.route("/").get((req, res) => {
    User.find() // returns a promise
        .then((users) => res.json(users))
        .catch((err) => res.status(400).json("Error: " + err));
});

// creates and adds a new user
router.route("/add").post((req, res) => {
    // extract info and make a new user
    const username = req.body.username;
    const password = req.body.password;
    const newUser = new User({ username: username, password: password });

    // save new user to mongoDB atlas
    newUser
        .save() // returns a promise
        .then(() => res.json("User: " + username + " added successfully!"))
        .catch((err) => res.status(400).json("Error: " + err));
});

// checks if user credentials in request match that of those in database
router.route("/check").post((req, res) => {
    // extract info from request
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({
        // find user in DB that matches document
        username: username,
        password: password,
    }) //! not finding user
        .then((user) =>
            res.json(
                user // res.data will be null if not found, will contain object if found
            )
        )
        .catch((err) => res.status(400).json("Error yikers " + err));
});

// gets specific user details
router.route("/:id").get((req, res) => {
    User.findById(req.params.id)
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json("Error: " + err));
});

// updates specific user's details
router.route("/update-details/:id").patch((req, res) => {
    User.findById(req.params.id)
        .then((user) => {
            user.username = req.body.username || user.username;
            user.password = req.body.password || user.password;
            user.save()
                .then(() => {
                    res.json("User details updated");
                })
                .catch((err) => res.status(400).json("Error " + err));
        })
        .catch((err) => res.status(400).json("Error: " + err));
});

// updates specific user's win/loss count
router.route("/update-record/:id").patch((req, res) => {
    User.findById(req.params.id)
        .then((user) => {
            if (req.body.win == true) {
                user.wins += 1;
            } else {
                user.losses += 1;
            }
            user.save()
                .then(() => {
                    res.json("User details updated");
                })
                .catch((err) => res.status(400).json("Error " + err));
        })
        .catch((err) => res.status(400).json("Error: " + err));
});

// deletes user from database
router.route("/delete/:id").delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then((user) => {
            res.json("User account:" + user.username + " was deleted");
        })
        .catch((err) => res.status(400).json("Error " + err));
});

//TODO: continue testing api

module.exports = router;
