import { Request, Response } from "express"
import RoomsModel from "../models/RoomsModel";

class RoomsController {
  list(req: Request, res: Response) {
    RoomsModel.find({}, (err, rooms) => {
      res.send(rooms);
    })
  }

  create(req: Request, res: Response) {
    let new_room = new RoomsModel(req.body);
    new_room.save((err: any) => {
      if (err) {
        res.sendStatus(500);
      }
      res.send(new_room);
    });
  }
}

export default RoomsController;