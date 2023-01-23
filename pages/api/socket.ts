// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import findLocal from "local-devices";

type Data = {
  socket?: {
    server?: {
      io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
    };
  };
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // It means that socket server was already initialised
  // @ts-ignore
  if (res.socket.server.io) {
    console.log("Already set up");
    return res.end();
  }

  // @ts-ignore
  const io = new Server(res.socket.server);
  // @ts-ignore
  res.socket.server.io = io;

  // Define actions inside
  io.on("connection", async (socket) => {
    socket.on("scan", async () => {
      const data = await findLocal();
      socket.broadcast.emit("scanResult", JSON.stringify(data));
    });
  });

  console.log("Setting up socket");
  res.end();
}
