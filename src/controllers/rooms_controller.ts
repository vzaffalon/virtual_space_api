import app from "../index";
import mongoose from "mongoose"

app.get('/rooms', (req, res) => {
    const Room = mongoose.model('Room');
    Room.find({},(err, rooms)=> {
      res.send(rooms);
    })
})

app.post('/rooms', (req, res) => {
    const Room = mongoose.model('Room');
    var new_room = new Room(req.body);  
    new_room.save((err) =>{
        if(err){
          res.sendStatus(500);
        }
        res.send(new_room);
    });  
})