import axios from "axios";
import { getPreSignedUrl } from "../api/s3Request";

export const getPreSignedUrlUtill = async (file) => {
  try {
    // if (!file || !file.name || !file.path || !file.type) {
    //   throw new Error("Invalid file object");
    // }

    const data = await getPreSignedUrl({
      file_names: [file?.name]
    });
    
    const preSignedUrl = data?.data?.data[0]?.url;
    console.log(data?.data?.data[0], "data");

    // Make PUT request to upload image data to S3
    const response = await axios.put(preSignedUrl, file, {
      headers: {
        "Content-Type": file?.type // Adjust content type as per your image type
      },
      timeout: 10000,
    });
    

    console.log("Upload response:", response.data);
    return data?.data?.data[0]?.file_name; // Return S3 response if needed
  } catch (error) {
    console.error("Error uploading image:", error?.message);
    // throw error; // Propagate error for handling
  }
};
