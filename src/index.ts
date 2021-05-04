import express from "express"
import mongoose from "mongoose"
import cors from "cors";
import helmet from "helmet";

var app = express();
app.set("port", process.env.PORT || 5000);
app.use(helmet());
app.use(cors());
app.use(express.json());
let http = require("http").Server(app);
let io = require("socket.io")(http, {
    cors: {
      origin: "http://localhost:3001",
      methods: ["GET", "POST"]
    }
  });

io.on("connection", function (socket: any) {
    console.log("a user connected");
    socket.on("message", function(message: any) {
        console.log(message);
    });
});

const server = http.listen(5000, function () {
    console.log("listening on *:5000");
});

const createMongooseConection = async () => {
    await mongoose.connect('mongodb://localhost/virtualroomdb', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });

    const Schema = mongoose.Schema;
    const Room = new Schema();
    const User = new Schema();
    const Message = new Schema();

    // const ObjectId = Schema.ObjectId;

    Room.add({
        name: String,
    });

    User.add({
        name: String,
        position: Number,
        room_id: String,
    });

    Message.add({
        content: String,
        user_id: String,
        room_id: String,
    });

    mongoose.model('Room', Room);
    mongoose.model('User', User);
    mongoose.model('Message', Message);

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

    app.get('/rooms/:id/users', (req, res) => {
        const User = mongoose.model('User');
        User.find({ room_id: req.params.id },(err, users)=> {
          res.send(users);
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
    
    app.get('/rooms/:id/messages', (req, res) => {
        const Message = mongoose.model('Message');
        Message.find({ room_id: req.params.id },(err, messages)=> {
          res.send(messages);
        })
    })
    
    app.post('/messages', (req, res) => {
        const Message = mongoose.model('Message');
        var message = new Message(req.body);
        message.save((err) =>{
          if(err){
            res.sendStatus(500);
          }
          console.log("mensagem criada")
          res.send(message)
          Message.find({ room_id: req.body.room_id },(err, messages)=> {
            io.emit('messages', messages.reverse());
          })
        })
    })
}

createMongooseConection()