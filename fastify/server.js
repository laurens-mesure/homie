Bun.serve({
  websocket: {
    scan(ws, msg) {
      console.log(msg);
      ws.send(msg);
    },
    async message(ws, msg) {
      console.log(msg);
      if (msg === "scan") {
        // const data = await findLocal();
        return ws.send(JSON.stringify({ something: "nothing" }));
      }

      throw new Error(`msg: ${msg} was not defined`);
    },
    close() {
      console.log("Client has disconnected");
    },
  },
  fetch(req, server) {
    if (!server.upgrade(req)) {
      return new Response(null, { status: 404 });
    }
  },
  port: 3000,
});
