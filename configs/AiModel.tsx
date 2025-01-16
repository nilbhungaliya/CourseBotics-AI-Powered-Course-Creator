const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};

export const generateCourseLayout_AI = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                { text: "Generate A course tutorial on following  detail with field as course Name, description, along with chapter name, about, duration. Category : \"programming\", topic:python, level:basic, duration:1 hours, no of chapter:5 , in json format" },
            ],
        },
        {
            role: "model",
            parts: [
                { text: "```json\n{\n  \"courseName\": \"Python Programming Fundamentals for Beginners\",\n  \"description\": \"This course provides a comprehensive introduction to Python programming, designed for individuals with no prior coding experience. You'll learn the core concepts of Python, enabling you to write simple programs and build a solid foundation for further learning.\",\n  \"category\": \"programming\",\n  \"topic\": \"python\",\n  \"level\": \"basic\",\n  \"duration\": \"1 hour\",\n  \"numberOfChapters\": 5,\n  \"chapters\": [\n    {\n      \"chapterName\": \"Chapter 1: Setting Up Your Python Environment\",\n      \"about\": \"This chapter guides you through installing Python on your computer and setting up a suitable environment for writing and running Python code. We will cover popular text editors and IDEs.\",\n      \"duration\": \"10 minutes\"\n    },\n    {\n      \"chapterName\": \"Chapter 2: Introduction to Python Basics\",\n      \"about\": \"In this chapter, you will be introduced to the fundamental building blocks of Python. We'll cover variables, data types (integers, floats, strings, booleans), and basic arithmetic operations.\",\n       \"duration\": \"15 minutes\"\n    },\n     {\n      \"chapterName\": \"Chapter 3: Working with Control Flow\",\n      \"about\": \"This chapter teaches you how to control the flow of your program using conditional statements (if, elif, else) and loops (for, while). You'll learn how to make decisions and repeat actions in your code.\",\n      \"duration\": \"15 minutes\"\n    },\n    {\n      \"chapterName\": \"Chapter 4: Introduction to Data Structures\",\n      \"about\": \"In this chapter, you will learn about fundamental data structures in Python: lists and strings. We'll cover how to create, access, and modify these structures.\",\n      \"duration\": \"15 minutes\"\n    },\n      {\n      \"chapterName\": \"Chapter 5: Basic Input and Output\",\n      \"about\": \"This final chapter introduces how to interact with users by taking input and displaying results on the console. You'll learn to use the `input()` and `print()` functions.\",\n       \"duration\": \"5 minutes\"\n    }\n  ]\n}\n```\n" },
            ],
        },
    ],
});

export const GenerateChapterContent_AI = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "Explain the concepts in detail on Topic: Next js, Chapter 1: Introduction to Next.js Introduction to Next.js , in JSON Format with list of array with fields as Title, explanation of given chapter in detail, code examples (code field <precode> format) if applicable."},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n{\n  \"chapter\": \"Introduction to Next.js\",\n  \"concepts\": [\n    {\n      \"Title\": \"What is Next.js?\",\n      \"explanation\": \"Next.js is a powerful React framework for building web applications. It's designed to make development faster, easier, and more performant by providing features like server-side rendering (SSR), static site generation (SSG), routing, and much more.  It offers an opinionated approach, guiding developers towards best practices for creating modern web applications. Next.js handles a lot of the complexities involved in setting up a robust React project, allowing developers to focus on building features instead of configuration.\",\n        \"code_examples\": []\n    },\n    {\n      \"Title\": \"Key Features of Next.js\",\n      \"explanation\": \"Next.js comes packed with features that make it a popular choice for web development:\\n\\n*   **Server-Side Rendering (SSR):**  Renders pages on the server, improving initial load times and SEO. This is crucial for web crawlers to properly index content.\\n*   **Static Site Generation (SSG):** Generates HTML pages at build time. Perfect for content-heavy sites where data doesn't change frequently, leading to faster loading times.\\n*   **Automatic Code Splitting:**  Splits the JavaScript code into smaller chunks, loading only what's needed for the current page, resulting in optimized performance.\\n*   **File-System Based Routing:**  Creates routes based on the file structure in the `pages` directory, simplifying route management. \\n*   **Built-in Support for CSS and Sass:**  Makes styling applications straightforward with built-in support for CSS modules and Sass.\\n*   **API Routes:** Allows you to build backend functionality directly within your Next.js application.\\n*   **Image Optimization:**  Provides a powerful `next/image` component for optimizing images, improving performance and user experience.\\n*   **Fast Refresh:** Enables instantaneous updates in the browser during development, significantly speeding up the development process.\",\n         \"code_examples\": []\n    },\n     {\n      \"Title\": \"Why Use Next.js?\",\n      \"explanation\": \"Using Next.js offers several advantages:\\n\\n*   **Improved Performance:** SSR, SSG, and code splitting contribute to faster loading times and better overall performance.\\n*   **Enhanced SEO:** Server-rendered content makes it easier for search engines to index your site.\\n*   **Simplified Development:** Features like file-based routing and built-in styling support streamline the development process.\\n*   **Scalability:** Next.js applications can scale easily as the project grows.\\n*   **Rich Ecosystem:**  A large and active community provides plenty of resources, libraries, and support.\\n*   **Flexibility:** It can be used to build various types of applications, from simple blogs to complex e-commerce platforms.\",\n        \"code_examples\": []\n    },\n      {\n      \"Title\": \"Setting up a Next.js Project\",\n      \"explanation\": \"Creating a new Next.js project is easy with `create-next-app`.  The command bootstraps a fully functional project with all necessary configurations. Generally, it involves the following steps:\\n\\n1.  **Using `create-next-app`:**\\n    ```bash\\nnpx create-next-app my-next-app\\ncd my-next-app\\n    ```\\n    *  This command creates a new directory named `my-next-app` with the basic project structure.\\n2.  **Installing npm:** If not previously installed, install the packages by running `npm install`.\\n3.  **Starting the Development Server:**\\n   ```bash\\nnpm run dev\\n    ```\\n    *  This command starts the development server. Your app can now be viewed by visiting `http://localhost:3000` in your browser.\\n\\nKey directories and files in a Next.js project include:\\n\\n*   `pages`: Contains your page components and API routes.\\n*   `public`: Stores static assets like images and fonts.\\n*   `styles`: Contains global stylesheets.\\n*   `package.json`: Manages dependencies and scripts.\",\n        \"code_examples\": [\n         {\n           \"language\": \"bash\",\n           \"code\": \"<pre>npx create-next-app my-next-app\\ncd my-next-app\\nnpm run dev</pre>\"\n         }\n\n        ]\n    },\n     {\n        \"Title\": \"The Pages Directory\",\n        \"explanation\": \"The `pages` directory is central to Next.js routing. Each file within this directory becomes a route in your application.  For example:\\n\\n*   A file named `pages/index.js` creates the homepage route (`/`).\\n*   A file named `pages/about.js` creates the `/about` route.\\n*   A file named `pages/blog/first-post.js` creates the `/blog/first-post` route.\\n\\nInside these page files, you'll define React components that make up your page content.  It's crucial to use function component, and make it the default export for it to behave as a route.\",\n         \"code_examples\": [\n            {\n               \"language\": \"jsx\",\n              \"code\": \"<pre>// pages/index.js\\n\\nfunction HomePage() {\\n  return <h1>Welcome to my Homepage!</h1>;\\n}\\n\\nexport default HomePage;\\n</pre>\"\n            },\n              {\n               \"language\": \"jsx\",\n              \"code\": \"<pre>// pages/about.js\\n\\nfunction AboutPage() {\\n  return <h1>About Us</h1>;\\n}\\n\\nexport default AboutPage;\\n</pre>\"\n            }\n\n        ]\n     },\n     {\n        \"Title\": \"Understanding Component Based Architecture\",\n         \"explanation\": \"Next.js (and React, which is Next.js's core library) are built on the principle of component-based architecture.  In this approach, UI is divided into self-contained, reusable blocks called components. Each component manages its own internal state and logic. This makes it easier to build, maintain, and scale large applications.  \\n\\nComponents in Next.js are typically created as JavaScript or TypeScript files. React function components are the most common practice and a best practice for handling components in Next.js\",\n         \"code_examples\": [\n              {\n               \"language\": \"jsx\",\n              \"code\": \"<pre>// components/MyButton.js\\nfunction MyButton({ text, onClick }) {\\n  return <button onClick={onClick}>{text}</button>;\\n}\\n\\nexport default MyButton;</pre>\"\n            },\n             {\n               \"language\": \"jsx\",\n              \"code\": \"<pre>// pages/index.js\\nimport MyButton from '../components/MyButton';\\n\\nfunction HomePage() {\\n  const handleClick = () => {alert('Button Clicked')}\\n  return (\\n    <div>\\n      <h1>Welcome to my Homepage!</h1>\\n      <MyButton text=\\\"Click Me\\\" onClick={handleClick} />\\n    </div>\\n  );\\n}\\n\\nexport default HomePage;\\n</pre>\"\n            }\n        ]\n     }\n  ]\n}\n```\n"},
        ],
      },
    ],
  });

// const result = await generateCourseLayout_AI.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());