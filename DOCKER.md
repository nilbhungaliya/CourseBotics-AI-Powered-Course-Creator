# Docker Setup for AI-Powered Course Creator

This document explains how to run the AI-Powered Course Creator application using Docker.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- Prisma Accelerate account (for database)

## Getting Started

### 1. Environment Variables

Copy the example Docker environment file and update it with your actual values:

```bash
cp .env.docker .env
```

Edit the `.env` file to add your API keys and secrets, especially your Prisma Accelerate API key.

### 2. Build and Run with Docker Compose

For development:

```bash
docker-compose up
```

This will:
- Build the Docker image for the application
- Start the Next.js application in development mode
- Mount your local files into the container for hot reloading
- Connect to your Prisma Accelerate database service

### 3. Build for Production

To build a production-ready Docker image:

```bash
docker build -t coursebotics:latest --target production .
```

To run the production image:

```bash
docker run -p 3000:3000 --env-file .env coursebotics:latest
```

## Docker Compose Commands

- Start the application: `docker-compose up`
- Start in detached mode: `docker-compose up -d`
- Stop the application: `docker-compose down`
- Rebuild the image: `docker-compose build`
- View logs: `docker-compose logs -f`

## Database Management

This application uses Prisma Accelerate for database management. The database is hosted in the cloud and managed through Prisma's service.

## Prisma Commands in Docker

To run Prisma commands inside the Docker container:

```bash
# Generate Prisma client
docker-compose exec app npx prisma generate

# Run migrations (if you have permission to modify the schema)
docker-compose exec app npx prisma migrate dev

# Open Prisma Studio (if your Prisma Accelerate plan supports it)
docker-compose exec app npx prisma studio
```

Note: Some Prisma commands may be limited based on your Prisma Accelerate plan and permissions.

## Troubleshooting

- If you encounter permission issues, make sure your user has permissions to run Docker commands.
- If the application can't connect to the database, ensure your Prisma Accelerate API key is correct and has the necessary permissions.
- For any other issues, check the container logs: `docker-compose logs -f`