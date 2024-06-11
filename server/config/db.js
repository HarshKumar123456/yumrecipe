import "dotenv/config";
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB is connected....");  
    } catch (error) {
        console.log(`Error connecting MongoDB ${error}`);
    }
};

export default connectDB;