# Primord - Genshin Impact Gift Code Notifier Bot
Primord is a Discord bot built with discord.js that automatically notifies users when a new Genshin Impact gift code becomes available for redeem.
The bot periodically checks online Genshin Impact community websites for new codes and sends a notification message to subscribed users in a designated Discord channel.

## Features
- Automated notifications for new Genshin Impact gift codes.
- User-friendly commands for subscribing or unsubscribing from notifications.

## Prerequisites

Before using Primord, you must have the following:
- A Discord Bot Application with a bot token. See the [Discord Developer Portal](https://discord.com/developers/docs/intro) for more information on creating a bot.
- A MongoDB instance. See the [MongoDB website](https://www.mongodb.com/) for more information on getting started with MongoDB.

## Getting Started
To use Primord in your Discord server, follow these steps:

1. Create a new Discord application.
2. Create a bot user for your application and copy the bot token.
3. Clone this repository and run `yarn install` to install dependencies.
4. Copy the .env.example file to .env and update the `DISCORD_TOKEN` variable with your bot token and `MONGO_URI` with your MongoDB connection string.
5. Run `node index.js` to start the bot or you can use `PM2` for better reliability.

Once the bot is running, you can use the following commands:
- `/primosub`: Toggle subscription to gift code notifications.

## Screenshot
![image](https://user-images.githubusercontent.com/50010805/220254846-03a7b05e-e8e9-4be7-b4c7-8d75abf48061.png)


## Contributing
Contributions and PR(s) are welcome!

## License
Primord is licensed under the MIT License. See the LICENSE file for more information.
