# Leave Your Messages Website

A full-stack web application that allows users to leave messages with 3D interactive elements built with React, Three.js, and Node.js.

## Features

- Interactive 3D message board using React Three Fiber
- Real-time message submission and display
- Image upload functionality with Cloudinary integration
- MongoDB database for message persistence
- Responsive design with smooth animations
- Modern UI with styled-components

## Tech Stack

### Frontend
- React 19.1.0
- Vite 6.3.5
- Three.js / React Three Fiber
- Framer Motion for animations
- React Router for navigation
- Styled Components
- AOS (Animate On Scroll)

### Backend
- Node.js with Express 5.1.0
- MongoDB with Mongoose
- Cloudinary for image storage
- CORS enabled
- Multer for file handling

## Prerequisites

- Node.js (v18 or higher)
- MongoDB account (MongoDB Atlas recommended)
- Cloudinary account for image uploads
- npm or yarn package manager

## Quick Start

1. Clone the repository:
```bash
git clone https://github.com/yourusername/Leave-Your-Messages-Website.git
cd Leave-Your-Messages-Website
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (see setup.md for details)

4. Run the development servers:
```bash
npm run dev
```

This will start both the client (http://localhost:5173) and server (http://localhost:5000) concurrently.

##  Project Structure

```
Leave-Your-Messages-Website/
├── client/              # React frontend
│   ├── src/             # Source files
│   ├── public/          # Static assets
│   └── package.json     # Client dependencies
├── server/              # Express backend
│   ├── server.js        # Main server file
│   ├── cloudinary.js    # Cloudinary configuration
│   └── package.json     # Server dependencies
├── package.json         # Root package.json with scripts
└── setup.md            # Detailed setup instructions
```

## Available Scripts

- `npm run dev` - Run both client and server concurrently
- `npm run dev:client` - Run only the frontend
- `npm run dev:server` - Run only the backend
- `npm run build` - Build the client for production

## Documentation

For detailed setup instructions, environment configuration, and deployment guide, please refer to [setup.md](./setup.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
