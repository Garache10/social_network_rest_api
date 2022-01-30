import Mongoose from "mongoose";
import "dotenv/config";

Mongoose.connect(`${process.env.MONGODB_URI}`, () => {
    console.log("Connected to database", process.env.MONGODB_DB);
});