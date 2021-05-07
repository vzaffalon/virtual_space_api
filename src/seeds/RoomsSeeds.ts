import RoomsModel from "../models/RoomsModel";

const seedDatabase = () => {
    RoomsModel.find({}, (err, rooms) => {
        if(rooms.length === 0){
            var new_room = new RoomsModel({name: "Room A"});
            new_room.save((err: any) => {});
            var new_room = new RoomsModel({name: "Fun Room"});
            new_room.save((err: any) => {});
            var new_room = new RoomsModel({name: "Game Room"});
            new_room.save((err: any) => {});
            var new_room = new RoomsModel({name: "Serious Room"});
            new_room.save((err: any) => {});
            var new_room = new RoomsModel({name: "Work Room"});
            new_room.save((err: any) => {});
            var new_room = new RoomsModel({name: "Tik Tok Talk Room"});
            new_room.save((err: any) => {});
            var new_room = new RoomsModel({name: "Talk about Food"});
            new_room.save((err: any) => {});
            var new_room = new RoomsModel({name: "Love Room"});
            new_room.save((err: any) => {});
        }
    })
}

export default seedDatabase