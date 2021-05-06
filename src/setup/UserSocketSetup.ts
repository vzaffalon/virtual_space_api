import { Socket } from "socket.io"
import { originUri, defaultPort } from "../config/ApiConsts";
let io: any = null

const setUpSocketIo = (app: any) => {
    // console.log(app)
    let http = require("http").Server(app);
    // console.log(originUri)
    let io: Socket = require("socket.io")(http, {
        cors: {
            origin: originUri,
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", function (socket: any) {
        // console.log("a user connected");
        socket.on("message", function (message: any) {
            // console.log(message);
        });
    });

    console.log("entrou no set http")
    http.listen(defaultPort, function () {
        console.log("listening on *:5000");
    });
}

export { io, setUpSocketIo }