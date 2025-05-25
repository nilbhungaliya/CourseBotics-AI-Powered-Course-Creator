export type UserInputType = {
    category?: string;
    difficulty?: string;
    duration?: string;
    video?: string;
    totalChapters?: number;
    topic?: string;
    description?: string;
  };
  
  export type ChapterType = {
    chapterName: string;
    about: string;
    duration: string;
  };
  
  export type courseOutputType = {
    category: string;
    chapters: ChapterType[];
    duration: string;
    level: string;
    topic: string;
    description: string;
  };
  
  export type CourseType = {
    id: number;
    courseId: string;
    courseName: string;
    category: string;
    level: string;
    courseOutput: courseOutputType;
    isVideo: string;
    username: string | null;
    userprofileimage: string | null;
    createdBy: string | null;
    courseBanner: string | null;
    isPublished: boolean;
  };
  
  export type CodeExampleType = {
    code: string[];
  };
  
  export type ChapterSectionType = {
    title: string;
    explanation: string;
    code_examples?: CodeExampleType[];
  };

  export type contentType = {
    chapters: string;
    concepts: ChapterSectionType[];
  }
  
  export type ChapterContentType = {
    id: number;
    chapterId: number;
    courseId: string;
    content: contentType;
    videoId: string;
  };

  export type PrevState = {
  success: boolean;
  message: string;
};