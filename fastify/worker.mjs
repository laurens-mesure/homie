import findLocal from "local-devices";
import WebSocket from "ws";

const socket = new WebSocket("ws://localhost:3001");

let macs = [];

socket.onopen = () => {
  setInterval(
    () => {
      findLocal().then((data) => {
        const parsedScan = parseScan(data);

        return socket.send(JSON.stringify({ name: "scan_result", data: parsedScan }));
      });
    },
    process.env.NODE_ENV === "production" ? 600000 : 5000
  );
};

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

  const newMacs = updatedScan.filter(({ mac }) => !macs.find((device) => device.mac === mac));

  macs = [...updatedMacs, ...newMacs];

  return [...updatedMacs, ...newMacs];
}

export {};
