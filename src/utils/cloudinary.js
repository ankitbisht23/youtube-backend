import {v2 as cloudinary} from 'cloudinary';
import exp from 'constants';
import fs from "fs"

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET  
});

const uploadOnCloudinary= async (localFilePath)=>{
    try{
        if(!localFilePath) return null
        //upload a file
        const response=await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto"
        })
       // console.log("deleting")
        fs.unlinkSync(localFilePath);
    //     fs.unlink(localFilePath, (err) => {
    //         if (err) {
    //             console.log("failed to delete local image:"+err);
    //         } else {
    //             console.log('successfully deleted local image');                                
    //         }
    // });
        //console.log("file uploaded in cloudinary",response)
        return response.url;
    }
    catch(error){
        fs.unlinkSync(localFilePath) // remove the local file
        return null
    }

}

export {uploadOnCloudinary}