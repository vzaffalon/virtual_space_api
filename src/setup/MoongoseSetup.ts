import mongoose from "mongoose"

const MongoDbAddress = "mongodb://localhost/virtualroomdb"

const createMongooseConection = async () => {
    await mongoose.connect(MongoDbAddress, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });
}

export default createMongooseConection