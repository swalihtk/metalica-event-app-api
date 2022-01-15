// importing moduels
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");

// dotenv config
dotenv.config();

// initilizing app
const app = express();
const PORT = process.env.PORT;

// app config
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended:true}))

// mongoose
mongoose.connect(process.env.MONGODB_URL, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Database Connected");
});

// admin routes

// user routes
const userRouter = require("./routes/user/index");
app.use("/api", userRouter);

// connection
app.listen(PORT, () => console.log("server running on " + PORT));
