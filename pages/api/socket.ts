// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

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
  io.on("connection", (socket) => {
    socket.broadcast.emit("connected", "eyo connected ofwa");

    socket.on("scan", (msg) => {
      console.log(msg);
      socket.broadcast.emit(
        "scan",
        JSON.stringify({ name: "schatje", mac: "mkay" })
      );
    });
  });

  console.log("Setting up socket");
  res.end();
}
