import fastify from "fastify";
import fastifySocket from "fastify-socket.io";
import findLocal from "local-devices";

const app = fastify();

app.register(fastifySocket, {
  namespace: "/",
});

app.io.on("connection", async (socket) => {
  // init
  const data = await findLocal();
  socket.broadcast.emit("scanResult", JSON.stringify(data));

  socket.on("scan", async () => {
    const data = await findLocal();
    socket.broadcast.emit("scanResult", JSON.stringify(data));
  });
});
