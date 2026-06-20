import { v2 as cloudinary } from 'cloudinary'

export const connectCloudinary = async () => {
    try {
        await cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_SECRET_KEY
        });
        console.log("Clodinary connected successfully");
    }
    catch(e){
        console.log("Cloudinary connection failed",e);
    }
}