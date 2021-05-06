import { Request, Response } from "express"
import { io } from "../setup/UserSocketSetup";
import MessagesModel from "../models/MessagesModel";

class MessagesController {
    list(req: Request, res: Response) {
        MessagesModel.find({ room_id: req.params.room_id }, (err, messages) => {
            res.send(messages);
        })
    }

    create(req: Request, res: Response) {
        var message = new MessagesModel(req.body);
        message.save((err: any) => {
            if (err) {
                res.sendStatus(500);
            }
            console.log("mensagem criada")
            res.send(message)
            MessagesModel.find({ room_id: req.body.room_id }, (err, messages) => {
                io.emit('messages', messages.reverse());
            })
        })
    }
}

export default MessagesController;