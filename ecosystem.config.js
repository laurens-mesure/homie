module.exports = {
  apps: [
    {
      name: "fastify",
      cwd: "./fastify",
      script: "node server.mjs",
      restart_delay: 10,
      autorestart: true,
    },
    {
      name: "frontend",
      script: "pnpm start",
      restart_delay: 10,
      autorestart: true,
    },
  ],
};
