import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ModelName = "Messages"

const MessagesSchema = new Schema({
    content: String,
    user_id: String,
    room_id: String,
});

let Messages = mongoose.model(ModelName, MessagesSchema);

export default Messages


