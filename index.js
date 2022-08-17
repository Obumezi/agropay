const app = require("express")(); //creating server endpoint

//decodes what gets sent to the server and what i can use
const bodyParser = require("body-parser");
const res = require("express/lib/response");
const bvnDetails = require("./bvn");

//for logging on the server as to what endpoint got a request and the data sent to it
const logger = require("morgan");
//const bvnDetails = require('./bvn');

const port = process.env.PORT || 3030;

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("*", (req, res) => {
    res.send("Agropay");
});

