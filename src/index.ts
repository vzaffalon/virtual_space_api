import express from "express"
import cors from "cors";
import helmet from "helmet";
import createMongooseConection from "./db/MoongoseSetup";
import { Socket } from "socket.io"
import { originUri, defaultPort } from "./config/ApiConsts";
import MessagesRouter from "./routes/MessagesRouter";
import RoomsRouter from "./routes/RoomsRouter";
import UsersRouter from "./routes/UsersRouter";
import seedDatabase from "./seeds/RoomsSeeds";

var app = express();
app.set("port", process.env.PORT || defaultPort);
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(MessagesRouter);
app.use(RoomsRouter);
app.use(UsersRouter);
let http = require("http").Server(app);
let io: Socket = require("socket.io")(http, {
    cors: {
        origin: originUri,
        methods: ["GET", "POST"]
    }
});

http.listen(defaultPort, function () {
    console.log("listening on *:5000");
});

createMongooseConection()
seedDatabase()

export { app, io }