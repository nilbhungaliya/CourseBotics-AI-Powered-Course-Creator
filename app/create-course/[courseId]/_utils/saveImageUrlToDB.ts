import axios from "axios";

export const saveImageUrlToDB = async (courseId: string, fileUrl: string) => {
  try {
    // console.log("Fileurl from savetodb"+fileUrl);
    // console.log("CourseId from savetodb"+courseId);
    const FileUrlDb = await axios.post(`/api/course/${courseId}/uploadBanner`, {
      fileUrl,
    },{
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log("Image URL saved successfully");
    // console.log(FileUrlDb);
    return FileUrlDb;
  } catch (error) {
    console.error("Error saving image URL to DB:", error);
  }
};
