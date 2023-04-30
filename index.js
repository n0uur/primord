require('dotenv').config()

const Discord = require('discord.js')
const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.GuildMessageReactions,
  ],
})
const cron = require('node-cron')
const getGenshinCode = require('./getGenshinCode')
const SubscribeChannel = require('./models/SubscribeChannel')
const GiftCode = require('./models/GiftCodes')

let isReady = false

client.login(process.env.DISCORD_TOKEN)

const commands = [
  {
    name: 'primosub',
    description: "Subscribe/Unsubscribe to the Genshin's Gift notification",
  },
]

const rest = new Discord.REST({ version: '10' }).setToken(
  process.env.DISCORD_TOKEN
)

;(async () => {
  try {
    console.log('Started refreshing application (/) commands.')

    await rest.put(
      Discord.Routes.applicationCommands(process.env.DISCORD_CLIENT_ID),
      {
        body: commands,
      }
    )

    console.log('Successfully reloaded application (/) commands.')
  } catch (error) {
    console.error(error)
  }
})()

client.on('ready', () => {
  console.log('Ready!')
  isReady = true
})

client.on('interactionCreate', (message) => {
  if (message.commandName === 'primosub') {
    ;(async () => {
      const isSubscribed = await SubscribeChannel.findOne({
        channelId: message.channelId,
      })

      if (isSubscribed) {
        try {
          await SubscribeChannel.deleteOne({
            channelId: message.channelId,
          })

          message.reply(
            "You have unsubscribed to the Genshin's Gift notification at <#" +
              message.channelId +
              '>' +
              ' channel'
          )
        } catch (err) {
          message.reply('Something went wrong. Please try again later.')
        }

        return
      }

      await SubscribeChannel.create({
        channelId: message.channelId,
        channelName: message.channel.name,
        guildId: message.guildId,
        guildName: message.guild.name,
        userId: message.user.id,
        userName: message.user.username,
        userTag: message.user.tag,
        userAvatar: message.user.avatar,
      })
        .then(() => {
          message.reply(
            "You have subscribed to the Genshin's Gift notification at <#" +
              message.channelId +
              '>' +
              ' channel'
          )
        })
        .catch(() => {
          message.reply('Something went wrong. Please try again later.')
        })
    })()
  }
})

// every 1 minute
cron.schedule('*/1 * * * *', async () => {
  if (isReady) {
    ;(async () => {
      const codes = await getGenshinCode()

      if (codes.length === 0) {
        return
      }

      const embed = new Discord.EmbedBuilder()
        .setColor('#4a5969')
        .setTitle("Redeem New Genshin's Gift Code Now!")
        .setURL('https://genshin.hoyoverse.com/en/gift')
        .setAuthor({
          name: 'Primord',
          iconURL: 'https://i.imgur.com/WZw0g7b.jpg',
          url: 'https://genshin.hoyoverse.com/en/gift',
        })
        .setDescription("New Genshin's Gift Code Updated!")
        .addFields(
          codes.map((c) => {
            return {
              name: c.code,
              value: c.description,
              inline: false,
            }
          })
        )
        .setTimestamp()
        .setImage('https://i.imgur.com/po12gAt.png')
        .setFooter({
          text: 'Primord',
          iconURL: 'https://i.imgur.com/WZw0g7b.jpg',
        })

      const subscribedChannels = await SubscribeChannel.find()
      subscribedChannels.forEach((channel) => {
        client.channels.cache.get(channel.channelId).send({ embeds: [embed] })
      })

      if (subscribedChannels?.length > 0) await GiftCode.insertMany(codes)
    })()
  }
})
