import RoomsModel from "../models/RoomsModel";

const seedDatabase = () => {
    RoomsModel.find({}, (err, rooms) => {
        if(rooms.length === 0){
            new RoomsModel({name: "Room A"}).save();
            new RoomsModel({name: "Game Room"}).save();
            new RoomsModel({name: "Serious Room"}).save();
            new RoomsModel({name: "Work Room"}).save();
            new RoomsModel({name: "Tik Tok Talk Room"}).save();
            new RoomsModel({name: "Talk about Food"}).save();
            new RoomsModel({name: "Hello World"}).save();
            new RoomsModel({name: "Programming Room"}).save();
        }
    })
}

export default seedDatabase