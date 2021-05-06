import express from "express"
import cors from "cors";
import helmet from "helmet";
import createMongooseConection from "./moongose_setup";
import { setUpSocketIo } from "./user_socket_setup";

const defaultPort = 5000

var app = express();
app.set("port", process.env.PORT || defaultPort);
app.use(helmet());
app.use(cors());
app.use(express.json());

createMongooseConection()
setUpSocketIo(app)

export default app