# 🤖 CourseBotics - AI-Powered Course Creator

<div align="center">

![CourseBotics Logo](public/favicon.svg)

**An innovative AI-powered platform that enables users to effortlessly design and build educational courses using artificial intelligence.**

[![Next.js](https://img.shields.io/badge/Next.js-15.1.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.8.2-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

</div>

## 🌟 Overview

CourseBotics revolutionizes course creation by leveraging **Groq AI** (powered by Llama 3.3 70B) to generate comprehensive educational content. Users simply provide course details like title, duration, chapters, and video preferences, and the platform creates a complete course outline with curated YouTube videos for each chapter.

> **🆕 Now using Groq AI!** We've switched from Google Gemini to Groq for faster, free, and more reliable course generation. See [GROQ_API_SETUP.md](GROQ_API_SETUP.md) for setup instructions.

## ✨ Key Features

### 🎯 Core Functionality
- **AI-Powered Course Generation** - Utilizes Groq AI with Llama 3.3 70B for intelligent content creation
- **Automated Chapter Creation** - Generates detailed chapter content with explanations and code examples
- **Video Integration** - Automatically suggests relevant YouTube videos for each chapter
- **Course Management** - Complete CRUD operations for courses and chapters
- **User Authentication** - Secure authentication with NextAuth.js supporting multiple providers

### 🎨 Modern UI/UX
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Dark/Light Mode** - System-aware theme switching
- **Smooth Animations** - Framer Motion powered transitions and interactions
- **Component Library** - Shadcn/ui components for consistent design
- **Performance Optimized** - Lazy loading, image optimization, and smooth scrolling

### 💳 Premium Features
- **Subscription Management** - PayPal integration for Pro subscriptions
- **Course Publishing** - Public/private course visibility controls
- **Advanced Analytics** - Course statistics and user engagement tracking
- **Cloud Storage** - Cloudinary integration for image and banner uploads

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15.1.3 with App Router and Turbopack
- **UI Library**: React 19 with TypeScript
- **Styling**: Tailwind CSS 3.4.1 with custom design system
- **Components**: Radix UI primitives with Shadcn/ui
- **Animations**: Framer Motion 12.8.0
- **Icons**: Lucide React & React Icons
- **Theme**: Next-themes for dark/light mode

### Backend
- **Runtime**: Node.js with Next.js API routes
- **Database**: PostgreSQL with Prisma ORM 6.8.2
- **Authentication**: NextAuth.js 5.0 (GitHub, Google, Credentials)
- **AI Integration**: Groq SDK with Llama 3.3 70B (Free)
- **File Upload**: Cloudinary for image management
- **Email**: React Email with Resend for transactional emails

### Development Tools
- **Language**: TypeScript 5.0
- **Linting**: ESLint with Next.js config
- **Validation**: Zod schemas for type-safe data validation
- **Forms**: React Hook Form with Hookform resolvers
- **Deployment**: Docker support with multi-stage builds

## 📁 Project Structure

```
coursebotics/
├── 📁 app/                          # Next.js App Router
│   ├── 📁 (auth)/                   # Authentication pages
│   │   ├── 📁 sign-in/              # Sign in page
│   │   └── 📁 sign-up/              # Sign up page
│   ├── 📁 api/                      # API routes
│   │   ├── 📁 auth/                 # NextAuth.js endpoints
│   │   ├── 📁 course/               # Course management APIs
│   │   ├── 📁 getUserCourses/       # User course fetching
│   │   ├── 📁 storeData/            # Course data storage
│   │   └── 📁 uploadImgToCloudinary/ # Image upload API
│   ├── 📁 course/                   # Course viewing pages
│   ├── 📁 create-course/            # Course creation workflow
│   ├── 📁 dashboard/                # User dashboard
│   ├── 📁 _components/              # Shared page components
│   ├── 📁 _context/                 # React context providers
│   ├── 📁 _actions/                 # Server actions
│   ├── layout.tsx                   # Root layout
│   ├── page.tsx                     # Landing page
│   └── globals.css                  # Global styles
├── 📁 components/                   # Reusable UI components
│   ├── 📁 ui/                       # Shadcn/ui components
│   ├── form-error.tsx               # Form error handling
│   ├── form-success.tsx             # Form success messages
│   └── theme-provider.tsx           # Theme context provider
├── 📁 configs/                      # Configuration files
│   ├── AiModel.tsx                  # Google Gemini AI setup
│   ├── cloudinary.ts               # Cloudinary configuration
│   └── Service.ts                   # Service configurations
├── 📁 data/                         # Data access layer
│   ├── user.ts                      # User data operations
│   ├── verification-token.ts        # Token management
│   └── password-reset-token.ts      # Password reset logic
├── 📁 emails/                       # Email templates
│   ├── verification.tsx             # Email verification
│   ├── resetPassword.tsx           # Password reset emails
│   └── layout.tsx                   # Email layout
├── 📁 hooks/                        # Custom React hooks
│   ├── use-smooth-scroll.tsx        # Smooth scrolling
│   ├── use-mobile.tsx               # Mobile detection
│   └── use-content-preloader.tsx    # Content preloading
├── 📁 lib/                          # Utility libraries
│   ├── db.ts                        # Database connection
│   ├── utils.ts                     # Utility functions
│   ├── mail.ts                      # Email utilities
│   └── tokens.ts                    # Token management
├── 📁 prisma/                       # Database schema & migrations
│   ├── schema.prisma                # Database schema
│   └── 📁 migrations/               # Database migrations
├── 📁 public/                       # Static assets
├── 📁 schemas/                      # Zod validation schemas
├── 📁 types/                        # TypeScript type definitions
├── auth.config.ts                   # NextAuth configuration
├── auth.ts                          # Auth setup
├── middleware.ts                    # Next.js middleware
├── routes.ts                        # Route definitions
└── tailwind.config.ts               # Tailwind configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Google Gemini API key
- Cloudinary account (optional)
- GitHub/Google OAuth apps (optional)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/coursebotics.git
cd coursebotics
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/coursebotics"

# NextAuth.js
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"

# AI API Keys (Choose one)
# Groq AI (Free - Recommended)
NEXT_PUBLIC_GROQ_API_KEY="your-groq-api-key"

# Google Gemini AI (Alternative)
NEXT_PUBLIC_GEMINI_API_KEY="your-gemini-api-key"

# OAuth Providers (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# Cloudinary (Optional)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
NEXT_PUBLIC_CLOUDINARY_API_KEY="your-api-key"
NEXT_PUBLIC_CLOUDINARY_API_SECRET="your-api-secret"

# Email (Optional)
RESEND_API_KEY="your-resend-api-key"

# PayPal (Optional)
PAYPAL_CLIENT_ID="your-paypal-client-id"
PAYPAL_CLIENT_SECRET="your-paypal-client-secret"
```

### 4. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# (Optional) Seed the database
npx prisma db seed
```

### 5. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 🐳 Docker Deployment

### Development with Docker

```bash
# Build and run with Docker Compose
docker-compose up

# Run in detached mode
docker-compose up -d
```

### Production Build

```bash
# Build production image
docker build -t coursebotics:latest --target production .

# Run production container
docker run -p 3000:3000 --env-file .env coursebotics:latest
```

## 📊 Database Schema

### Core Models

- **User**: User accounts with authentication and subscription data
- **CourseList**: Course metadata and configuration
- **CourseChapters**: Individual chapter content and videos
- **Subscription**: Pro subscription management
- **Session/Account**: NextAuth.js session management

### Key Relationships

```prisma
User (1) ←→ (n) CourseList
CourseList (1) ←→ (n) CourseChapters
User (1) ←→ (1) Subscription
```

## 🔌 API Endpoints

### Course Management
- `GET /api/getUserCourses` - Fetch user's courses
- `POST /api/storeData` - Create new course
- `PUT /api/course/[courseId]` - Update course
- `DELETE /api/deleteCourse` - Delete course
- `GET /api/getAllcourses` - Public course listing

### Chapter Management
- `GET /api/getChapters` - Fetch course chapters
- `POST /api/storeDataInCourseChapter` - Create chapter content
- `PUT /api/course/[courseId]/updateChapter` - Update chapter

### File Upload
- `POST /api/uploadImgToCloudinary` - Upload images
- `POST /api/course/[courseId]/uploadBanner` - Upload course banners

### Payment
- `POST /api/create-paypal-order` - Create PayPal order
- `POST /api/capture-paypal-payment` - Capture payment

## 🎨 UI Components

### Custom Components
- **PageLoader**: Full-screen loading animation
- **SmoothScroll**: Enhanced scrolling experience
- **LazySection**: Performance-optimized section loading
- **ThemeToggle**: Dark/light mode switcher
- **UserButton**: User profile dropdown

### Shadcn/ui Components
- Forms, Buttons, Cards, Dialogs
- Dropdowns, Tooltips, Progress bars
- Tabs, Switches, Scroll areas

## 🔧 Custom Hooks

- `useSmoothScroll`: Smooth scrolling functionality
- `useContentPreloader`: Content loading optimization
- `useMobile`: Mobile device detection
- `useImagePreloader`: Image preloading for performance

## 🌐 Features in Detail

### AI Course Generation
1. User inputs course parameters (title, category, level, duration, chapters)
2. Google Gemini AI generates course structure and content
3. System creates chapters with detailed explanations and code examples
4. YouTube videos are suggested for each chapter topic

### User Authentication
- Email/password authentication with verification
- OAuth integration (Google, GitHub)
- Two-factor authentication support
- Password reset functionality

### Course Management
- Create, edit, and delete courses
- Publish/unpublish courses
- Upload custom banners
- Chapter-by-chapter content editing

### Subscription System
- Free tier with limited features
- Pro subscription via PayPal
- Subscription status tracking
- Feature gating based on subscription

## 🚀 Deployment Options

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Deploy
railway deploy
```

### Docker
See [DOCKER.md](DOCKER.md) for detailed Docker deployment instructions.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Scripts

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run postinstall  # Generate Prisma client
```

## 🔒 Security Features

- CSRF protection with NextAuth.js
- SQL injection prevention with Prisma
- Input validation with Zod schemas
- Secure password hashing with bcryptjs
- Environment variable protection

## 📈 Performance Optimizations

- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js Image component with Cloudinary
- **Lazy Loading**: Component and content lazy loading
- **Caching**: API response caching and static generation
- **Bundle Analysis**: Optimized bundle sizes

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection**: Ensure PostgreSQL is running and DATABASE_URL is correct
2. **API Keys**: Verify all required API keys are set in environment variables
3. **Build Errors**: Clear `.next` folder and reinstall dependencies
4. **Authentication**: Check OAuth app configurations and callback URLs

### Debug Mode

```bash
# Enable debug logging
DEBUG=* npm run dev
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Google Gemini](https://ai.google.dev/) for AI-powered content generation
- [Shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Prisma](https://www.prisma.io/) for type-safe database access
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling

---

<div align="center">

**Built with ❤️ by the CourseBotics Teams**

[🌐 Website](https://coursebotics.com) • [📧 Contact](mailto:contact@coursebotics.com) • [🐛 Issues](https://github.com/your-username/coursebotics/issues)

</div>
