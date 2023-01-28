/* eslint-disable @typescript-eslint/no-var-requires */
const fastify = require("fastify")();
const findLocal = require("local-devices");

let macs = [];

fastify.register(require("@fastify/websocket"), {
  clientTracking: true,
});

fastify.register(async function (fastify) {
  fastify.get("/", { websocket: true }, ({ socket }) => {
    socket.on("message", async (data) => {
      const action = data.toString();

      if (action === "connected") {
        console.log("device connected");
        const scan = await findLocal();

        const parsedScan = parseScan(scan);

        return socket.send(JSON.stringify({ name: "scan_result", data: parsedScan }));
      }
    });
  });
});

fastify.listen({ port: 3000, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at: ${address}`);
});

function parseScan(data) {
  const updatedScan = data.map((device) => ({
    name: device.name,
    mac: device.mac,
    createdAt: new Date(),
    updatedAt: new Date(),
    ghost: false,
  }));

  const updatedMacs = macs
    .map((device) => {
      const updatedMac = updatedScan.find(({ mac }) => device.mac === mac);
      if (updatedMac) {
        return { ...device, updatedAt: new Date(), ghost: false };
      } else {
        if (device.ghost && new Date().getTime() - device.updatedAt.getTime() > 60 * 60 * 1000) {
          return null;
        }

        return { ...device, ghost: true };
      }
    })
    .filter(Boolean);

  const newMacs = updatedScan.filter(({ mac }) => !!macs.find((device) => device.mac === mac));

  macs = [...updatedMacs, ...newMacs];

  return [...updatedMacs, ...newMacs];
}
