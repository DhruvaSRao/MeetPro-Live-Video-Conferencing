import express from "express";
import {createServer} from "node:http";
import {Server} from "socket.io";
import mongoose from "mongoose";

import cors from "cors";

import { connectToSocket } from "./controllers/socketManager.js";

import userRoutes from "./routes/users.routes.js";

const app = express();
//creation of socket
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", process.env.PORT || 8000);

app.use(cors({
    origin: [
        "http://localhost:3000",
        "http://localhost:8000",
        "https://meetpro-live-video-conferencing-frontend.onrender.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true, // important if you are sending cookies or auth headers
}));


app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb",extended: true}));

app.use("/api/v1/users", userRoutes); //sometimes versions get outdated to keep it working we can use both versions v1 and v2.
app.use("/api/v2/users", userRoutes);

const start = async () => {
    app.set("mongo_user");
    const connectionDb = await mongoose.connect("mongodb+srv://dhruvasirish:thriveni123@cluster0.jjhimfq.mongodb.net/");
    console.log(`Mongo connected on ${connectionDb.connection.host}`);
    server.listen(app.get("port"), () =>{ 
        console.log("Listening on PORT 8000");
    })
}

start();
