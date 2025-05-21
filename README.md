# WebSocket Chat App

This is a full-stack real-time chat application built using **React** and **Tailwind CSS** on the frontend, and **Node.js**, **Express**, and **Socket.IO** on the backend. Authentication is handled using **JWT (JSON Web Tokens)** and a set of mock users, making this a lightweight yet fully functional example of a real-time messaging system.

## 📂 Project Overview

The project is organized into two main parts:  
- The **client** folder contains the React frontend application styled using Tailwind CSS.
- The **server** folder includes the Express-based backend server which handles authentication and WebSocket communication via Socket.IO.

This project demonstrates how to integrate JWT-based authentication with WebSocket connections, making it ideal for anyone learning real-time applications or authentication flows in modern web development.

## 🧑‍💻 Setup Instructions

To run the project locally, you need to install dependencies for both the client and server. Make sure Node.js is installed on your system.

```bash
# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
