import app from "../index"
import mongoose from "mongoose"
import { io } from "../user_socket_setup";

app.get('/rooms/:id/users', (req, res) => {
    const User = mongoose.model('User');
    User.find({ room_id: req.params.id },(err, users)=> {
      res.send(users);
    })
})

app.patch('/users/:id', (req, res) => {
    const User = mongoose.model('User');
    User.findById(req.params.id, (err: any, user: any) => {
        user.name = req.body.name;  
        console.log("position value")
        console.log(req.body.position)
        console.log("position value after")
        user.position = parseInt(req.body.position);
        user.room_id = req.body.room_id;
        console.log("que user recebeu")
        console.log(user)
        user.save((err: any) =>{
            console.log(err)
            if(err){
              res.sendStatus(500);
            }
            console.log("entrou aqui")
            res.send(user);
            console.log("quebrou aqui?")
            User.find({ room_id: req.body.room_id},(err: any, users: any) => {
                console.log("volta tudo")
                io.emit('users', users);
            })
        })
    })
})

app.post('/users', (req, res) => {
    const User = mongoose.model('User');
    var new_user = new User(req.body);  
    new_user.save((err) =>{
        if(err){
          res.sendStatus(500);
        }
        res.send(new_user);
    });  
})