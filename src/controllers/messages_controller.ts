import app from "../index"
import mongoose from "mongoose"

app.get('/rooms/:id/messages', (req, res) => {
    const Message = mongoose.model('Message');
    Message.find({ room_id: req.params.id }, (err, messages) => {
        res.send(messages);
    })
})

app.post('/messages', (req, res) => {
    const Message = mongoose.model('Message');
    var message = new Message(req.body);
    message.save((err) => {
        if (err) {
            res.sendStatus(500);
        }
        console.log("mensagem criada")
        res.send(message)
        Message.find({ room_id: req.body.room_id }, (err, messages) => {
            io.emit('messages', messages.reverse());
        })
    })
})