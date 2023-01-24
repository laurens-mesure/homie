// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import findLocal from "local-devices";
import type { NextApiRequest, NextApiResponse } from "next";
import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

type Data = {
  socket?: {
    server?: {
      // eslint-disable-next-line
      io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
    };
  };
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  // It means that socket server was already initialised
  // eslint-disable-next-line
  // @ts-ignore
  if (res.socket.server.io) {
    return res.end();
  }

  // eslint-disable-next-line
  // @ts-ignore
  const io = new Server(res.socket.server);
  // eslint-disable-next-line
  // @ts-ignore
  res.socket.server.io = io;

  // Define actions inside
  io.on("connection", async (socket) => {
    // init
    const data = await findLocal();
    socket.broadcast.emit("scanResult", JSON.stringify(data));

    socket.on("scan", async () => {
      const data = await findLocal();
      socket.broadcast.emit("scanResult", JSON.stringify(data));
    });
  });

  res.end();
}
