import {v2 as cloudinary} from  'cloudinary'
import fs from 'fs'

export const uploadOnCloudinary = async (localfilepath)=> {

  try {
    if(!localfilepath) return null

    const response  = await cloudinary.uploader.upload(localfilepath, {
        resource_type : "auto"
    })

    console.log("file sucessfully uplaoded on cloudinary", response.url)
    return response
    
  } catch (error) {
    fs.unlinkSync(localfilepath) 
    return null;
    
  }

}