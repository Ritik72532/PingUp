import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import userRoute from "./src/routes/user.route.js";
import messageRoute from "./src/routes/message.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { app, server } from "./SocketIO/server.js";

// new
app.use(cors({
  origin: "http://localhost:3001", // Your Vite dev server
  credentials: true,               // Allow cookies
}));
// middleware
app.use(express.json());

app.use(cookieParser());

const PORT = process.env.PORT || 5001
const URI = process.env.MONGODB_URI
try {
    mongoose.connect(URI)
    console.log("Connected to DB");
    
} catch (error) {
    console.log("Error while connecting to database", error);
    
}
 
app.use("/api/user",userRoute)
app.use("/api/message",messageRoute)

server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
