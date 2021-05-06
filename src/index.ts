import express from "express"
import cors from "cors";
import helmet from "helmet";
import createMongooseConection from "./setup/MoongoseSetup";
import { setUpSocketIo } from "./setup/UserSocketSetup";
import { defaultPort } from "./config/ApiConsts";
import MessagesRouter from "./routes/MessagesRouter";
import RoomsRouter from "./routes/RoomsRouter";
import UsersRouter from "./routes/UsersRouter";

var app = express();
app.set("port", process.env.PORT || defaultPort);
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(MessagesRouter);
app.use(RoomsRouter);
app.use(UsersRouter);

setUpSocketIo(app)
createMongooseConection()

export default app