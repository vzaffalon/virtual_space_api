import mongoose from "mongoose"

// const MongoDbAddress = "mongodb://localhost/virtualroomdb"
const MongoDbAddress = "mongodb+srv://user:UBzEbdDBdlxUZyuw@cluster0.nsr7v.mongodb.net/virtualRoom?retryWrites=true&w=majority"

const createMongooseConection = async () => {
    await mongoose.connect(MongoDbAddress, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });
}

export default createMongooseConection