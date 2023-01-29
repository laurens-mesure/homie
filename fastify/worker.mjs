import findLocal from "local-devices";
import WebSocket from "ws";

const socket = new WebSocket("ws://127.0.0.1:3001");

let devices = [];

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

  const updatedDevices = devices
    .map((device) => {
      const updatedMac = updatedScan.find(({ mac }) => device.mac === mac);
      if (updatedMac) {
        return { ...device, updatedAt: new Date(), ghost: false };
      } else {
        if (device.ghost && new Date().getTime() - device.updatedAt.getTime() > 60 * 60 * 1000) {
          // Delete from list if ghosted for more then 1 hour
          return null;
        }

        return { ...device, ghost: true };
      }
    })
    .filter(Boolean);

  const newMacs = updatedScan.filter(({ mac }) => !devices.find((device) => device.mac === mac));

  devices = [...updatedDevices, ...newMacs];

  return devices;
}

export {};
