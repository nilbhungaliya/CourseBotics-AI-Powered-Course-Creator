import { GenerateChapterContent_AI } from "@/configs/AiModel";
import { getYoutubeVideos } from "@/configs/Service";
import { CourseType } from "@/types/types";
import axios from "axios";

export const GenerateCourseContent = async (
  course: CourseType,
  setLoading: (loading: boolean) => void
) => {
  setLoading(true);

  try {
    const chapters = course?.courseOutput.chapters;

    const processedChapters = await Promise.all(
      chapters.map(async (chapter, index) => {
        const PROMPT = `Explain the concepts in detail on Topic: ${course?.courseName}, Chapter: ${chapter.chapterName}, in JSON Format with list of array with fields as Title, explanation of given chapter in detail, code examples (code field <precode> format) if applicable.`;

        try {
          const query = course.courseName + ":" + chapter.chapterName;

          // Fetch video ID
          const resp = await getYoutubeVideos(query);
          // console.log("Videos", resp);
          const videoId = resp[0].id.videoId;

          // Generate course content
          const result = await GenerateChapterContent_AI.sendMessage(PROMPT);
          // console.log(result);
          
          const content = JSON.parse(result?.response?.text()!);

          // console.log(content);
          
          return {
            chapterId: index,
            courseId: course.courseId,
            content,
            videoId,
          };
        } catch (error) {
          console.error(`Error in processing chapter ${index}:`, error);
          return {error};
        }
      })
    );

    const validChapters = processedChapters.filter((chapter) => chapter !== null);

    // console.log(validChapters);
    
    // Send processed chapters to the server
    const response = await axios.post(
        "/api/storeDataInCourseChapter",
        {
          courseId: course.courseId,
          chapters: validChapters,
        },
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
      // console.log(response.data);
      return response.data;
  } catch (error) {
    console.error(error);
    return {error}
  } finally {
    setLoading(false);
  }
};
