import mongoose from "mongoose"
const Schema = mongoose.Schema;
const Message = new Schema();

Message.add({
    content: String,
    user_id: String,
    room_id: String,
});

mongoose.model('Message', Message);