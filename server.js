///////////////////////////////////
//DEPENDENCIES
//////////////////////////////////
require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./routes/user");
const notesRouter = require("./routes/notes");
const auth = require("./middleware/auth");

/////////////////////////////
// GLOBALS & ROUTERS
/////////////////////////////
const { PORT, NODE_ENV } = process.env;
const mongoURI = process.env.mongoURI; //URI for connecting to database specified in .env
const db = mongoose.connection; //the mongoose connection object
const mongoConfigObject = { useNewUrlParser: true, useUnifiedTopology: true }; //Config option to eliminate deprecation warnings

////////////////////////////////////
//CORS CONFIGURATIONS
////////////////////////////////////
const whitelist = ["http://example1.com", "http://example2.com"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

//////////////////////////////////
//DATABASE CONNECTION
/////////////////////////////////
mongoose.connect(mongoURI, mongoConfigObject, () => {
  console.log("CONNECTED TO MONGO");
});

//CONNECTION MESSAGING
db.on("error", (err) => console.log(err.message + " is Mongod not running?"));
db.on("connected", () => console.log("mongo connected!"));
db.on("disconnected", () => console.log("mongo disconnected"));

/////////////////////////////////////////
//Middleware
/////////////////////////////////////////
NODE_ENV === "development" ? app.use(cors()) : app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("tiny"));

////////////////////////
//ROUTES
///////////////////////

app.use("/user", userRouter);

app.use("/note", notesRouter);

app.all("/test", auth, (req, res) => {
  res.json(req.payload);
});

/////////////////////////////
//LISTENER
/////////////////////////////

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
