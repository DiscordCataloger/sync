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

      socket.on("joinServer", ({ serverId }) => {
        socket.join(`server_${serverId}`);
        console.log(`User joined server room: server_${serverId}`);
      });

      socket.on("leaveServer", ({ serverId }) => {
        socket.leave(`server_${serverId}`);
        console.log(`User left server room: server_${serverId}`);
      });

      socket.on("joinChannel", ({ channelId }) => {
        socket.join(`channel_${channelId}`);
        console.log(`User joined channel room: channel_${channelId}`);
      });

      socket.on("leaveChannel", ({ channelId }) => {
        socket.leave(`channel_${channelId}`);
        console.log(`User left channel room: channel_${channelId}`);
      });

      socket.on("sendMessage", (message) => {
        const { channelId } = message;
        io.to(`channel_${channelId}`).emit("receiveMessage", message);
      });

      socket.on("sendServerMessage", (message) => {
        const { serverId, channelId } = message;
        io.to(`server_${serverId}`).emit("receiveServerMessage", {
          ...message,
          channelId,
        });
      });

      socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
      });
    });
  }
  return io;
};

module.exports = initSocketServer;
