import axios from "axios";

// utils/uploadFile.ts
export const uploadFileToCloudinary = async (file: File): Promise<string> => {
    const base64File = await convertToBase64(file); // Convert file to Base64
    // console.log(base64File);
    
    const response = await axios.post("/api/uploadImgToCloudinary", { file: base64File });
  
    if (!response.data.url) {
      throw new Error("Failed to upload file to Cloudinary");
    }
    const data = await response.data;
    return data.url; // Return the uploaded file's URL
  };
  
  // Helper: Convert file to Base64
  const convertToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  