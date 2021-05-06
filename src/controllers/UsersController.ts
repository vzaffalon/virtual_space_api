import { Request, Response } from "express"
import { io } from "../index";
import UsersModel from "../models/UsersModel";

class UsersController {
    list(req: Request, res: Response) {
        UsersModel.find({ room_id: req.query.room_id }, (err, users) => {
            res.send(users);
        })
    }

    create(req: Request, res: Response) {
        var new_user = new UsersModel(req.body);
        new_user.save((err: any) => {
            if (err) {
                res.sendStatus(500);
            }
            res.send(new_user);
        });
    }

    update(req: Request, res: Response) {
        console.log("entrou no update")
        UsersModel.findById(req.params.id, (err: any, user: any) => {
            user.name = req.body.name;
            console.log("position value")
            console.log(req.body.position)
            console.log("position value after")
            user.position = parseInt(req.body.position);
            user.room_id = req.body.room_id;
            console.log("que user recebeu")
            console.log(user)
            user.save((err: any) => {
                console.log(err)
                if (err) {
                    res.sendStatus(500);
                }
                console.log("entrou aqui")
                res.send(user);
                console.log("quebrou aqui?")
                UsersModel.find({ room_id: req.body.room_id }, (err: any, users: any) => {
                    console.log("volta tudo")
                    io.emit('users', users);
                })
            })
        })
    }
}

export default UsersController;