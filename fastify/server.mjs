import socketServer from "@fastify/websocket";
import fastifyServer from "fastify";
import { Worker } from "node:worker_threads";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

new Worker(path.join(__dirname, "worker.mjs"));
const fastify = fastifyServer();

fastify.register(socketServer, {
  clientTracking: true,
});

fastify.register(async function (fastify) {
  fastify.get("/", { websocket: true }, ({ socket }) => {
    socket.on("message", async (msg) => {
      const data = JSON.parse(msg.toString());
      if (data.name === "scan_result") {
        if (fastify.websocketServer.clients.size < 2) return;
        console.log("Sending...");
        fastify.websocketServer.clients.forEach((client) => {
          client.send(msg);
        });
      }
    });
  });
});

fastify.listen({ port: 3001, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at: ${address}`);
});
