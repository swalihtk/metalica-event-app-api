// importing moduels
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";

// dotenv config
dotenv.config();

// initilizing app
const app=express();
const PORT=process.env.PORT;

// app config
app.use(morgan("dev"))

// mongoose

// admin routes


// user routes


// connection
app.listen(PORT, ()=>console.log("server running on "+PORT));
