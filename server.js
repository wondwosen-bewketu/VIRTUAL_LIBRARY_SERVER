const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const userRouter = require("./routes/user.router");
const bookRouter = require("./routes/bookRoutes");
const path = require("path");

const app = express();
require("dotenv").config();

app.use(cors());

const PORT = process.env.PORT || 4000;
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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

// Serve the 'Books' folder as a static directory
app.use(express.static(path.join(__dirname, "public")));

app.use("/user", userRouter);
app.use("/book", bookRouter);

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
