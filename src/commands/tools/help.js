const {
  SlashCommandBuilder,
  EmbedBuilder,
  SelectMenuBuilder,
  ActionRowBuilder,
  SelectMenuOptionBuilder,
  Collection,
  ComponentType,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Get the list of available commands."),
  async execute(interaction, client, message) {
    const embed = new EmbedBuilder()
      .setTitle(`Diplo Commands`)
      .setDescription(
        `Below you can view all the commands that are available by Diplo`
      )
      .setColor(0x18e1ee)
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp(Date.now())
      .setFooter({ text: "Diplo Developers" })
      .addFields([
        {
          name: "`/ping`",
          value: "Return my ping!",
        },
        {
          name: "`/banned-words-list`",
          value: "Returns a link to the bad words list.",
        },
        {
          name: "`/menu`",
          value: "Returns a select menu.",
        },
        {
          name: "`/modal`",
          value: "Returns a modal.",
        },
        {
          name: "`/reactor`",
          value: "Returns a lot of reactions in a satisfying way.",
        },
        {
          name: "`/autocomplete`",
          value: "Returns a simple autocomplete.",
        },
        {
          name: "`/member-count`",
          value: "Return member count!",
        },
        
      ]);

    await interaction.reply({
      embeds: [embed],
    });
  },
};
