import mongoose from "mongoose"
const Schema = mongoose.Schema;
const User = new Schema();

User.add({
    name: String,
    position: Number,
    room_id: String,
});

mongoose.model('User', User);