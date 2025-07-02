# Setup Guide - Leave Your Messages Website

This guide provides detailed instructions for setting up the Leave Your Messages Website application on your local machine.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Environment Configuration](#environment-configuration)
4. [Database Setup](#database-setup)
5. [Cloudinary Setup](#cloudinary-setup)
6. [Running the Application](#running-the-application)
7. [Troubleshooting](#troubleshooting)
8. [Deployment](#deployment)

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation: `node --version`
- **npm** (comes with Node.js)
  - Verify installation: `npm --version`
- **Git**
  - Download from [git-scm.com](https://git-scm.com/)
  - Verify installation: `git --version`

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/Leave-Your-Messages-Website.git
   cd Leave-Your-Messages-Website
   ```

2. **Install dependencies:**
   ```bash
   # Install root dependencies (including concurrently)
   npm install
   
   # This will also install client and server dependencies
   ```

   The `npm install` command in the root directory automatically runs:
   - `npm --prefix client install`
   - `npm --prefix server install`

## Environment Configuration

### Server Configuration

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Create a `.env` file:
   ```bash
   touch .env
   ```

3. Copy the following template and update with your credentials:
   ```env
   # MongoDB Configuration
   DATABASE_URL=mongodb+srv://[username]:[password]@[cluster].mongodb.net/?retryWrites=true&w=majority&appName=[appname]
   
   # API Configuration
   VITE_API_BASE=http://localhost:5000
   
   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

### Client Configuration (if needed)

The client is configured to use the API at `http://localhost:5000` by default. If you need to change this:

1. Create a `.env` file in the client directory:
   ```bash
   cd ../client
   touch .env
   ```

2. Add the API URL:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

## Database Setup

### MongoDB Atlas (Recommended)

1. **Create an account** at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

2. **Create a new cluster:**
   - Choose the free tier (M0)
   - Select your preferred region
   - Name your cluster

3. **Set up database access:**
   - Go to "Database Access" in the sidebar
   - Add a new database user
   - Save the username and password

4. **Configure network access:**
   - Go to "Network Access"
   - Add IP Address
   - For development, you can allow access from anywhere (0.0.0.0/0)
   - For production, restrict to your server's IP

5. **Get your connection string:**
   - Go to your cluster dashboard
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Update the `DATABASE_URL` in your `.env` file

## Cloudinary Setup

1. **Create an account** at [Cloudinary](https://cloudinary.com/)

2. **Get your credentials:**
   - Go to your Cloudinary Dashboard
   - Find your Cloud Name, API Key, and API Secret
   - Update these in your server `.env` file

3. **Configure upload presets (optional):**
   - Go to Settings > Upload
   - Create an upload preset for your messages
   - Set any transformations or restrictions as needed

## Running the Application

### Development Mode

From the root directory, run:

```bash
npm run dev
```

This command uses `concurrently` to run both the client and server simultaneously:
- Client: http://localhost:5173
- Server: http://localhost:5000

### Running Separately

If you prefer to run the client and server in separate terminals:

**Terminal 1 - Server:**
```bash
npm run dev:server
```

**Terminal 2 - Client:**
```bash
npm run dev:client
```

## Troubleshooting

### Common Issues

1. **Port already in use:**
   - Client default port: 5173
   - Server default port: 5000
   - Kill the process using the port or change the port in the configuration

2. **MongoDB connection failed:**
   - Check your connection string format
   - Verify your IP is whitelisted in MongoDB Atlas
   - Ensure username and password are correct
   - Check if the cluster is active

3. **Cloudinary upload fails:**
   - Verify all three Cloudinary credentials are correct
   - Check if you have upload quota remaining
   - Ensure the image format is supported

4. **CORS errors:**
   - The server is configured to accept requests from the client URL
   - If you change the client port, update the CORS configuration in `server.js`

5. **Module not found errors:**
   - Delete `node_modules` folders in root, client, and server
   - Delete `package-lock.json` files
   - Run `npm install` again from the root

### Debugging Tips

1. **Check server logs:**
   - Server logs will appear in the terminal running the server
   - Look for connection success messages for MongoDB and port binding

2. **Check browser console:**
   - Open Developer Tools (F12)
   - Check the Console tab for client-side errors
   - Check the Network tab for failed API requests

3. **Verify environment variables:**
   - Use `console.log(process.env.YOUR_VARIABLE)` to debug
   - Ensure `.env` file is in the correct directory
   - Restart the server after changing `.env` files

## Deployment

### Deploying the Client (Vercel/Netlify)

1. **Build the client:**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel:**
   - Install Vercel CLI: `npm i -g vercel`
   - Run `vercel` in the client directory
   - Follow the prompts

3. **Deploy to Netlify:**
   - Create a `netlify.toml` in the client directory:
   ```toml
   [build]
     command = "npm run build"
     publish = "dist"
   ```
   - Deploy via Netlify CLI or GitHub integration

### Deploying the Server (Render/Railway)

1. **Prepare for deployment:**
   - Ensure all environment variables are set in the hosting platform
   - Update CORS settings to include your production client URL

2. **Deploy to Render:**
   - Connect your GitHub repository
   - Set build command: `npm install`
   - Set start command: `node server.js`
   - Add all environment variables

3. **Deploy to Railway:**
   - Connect your GitHub repository
   - Railway will auto-detect Node.js
   - Add environment variables in the dashboard

### Environment Variables for Production

Remember to update these for production:
- `DATABASE_URL` - Keep the same
- `VITE_API_BASE` - Update to your production server URL
- `CLOUDINARY_*` - Keep the same
- Update CORS in server.js to allow your production client URL

## Additional Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Express.js Documentation](https://expressjs.com/)

## Support

If you encounter any issues not covered in this guide, please:
1. Check the [GitHub Issues](https://github.com/yourusername/Leave-Your-Messages-Website/issues)
2. Create a new issue with detailed information about your problem
3. Include error messages, environment details, and steps to reproduce