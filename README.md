# D-Tunes 🎵

D-Tunes is a music streaming web application built with React, Vite, and Node.js. It allows users to search for music, register, log in, and stream their favorite tunes directly from YouTube.

## Features

- **User Authentication:** Users can register and log in to access the app.
- **Search Functionality:** Search for music using the YouTube API.
- **Playback:** Stream selected music directly from the app.

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Yumnam-L/DTunes.git
   ```

2. **Install dependencies for both the client and server:**

   ```bash
   # For client
   npm install

   # For server
   cd ../server
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the `server` directory with the following variables:

   ```plaintext
   MONGO_URI=your-mongodb-uri
   PORT=5000
   YOUTUBE_API_KEY=your-youtube-api-key
   JWT_SECRET=your-jwt-secret
   ```

4. **Start the development servers:**

   ```bash
   # Start the server
   cd server
   npm run dev

   # Start the client
   npm run dev
   ```

5. **Access the app:**

   Visit `http://localhost:5173` in your web browser.

## Environment Variables

Ensure you have the following environment variables set in the `.env` file in the `server` directory:

- **MONGO_URI:** The MongoDB connection string.
- **PORT:** The port number for the backend server (default is 5000).
- **YOUTUBE_API_KEY:** Your API key for accessing the YouTube Data API.
- **JWT_SECRET:** A secret key for signing JSON Web Tokens (JWTs) for authentication.

## API Endpoints

### Registration

- **POST /api/register**
  - Register a new user.
  - **Request Body:** `{ username, email, password }`
  - **Response:** `{ token }`

### Login

- **POST /api/login**
  - Authenticate an existing user.
  - **Request Body:** `{ email, password }`
  - **Response:** `{ token }`

### Search

- **GET /api/search**
  - Search for music using the YouTube API.
  - **Query Parameters:** `query`
  - **Response:** List of music matching the search query.
