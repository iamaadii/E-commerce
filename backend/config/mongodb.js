import mongoose from "mongoose";

export const connectDB = async()=>{
    try{
        const res = await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`)
        // console.log(res);
        console.log("DB connected");
    }
    catch(e){
        console.log("Error while connecting the DB", e);
    }
}