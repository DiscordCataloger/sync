// socketServer.js
const { Server } = require("socket.io");

let io;

const initSocketServer = (server) => {
  if (!io) {
    io = new Server(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    io.on("connection", (socket) => {
      console.log(`User connected: ${socket.id}`);

      socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
      });

      socket.on("sendMessage", (message) => {
        io.emit("receiveMessage", message);
      });
    });
  }
  return io;
};

module.exports = initSocketServer;
