const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("reactor")
    .setDescription("Returns a lot of reactions in a satisfying way."),
  async execute(interaction, client) {
    const message = await interaction.reply({
      content: `React here!`,
      fetchReply: true,
    });

    const emoji1 = client.emojis.cache.find(
      (emoji) => (emoji.id == "1000721140219654145")
    );

    const emoji2 = client.emojis.cache.find(
      (emoji) => (emoji.id == "989155849987555410")
    );

    const emoji3 = client.emojis.cache.find(
      (emoji) => (emoji.id == "1000721295744446555")
    );

    const emoji4 = client.emojis.cache.find(
      (emoji) => (emoji.id == "1000721139112349731")
    );

    const emoji5 = client.emojis.cache.find(
      (emoji) => (emoji.id == "989155848515354645")
    );

    const emoji6 = client.emojis.cache.find(
      (emoji) => (emoji.id == "1000722000236531712")
    );

    const emoji7 = client.emojis.cache.find(
      (emoji) => (emoji.id == "1000721135257780304")
    );

    const emoji8 = client.emojis.cache.find(
      (emoji) => (emoji.id == "989155853498220544")
    );

    const emoji9 = client.emojis.cache.find(
      (emoji) => (emoji.id == "1000721297313124372")
    );

    const emoji10 = client.emojis.cache.find(
      (emoji) => (emoji.id == "989155863828791366")
    );

    message.react(emoji1);
    message.react(emoji2);
    message.react(emoji3);
    message.react(emoji4);
    message.react(emoji5);
    message.react(emoji6);
    message.react(emoji7);
    message.react(emoji8);
    message.react(emoji9);
    message.react(emoji10);
    message.react("👍");

    const filter = (reaction, user) => {
      return reaction.emoji.name == "👍" && user.id == interaction.user.id;
    };

    const collector = message.createReactionCollector({ filter, time: 15000 });

    collector.on("collect", (reaction, user) => {
      console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
    });

    collector.on("end", (collected) => {
      console.log(`Collected ${collected.size} items`);
    });
  },
};
