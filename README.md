# AI Course Generator

An AI-powered course creation platform built with Next.js, Prisma, and Google Gemini AI. This application allows users to generate and manage course content dynamically.

## Features

- **AI-Powered Course Generation** using Google Gemini API
- **User Authentication** with Clerk
- **Cloud Storage** via Cloudinary
- **Database Management** with Prisma and PostgreSQL
- **Video Embedding** with YouTube API
- **Modern UI** with Radix UI and Tailwind CSS

## Tech Stack

### Backend
- Next.js 15 with **Turbopack**
- Prisma ORM with PostgreSQL
- Clerk for authentication
- Google Gemini AI for course generation

### Frontend
- React 19
- Tailwind CSS
- Radix UI
- React Markdown for rendering content

## Installation

### 1. Clone the repository
```sh
git clone https://github.com/your-username/ai-course-generator.git
cd ai-course-generator
```

### 2. Install dependencies
```sh
npm install
```

### 3. Setup environment variables
Create a `.env.local` file and add the following:
```sh
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_DOMAIN=http://localhost:3000
DATABASE_URL=your_postgresql_connection_string
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
NEXT_PUBLIC_CLOUDINARY_API_KEY=your_cloudinary_api_key
NEXT_PUBLIC_CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NEXT_PUBLIC_YOUTUBE_API_KEY=your_youtube_api_key
```

### 4. Run database migrations
```sh
npx prisma migrate dev
```

### 5. Start the development server
```sh
npm run dev
```
The app will be available at `http://localhost:3000`.

## Folder Structure

```
ai-course-generator/
├── src/
│   ├── components/      # UI Components
│   ├── pages/           # Next.js pages
│   ├── lib/             # Utility functions and API handlers
│   ├── prisma/          # Prisma schema and migrations
│   ├── styles/          # Tailwind CSS styles
│   ├── app/             # Next.js App Router
│   ├── hooks/           # Custom React Hooks
├── public/              # Static assets
├── prisma/              # Prisma configurations
├── .env.local           # Environment variables (ignored in Git)
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── tailwind.config.js   # Tailwind configuration
└── README.md            # Documentation
```

## API Routes

- **`POST /api/generate-course`** - Uses Google Gemini AI to generate course content.
- **`POST /api/upload-video`** - Uploads course videos to Cloudinary.
- **`GET /api/courses`** - Fetches a list of courses from the database.

## Deployment

This app can be deployed on **Vercel** or **Railway**.

### Deploy to Vercel
```sh
vercel
```
