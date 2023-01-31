import socketServer from "@fastify/websocket";
import fastifyServer from "fastify";
import findLocal from "local-devices";
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
  fastify.get("/", { websocket: true }, ({ socket }, { ip }) => {
    socket.on("message", async (msg) => {
      const data = JSON.parse(msg.toString());

      if (data.name === "scan_result") {
        if (fastify.websocketServer.clients.size < 2) return;
        console.debug(
          `↗️  Sending data to socket clients (# ${fastify.websocketServer.clients.size})`
        );
        fastify.websocketServer.emit(msg);
      } else if (data.name === "join") {
        const devices = await findLocal();
        const deviceName = data.deviceName;

        const newDevice = devices.find((device) => device.ip === ip);
        socket.send(JSON.stringify({ name: "joined", mac: newDevice.mac, deviceName }));
        socket.send(JSON.stringify({ name: "init_seed" }));
      } else if (data.name === "seed_resp") {
        fastify.websocketServer.emit(JSON.stringify({ name: "seed", saves: data.saves }));
      }
    });
  });
});

fastify.listen({ port: 3001, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.info(`Server listening at: ${address} 🔥`);
});
