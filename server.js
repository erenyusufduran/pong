const cors = require("cors");
const server = require("http").createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

let readyPlayerCount = 0;

io.on("connection", (socket) => {
  console.log("User connected with", socket.id);

  socket.on("ready", () => {
    console.log("Pleyer ready", socket.id);
    readyPlayerCount++;
    if (readyPlayerCount === 2) {
      // broadcasting
      io.emit("startGame", socket.id);
    }
  });

  socket.on("paddleMove", (paddleData) => {
    socket.broadcast.emit("paddleMove", paddleData);
  });
});
