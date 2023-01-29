# Who is home

This app allows you to track when your loved ones or friends arrive home. Simply invite them to join the app. You will receive a notification when they arrive home, giving you peace of mind knowing they have safely returned. You can also view a history of their arrivals and departures. It's the perfect tool for keeping in touch with family members or ensuring the safety of roommates or children.

## Technical dificulties

The backend scans the local network on an infinite loop. This enables us to detect when a device has left the network and label it as "gone". But, modern devices aren't always connected to the internet. They can turn off the connection to the WiFi for maybe 10-20min before reconnecting and checking messages again. Some devices can even use mobile data when it detects a weak internet connection.

### iPhone

The iPhone (and probably other iOS devices) have something called _dynamic mac addresses_. This feature changes the MAC address of your device per network. Luckily, the MAC address stays the same per network it connects to.

### Android

Android is much easier to work with although I have encountered some devices that use 2 MAC addresses and switch between them. When this happens you could assign the same name to both MAC addresses.

## Setup

### Frontend client

The frontend service is a Next.js project and servers as a user interface for the Fastify backend server. It receives real-time websocket messages from the backend, which scans the local network for connected devices and returns their MAC addresses. The frontend displays this information in an easy-to-read format, making it simple for users to monitor their network and view the connected devices. The websocket connection ensures that the information displayed is always up-to-date, providing users with a real-time view of their network.

#### Development

Make sure to set the correct values in the `.env` file. An example is provided in the `.env.example` file.

```bash
pnpm i
pnpm dev
```

#### Production

You can run this project fairly easy on your local network. There is a configuration file for PM2. PM2 is a simple but powerful tool to run and processes.

With PM2 (requires PM2 to be installed: `npm install pm2@latest -g`):

```bash
pnpm i
pnpm build
pm2 start -- pnpm start --name frontend
```

You can also start the project without PM2:

```bash
pnpm i
pnpm build
pnpm start
```

### Backend server

The Fastify backend server is a powerful tool for network monitoring. It features two threads: the main server thread and a worker thread. The worker thread scans the local network on a set interval (10min production - 5s develop) and retrieves the MAC addresses of connected devices. The worker thread then parses this information and connects to the websocket server to transmit the data to the frontend. This process ensures that the frontend always has access to the latest information about the network. The use of websockets for communication between the backend and frontend allows for real-time updates, providing users with an up-to-date view of their network at all times.

```bash
cd fastify
pnpm i
pnpm start
```

## PM2 Ecosystem

If you have PM2 installed you can easily run the ecosystem.config.js file to start both services. The services will automatically restart ~~if~~ when the server crashes.

```bash
pm2 start ecosystem.config.js
```

## FAQ

**Q**: I don't see my MAC address in the list. <br>
**A**: Try to disconnect and reconnect the device while turning off mobile data. Go to google.com (just to create a connection with your router). Give it a couple of seconds and the MAC address should show up.

**Q**: I have disconnected my device but the webapp still says my device is connected. <br>
**A**: There could be (significant) delay when disconnecting a device. It depends on the ARP table of your device. ARP tables are usually quite fleeying but some devices do keep them longer than they should which results in a connected device.

**Q**: The device is gone but is grayed out in the webapp. <br>
**A**: Modern devices aren't permanently connected to the internet. They could disconnect themselves for a couple of minutes and then reconnect. This would give false negatives which is why it is grayed out. Grayed out means that the device was detected in the last hour but the app is unsure if the device has actually left or is just in _"sleep mode"_.
