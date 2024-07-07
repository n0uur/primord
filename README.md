# Primord - "Genshin Impact", "Honkai: Star Rail", "ZZZ" Gift Code Notifier Bot

Primord is a Discord bot built with discord.js that automatically notifies users when a new Genshin Impact and Honkai: Star Rail gift code becomes available for redeem.
The bot periodically checks online Genshin Impact community websites for new codes and sends a notification message to subscribed users in a designated Discord channel.

## Features

- Automated notifications for new `Genshin Impact` gift codes.
- Automated notifications for new `Honkai: Star Rail` gift codes.
- Automated notifications for new `Zenless Zone Zero` gift codes.
- User-friendly commands for subscribing or unsubscribing from notifications.

## Getting Started

### Invitation

[Invite **Primord** into your server](https://discord.com/api/oauth2/authorize?client_id=1076820373947035688&permissions=412317206528&scope=bot)

### Self Hosted

To use Primord in your Discord server, follow these steps:

#### Prerequisites

Before using Primord, you must have the following:

- A Discord Bot Application with a bot token. See the [Discord Developer Portal](https://discord.com/developers/docs/intro) for more information on creating a bot.
- A MongoDB instance. See the [MongoDB website](https://www.mongodb.com/) for more information on getting started with MongoDB.

#### Setup

1. Create a new Discord application.
2. Create a bot user for your application and copy the bot token.
3. Clone this repository and run `yarn install` to install dependencies.
4. Copy the .env.example file to .env and update the `DISCORD_TOKEN` variable with your bot token and `MONGO_URI` with your MongoDB connection string.
5. Run `node index.js` to start the bot or you can use `PM2` for better reliability.

Once the bot is running, you can use the following commands:

- `/primosub`: Toggle subscription to gift code notifications.

## Screenshot

![image](https://user-images.githubusercontent.com/50010805/220254846-03a7b05e-e8e9-4be7-b4c7-8d75abf48061.png)

![image](https://github.com/n0uur/primord/assets/50010805/c444c79d-53a8-46dc-907f-dee59138b7bf)

## Contributing

Contributions and PR(s) are welcome!

## License

Primord is licensed under the MIT License. See the LICENSE file for more information.
