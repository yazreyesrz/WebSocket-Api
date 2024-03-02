import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";
const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Handle socket connection
io.on("connection", (socket: Socket) => {
  console.log("New user connected" + socket.id);

  // Handle newAffiliation event
  socket.on("newPedido", (data: any) => {
    console.log("New Pedido:", data);

    // Emit event to front-end
    io.emit("newPedido", data);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Start the server
const port = 4003;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
