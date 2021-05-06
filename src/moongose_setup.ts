import mongoose from "mongoose"

const createMongooseConection = async () => {
    await mongoose.connect('mongodb://localhost/virtualroomdb', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });
}

export default createMongooseConection