const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type
app.use(bodyParser.urlencoded({ extended: true }));

// route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Shopping application." });
});

// set port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

//configure db
const db = require("./config/db.config.js");
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//connecting to the database
mongoose.connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

require('./Online_Shopping/routes/item.routes.js')(app);



