import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ModelName = "Rooms"

const RoomsSchema = new Schema({
    name: String,
});

let Rooms = mongoose.model(ModelName, RoomsSchema);

export default Rooms