import express from "express"
import mongoose from "mongoose"
import cors from "cors";
import helmet from "helmet";
import * as socketio from "socket.io";

var app = express();
app.set("port", process.env.PORT || 5000);
let http = require("http").Server(app);
let io = require("socket.io")(http);

// whenever a user connects on port 5000 via
// a websocket, log that a user has connected
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
    const ObjectId = Schema;

    const Room = new Schema({
        author: ObjectId,
        title: String,
        body: String,
        date: Date
    });

    const User = new Schema({
        author: ObjectId,
        title: String,
        body: String,
        date: Date
    });

    const Message = new Schema({
        content: { type: String },
        title: String,
        body: String,
        date: Date
    });
}

createMongooseConection()


//    var dbUrl = ‘mongodb://username:pass@ds257981.mlab.com:57981/simple-chat’


//    mongoose.connect(dbUrl , (err) => { 
//     console.log(‘mongodb connected’,err);
//  })

//  var Message = mongoose.model(‘Message’,{ name : String, message : String})

// app.use(helmet());
// app.use(cors());
// app.use(express.json());
// app.use("/api/", router);

// app.get('/messages', (req, res) => {
//     Message.find({},(err, messages)=> {
//       res.send(messages);
//     })
//   })


//   app.post('/messages', (req, res) => {
//     var message = new Message(req.body);
//     message.save((err) =>{
//       if(err)
//         sendStatus(500);
//       io.emit('message', req.body);
//       res.sendStatus(200);
//     })
//   })

//   io.on(‘connection’, () =>{
//     console.log(‘a user is connected’)
//    })
