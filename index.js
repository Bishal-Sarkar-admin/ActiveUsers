const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://bishal-sarkar-admin.github.io/Music-Lover/", // Allow frontend to connect from any origin
    methods: ["GET", "POST"],
  },
});

let activeUsers = new Set(); // Store unique users

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
  activeUsers.add(socket.id);
  io.emit("activeUsers", activeUsers.size); // Broadcast active users count

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    activeUsers.delete(socket.id);
    io.emit("activeUsers", activeUsers.size); // Update all users
  });
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
