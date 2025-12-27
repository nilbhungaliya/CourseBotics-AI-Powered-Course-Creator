import Groq from "groq-sdk";

const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY;

// Validate API key
if (!apiKey) {
  console.error(
    "❌ NEXT_PUBLIC_GROQ_API_KEY is not defined in environment variables"
  );
}

const groq = new Groq({
  apiKey: apiKey || "",
  dangerouslyAllowBrowser: true, // Required for client-side usage
});

const generationConfig = {
  temperature: 1,
  top_p: 0.95,
  max_tokens: 8192,
};

// Course Layout Generation
export const generateCourseLayout_AI = {
  sendMessage: async (prompt: string) => {
    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You are an expert course creator. Generate comprehensive course tutorials in JSON format with fields: courseName, description, category, topic, level, duration, numberOfChapters, and chapters array (each chapter should have chapterName, about, and duration fields).`,
          },
          {
            role: "user",
            content:
              'Generate A course tutorial on following  detail with field as course Name, description, along with chapter name, about, duration. Category : "programming", topic:python, level:basic, duration:1 hours, no of chapter:5 , in json format',
          },
          {
            role: "assistant",
            content: `{
  "courseName": "Python Programming Fundamentals for Beginners",
  "description": "This course provides a comprehensive introduction to Python programming, designed for individuals with no prior coding experience. You'll learn the core concepts of Python, enabling you to write simple programs and build a solid foundation for further learning.",
  "category": "programming",
  "topic": "python",
  "level": "basic",
  "duration": "1 hour",
  "numberOfChapters": 5,
  "chapters": [
    {
      "chapterName": "Chapter 1: Setting Up Your Python Environment",
      "about": "This chapter guides you through installing Python on your computer and setting up a suitable environment for writing and running Python code. We will cover popular text editors and IDEs.",
      "duration": "10 minutes"
    },
    {
      "chapterName": "Chapter 2: Introduction to Python Basics",
      "about": "In this chapter, you will be introduced to the fundamental building blocks of Python. We'll cover variables, data types (integers, floats, strings, booleans), and basic arithmetic operations.",
      "duration": "15 minutes"
    },
    {
      "chapterName": "Chapter 3: Working with Control Flow",
      "about": "This chapter teaches you how to control the flow of your program using conditional statements (if, elif, else) and loops (for, while). You'll learn how to make decisions and repeat actions in your code.",
      "duration": "15 minutes"
    },
    {
      "chapterName": "Chapter 4: Introduction to Data Structures",
      "about": "In this chapter, you will learn about fundamental data structures in Python: lists and strings. We'll cover how to create, access, and modify these structures.",
      "duration": "15 minutes"
    },
    {
      "chapterName": "Chapter 5: Basic Input and Output",
      "about": "This final chapter introduces how to interact with users by taking input and displaying results on the console. You'll learn to use the input() and print() functions.",
      "duration": "5 minutes"
    }
  ]
}`,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        model: "llama-3.3-70b-versatile", // Free Groq model
        temperature: generationConfig.temperature,
        max_tokens: generationConfig.max_tokens,
        top_p: generationConfig.top_p,
        response_format: { type: "json_object" },
      });

      return {
        response: {
          text: () => chatCompletion.choices[0]?.message?.content || "{}",
        },
      };
    } catch (error) {
      console.error("Groq API Error:", error);
      throw error;
    }
  },
};

// Chapter Content Generation
export const GenerateChapterContent_AI = {
  sendMessage: async (prompt: string) => {
    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You are an expert technical content creator. Explain concepts in detail in JSON format with an array of objects containing: Title, explanation (detailed explanation of the concept), and code_examples array (each with language and code in <pre> format if applicable).`,
          },
          {
            role: "user",
            content:
              "Explain the concepts in detail on Topic: Next js, Chapter 1: Introduction to Next.js Introduction to Next.js , in JSON Format with list of array with fields as Title, explanation of given chapter in detail, code examples (code field <precode> format) if applicable.",
          },
          {
            role: "assistant",
            content: `{
  "chapter": "Introduction to Next.js",
  "concepts": [
    {
      "Title": "What is Next.js?",
      "explanation": "Next.js is a powerful React framework for building web applications. It's designed to make development faster, easier, and more performant by providing features like server-side rendering (SSR), static site generation (SSG), routing, and much more.",
      "code_examples": []
    },
    {
      "Title": "Setting up a Next.js Project",
      "explanation": "Creating a new Next.js project is easy with create-next-app. The command bootstraps a fully functional project with all necessary configurations.",
      "code_examples": [
        {
          "language": "bash",
          "code": "<pre>npx create-next-app my-next-app\\ncd my-next-app\\nnpm run dev</pre>"
        }
      ]
    }
  ]
}`,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        model: "llama-3.3-70b-versatile",
        temperature: generationConfig.temperature,
        max_tokens: generationConfig.max_tokens,
        top_p: generationConfig.top_p,
        response_format: { type: "json_object" },
      });

      return {
        response: {
          text: () => chatCompletion.choices[0]?.message?.content || "{}",
        },
      };
    } catch (error) {
      console.error("Groq API Error:", error);
      throw error;
    }
  },
};
