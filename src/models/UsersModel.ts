import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ModelName = "Users";

const UsersSchema = new Schema({
    name: String,
    position: Number,
    room_id: String,
});

let Users = mongoose.model(ModelName, UsersSchema);

export default Users