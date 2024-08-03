import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY);
console.log('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET);
const UploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath || typeof localFilePath !== "string") {
      throw new Error("Invalid local file path");
    }

    // Upload the file on Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // File has been uploaded successfully
    console.log("File is uploaded on Cloudinary ", response.url);
    return response;
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
    if (localFilePath) {
      try {
        await fs.promises.unlink(localFilePath);
      } catch (deleteError) {
        console.error("Error deleting local file:", deleteError);
      }
    }
    return null;
  }
};

export { UploadOnCloudinary };