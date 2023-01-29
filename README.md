# Who is home

This app allows you to track when your loved ones or friends arrive home. Simply invite them to join the app and set their home location. You will receive a notification when they arrive home, giving you peace of mind knowing they have safely returned. You can also view a history of their arrivals and departures. It's the perfect tool for keeping in touch with family members or ensuring the safety of roommates or children.

## Setup

### Frontend client

Receives socket messages from the backend server with data about the connected network devices.

#### Development

```bash
pnpm i
pnpm dev
```

#### Production

```bash
pnpm i
pnpm build
pnpm start:production
```

### Backend server

Sends socket messages with the connected network devices through a multithreaded worker that polls every `n` times for the `arp` table.

```bash
cd fastify
pnpm i
pnpm start
```
