const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv").config();
const app = express();

app.use(express.static("public"));
//limiting image size to 50mb

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

//getting the database url
const URL = process.env.MONGODB_URL;

const TodoRouter = require("./routes/todorouter");

//connect to database url with the given options
mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//database connection
const connection = mongoose.connection;
connection.once("open", function () {
  console.log("DB connection success");
});

//defining a port to run the application
//use port 8070 or use any other port if the 8070 is unavailable
const PORT = process.env.PORT || 8080;

app.use("/todo", TodoRouter);

//running the app in previously defined port
const server = app.listen(PORT, () => {
  console.log(`Server is up and running on: ${PORT}`);
});

//if the server crashed show it simply and stop the server
process.on("unhandledRejection", (error, promise) => {
  console.log(`Logged error: ${error}`);
  server.close(() => process.exit(1));
});
