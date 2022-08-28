require("dotenv").config();
const { token, dataBaseToken } = process.env;
const { connect } = require("mongoose");
const {
  Client,
  Collection,
  GatewayIntentBits,
  EmbedBuilder,
  MessageManager,
  Message,
  InteractionCollector,
} = require("discord.js");
const fs = require("fs");
const { userInfo } = require("os");

const client = new Client({ intents: 32767 });
client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();
client.commandArray = [];

//Logging System Start
client.on("messageDeleteBulk", (messages, channel) => {
  const LogChannel = client.channels.cache.get("989137058641612858"); // Replace with your channel id
  const MessageDelBulk = new EmbedBuilder()
    .setAuthor({
      name: "Diplo Logging System",
      iconURL:
        "https://cdn.discordapp.com/avatars/1002577938253873312/5531369ddca2439247cf97021fb452ca.webp",
    })
    .setColor(0x4bb7f6)
    .setDescription(
      `**🧹 Bulk delete in ${channel}, ${messages.size} messages deleted.**`
    )
    .setTimestamp();

  return LogChannel.send({
    embeds: [MessageDelBulk],
  });
});

client.on("roleCreate", (role) => {
  const LogChannel = client.channels.cache.get("989137058641612858"); // Replace with your channel id
  const roleCreate = new EmbedBuilder()
    .setAuthor({
      name: "Diplo Logging System",
      iconURL:
        "https://cdn.discordapp.com/avatars/1002577938253873312/5531369ddca2439247cf97021fb452ca.webp",
    })
    .setTitle("🧰 Role Created")
    .setColor(0x4bb7f6)
    .addFields(
      { name: 'Role', value: `${role}`, inline: true },
    )
    .setTimestamp();

  return LogChannel.send({
    embeds: [roleCreate],
  });
});

client.on("roleDelete", (role) => {
  const LogChannel = client.channels.cache.get("989137058641612858"); // Replace with your channel id
  const roleDelete = new EmbedBuilder()
    .setAuthor({
      name: "Diplo Logging System",
      iconURL:
        "https://cdn.discordapp.com/avatars/1002577938253873312/5531369ddca2439247cf97021fb452ca.webp",
    })
    .setTitle("💸 Role Deleted")
    .setColor(0x4bb7f6)
    .addFields(
      { name: 'Role', value: `${role}`, inline: true },
    )
    .setTimestamp();

  return LogChannel.send({
    embeds: [roleDelete],
  });
});

client.on("guildUpdate", (oldGuild, newGuild) => {
  const LogChannel = client.channels.cache.get("989137058641612858"); // Replace with your channel id
  const guildUpdate = new EmbedBuilder()
    .setAuthor({
      name: "Diplo Logging System",
      iconURL:
        "https://cdn.discordapp.com/avatars/1002577938253873312/5531369ddca2439247cf97021fb452ca.webp",
    })
    .setTitle("📝 Guild Updated")
    .setColor(0x4bb7f6)
    .setDescription(`**Guild has been updated.**`)
    .addFields(
      { name: 'Before', value: `${oldGuild}`, inline: true },
      { name: 'After', value: `${newGuild}`, inline: true },
    )
    .setTimestamp();

  return LogChannel.send({
    embeds: [guildUpdate],
  });
});

client.on('guildMemberAdd', (member) => {
  const LogChannel = client.channels.cache.get("989137058641612858"); // Replace with your channel id
  const accountAge = client.users.fetch("createdAt", { force: true });
  const guildUpdate = new EmbedBuilder()
    .setAuthor({
      name: "Diplo Logging System",
      iconURL:
        "https://cdn.discordapp.com/avatars/1002577938253873312/5531369ddca2439247cf97021fb452ca.webp",
    })
    .setTitle("🏕️ New Member")
    .setColor(0x4bb7f6)
    .setDescription(`*A new member has joined.*`)
    .addFields(
      { name: 'Member Name', value: `${member}`, inline: true },
      { name: 'Created Account At', value: `${accountAge}`, inline: true },
    )
    .setTimestamp();

  return LogChannel.send({
    embeds: [guildUpdate],
  });
});

client.on('guildBanAdd', (ban) => {
  const LogChannel = client.channels.cache.get("989137058641612858"); // Replace with your channel id
  const guildBanAdd = new EmbedBuilder()
    .setAuthor({
      name: "Diplo Logging System",
      iconURL:
        "https://cdn.discordapp.com/avatars/1002577938253873312/5531369ddca2439247cf97021fb452ca.webp",
    })
    .setTitle("🏕️ Member Ban")
    .setColor(0x4bb7f6)
    .setDescription(`*A member has been banned.*`)
    .addFields(
      { name: 'Ban', value: `${ban}`, inline: true },
    )
    .setTimestamp();

  return LogChannel.send({
    embeds: [guildBanAdd],
  });
});
//Logging System End

const functionsFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionsFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of functionFiles)
    require(`./functions/${folder}/${file}`)(client);
}

client.handleEvents();
client.handleCommands();
client.handleComponents();
client.login(token);
(async () => {
  await connect(dataBaseToken).catch(console.error);
})();
