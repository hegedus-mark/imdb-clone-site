# Dentist Movie Site 

A full-stack web application that allows users to discover, track, and interact with movies. Built with React and Express.js, leveraging the TMDB API for movie data.

## Features

- User authentication (login/register)
- Browse popular and now playing movies
- Search functionality for finding specific movies
- Personal watchlist management
- Movie rating system
- Watch movie trailers directly on the site

## Tech Stack

### Frontend
- React
- React Router
- Sass scss

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication

## Installation

### Local Development Setup

#### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- TMDB API Key

#### Backend Setup
1. Clone the repository
```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Create a `.env` file in the backend directory with the following variables:
```env
MONGODB_USERNAME=your_mongodb_username
MONGODB_PASSWORD=your_mongodb_password
MONGODB_CLUSTER=your_cluster_name
MONGODB_DATABASE=your_database_name
JWT_SECRET_KEY=your_jwt_secret_key
JWT_REFRESH_KEY=your_jwt_refresh_key
TMDB_ACCESS_TOKEN=your_tmdb_access_token
PORT=3000
NODE_ENV=development
```

4. Start the backend server
```bash
npm run dev
```

#### Frontend Setup
1. Navigate to the frontend directory
```bash
cd frontend
```

2. Install frontend dependencies
```bash
npm install
```

3. Start the frontend development server
```bash
npm run dev
```

### Docker Installation

1. Make sure the Docker Engine is installed on your system

2. Create the `.env` file as described in the backend setup section

3. Build and run the containers
```bash
docker-compose up --build
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000


## Testing

The backend includes comprehensive test coverage using Mocha and Chai.

To run the tests:
```bash
cd backend
npm test
```

## Contributing

1. Fork the repository
2. Create a new branch for your feature
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## Acknowledgments

- [TMDB API](https://www.themoviedb.org/documentation/api) for providing movie data
- The project was made possible by the contributions of the following developers:
  - [Áron Belme](https://github.com/belmearon)
  - [Márk Hegedűs](https://github.com/hegedus-mark)
  - [Bence Joó](https://github.com/Ben2oid)
