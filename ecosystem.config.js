module.exports = {
  apps: [
    {
      name: "fastify-service",
      cwd: "./fastify",
      script: "node server.mjs",
      restart_delay: 10,
      autorestart: true,
    },
    {
      name: "frontend-service",
      script: "pnpm start",
      restart_delay: 10,
      autorestart: true,
    },
  ],
};
