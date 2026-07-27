 import mongoose from "mongoose";

const connectDatabase = async () => {
    const uri = process.env.MONGODB_URL

    try {
        if (!uri) {
            throw new Error('MONGODB_URL environment variable is not defined');
        }
        await mongoose.connect(uri);
        console.log("Databse Connected Successfully.");
    } catch (error) {
        console.log(error);
    }
};
export default connectDatabase;