// importing moduels
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cookieParser=require("cookie-parser");

// dotenv config
dotenv.config();

// initilizing app
const app = express();
const PORT = process.env.PORT;

// app config
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

// mongoose
mongoose.connect(process.env.MONGODB_URL, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Database Connected");
});


app.get("/",(req,res)=>res.send("Hello world!!"))
// user routes
const userRouter = require("./routes/user/index");
app.use("/api/user", userRouter);

// admin routes
const adminRouter = require("./routes/admin/index");
app.use("/api/admin", adminRouter);


// connection
app.listen(PORT, () => console.log("server running on " + PORT));
