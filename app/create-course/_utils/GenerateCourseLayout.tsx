import { generateCourseLayout_AI } from "@/configs/AiModel";
import { storeDataInDatabase } from "./StoreDataInDatabase";
import uuid4 from "uuid4";

export const GenerateCourseLayout = async (
  userInput: any,
  user: any,
  router: any
) => {
  const BASIC_PROMT =
    'Generate A course tutorial on following detail with field as course Name, description, along with chapter name, about, duration.';

  const USER_INPUT_PROMT =
    'Category : ' +
    userInput.category +
    ', topic:' +
    userInput.topic +
    ', level:' +
    userInput.difficulty +
    ', duration:' +
    userInput.duration +
    ', no of chapter:' +
    userInput.totalChapters +
    ' , in json format';

  const FINAL_PROMT = BASIC_PROMT + USER_INPUT_PROMT;

  try {
    let id = uuid4();

    // Generate course layout using AI
    const result = await generateCourseLayout_AI.sendMessage(FINAL_PROMT);
    const responseText = result.response?.text();
    
    if (!responseText) {
      throw new Error('Failed to generate course content from AI');
    }

    const data = JSON.parse(responseText);
    
    // Validate that the course data was generated
    if (!data || !data.courseName) {
      throw new Error('Invalid course data generated');
    }

    // Store the course in database
    const response = await storeDataInDatabase(id, userInput, data, user);
    
    if (!response || response.error) {
      throw new Error(response?.error || 'Failed to save course to database');
    }

    // Navigate to the created course
    router.replace(`/create-course/${id}`);
    
    return { success: true, courseId: id };
  } catch (error: any) {
    console.error('Error in GenerateCourseLayout:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to generate course. Please try again.' 
    };
  }
};
