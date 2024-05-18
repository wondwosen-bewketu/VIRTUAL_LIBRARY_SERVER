const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const userRouter = require("./routes/user.router");

const app = express();
require("dotenv").config();

app.use(cors());

const PORT = process.env.PORT || 4000;
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL);

const db = mongoose.connection;
db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use(helmet());

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));

app.use("/user", userRouter);

// Route for handling POST requests to /post_data endpoint

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
