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

    const result = await generateCourseLayout_AI.sendMessage(FINAL_PROMT);
    const data = await JSON.parse(result.response?.text());
    // console.log(data);

    const response = await storeDataInDatabase(id, userInput, data, user);
    // console.log(response);

    router.replace(`/create-course/${id}`);
  } catch (error) {
    console.log(error);
  }
};
