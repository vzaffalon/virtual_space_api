import { Request, Response } from "express"
import { io } from "../index";
import MessagesModel from "../models/MessagesModel";

class MessagesController {
    list(req: Request, res: Response) {
        MessagesModel.find({ room_id: req.query.room_id }, (err, messages) => {
            res.send(messages);
        })
    }

    create(req: Request, res: Response) {
        let message = new MessagesModel(req.body);
        message.save((err: any) => {
            if (err) {
                res.sendStatus(500);
            }
            res.send(message)
            MessagesModel.find({ room_id: req.body.room_id }, (err, messages) => {
                io.emit('messages', messages);
                io.emit('message', message);
            })
        })
    }
}

export default MessagesController;