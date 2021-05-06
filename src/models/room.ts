import mongoose from "mongoose"
const Schema = mongoose.Schema;
const Room = new Schema();

Room.add({
    name: String,
});

mongoose.model('Room', Room);