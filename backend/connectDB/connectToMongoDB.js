import mongoose from "mongoose";

const connectToMongoDB = async(uri)=>{
    try {
        const connect = await mongoose.connect(uri);
        console.log("Connected to MongoDB");
        return connect;
    } catch (error) {
        console.log('MongoDB connection failed ', error);
    }
}

export default connectToMongoDB;