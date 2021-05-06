import { Socket } from "socket.io"
import { originUri } from "./ApiConsts";
let io: any = null

const setUpSocketIo = (app: any) => {
    let http = require("http").Server(app);
    let io: Socket = require("socket.io")(http, {
        cors: {
            origin: originUri,
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", function (socket: any) {
        console.log("a user connected");
        socket.on("message", function (message: any) {
            console.log(message);
        });
    });

    http.listen(5000, function () {
        console.log("listening on *:5000");
    });
}

export { io, setUpSocketIo }