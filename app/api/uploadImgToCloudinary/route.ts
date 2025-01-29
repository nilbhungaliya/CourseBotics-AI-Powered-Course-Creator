// import { NextApiRequest, NextApiResponse } from "next";
// import cloudinary from "@/configs/cloudinary";

// export const POST = async(req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     const { file }: { file: string } = req.body;
//     console.log("file"+file);
    
//     if (!file) {
//       return res.status(400).json({ error: "File is required" });
//     }

//     const uploadResponse = await cloudinary.uploader.upload(file, {
//       folder: "ai-course-generator",
//     });
//     console.log(uploadResponse.secure_url);
    
//     return res.status(200).json({ url: uploadResponse.secure_url });
//   } catch (error) {
//     console.error("Cloudinary upload error:", error);
//     return res.status(500).json({ error: "Failed to upload file" });
//   }
// };

import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/configs/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const { file } = await req.json();
    console.log("Received file:", file);

    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    const uploadResponse = await cloudinary.uploader.upload(file, {
      folder: "ai-course-generator",
    });

    console.log("Cloudinary URL:", uploadResponse.secure_url);

    return NextResponse.json({ url: uploadResponse.secure_url }, { status: 200 });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}
