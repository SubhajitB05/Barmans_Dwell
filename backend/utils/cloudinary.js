import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';


const uploadOnCloudinary = async (localFilePath)=>{

    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET 
    });
    
    try {
        if(!localFilePath) return null;

        // Upload the flle on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto'
        })
        console.log('Upload file on cloudinary is successful');
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath);
        console.log('Error while uploading on cloudinary');
        return null;
    }
}

export {uploadOnCloudinary};