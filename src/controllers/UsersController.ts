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
        let new_user = new UsersModel(req.body);
        new_user.save((err: any) => {
            if (err) {
                res.sendStatus(500);
            }
            res.send(new_user);
        });
    }

    delete(req: Request, res: Response) {
        UsersModel.findByIdAndDelete(req.params.id, null, (err: any) => {
                if (err) {
                    res.sendStatus(500);
                }
                res.send({ message: "User deleted" });
        })
    }

    update(req: Request, res: Response) {
        UsersModel.findById(req.params.id, (err: any, user: any) => {
            user.name = req.body.name;
            user.position = parseInt(req.body.position);
            user.room_id = req.body.room_id;
            user.save((err: any) => {
                if (err) {
                    res.sendStatus(500);
                }
                res.send(user);
                UsersModel.find({ room_id: req.body.room_id }, (err: any, users: any) => {
                    io.emit('users', users);
                })
            })
        })
    }
}

export default UsersController;