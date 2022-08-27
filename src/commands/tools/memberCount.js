const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("member-count")
    .setDescription("Return member count!"),
  async execute(interaction, client) {
    const members = new EmbedBuilder()
      .setFooter({ text: "Diplo" })
      .setTimestamp()
      .setAuthor({
        name: "Member Stats",
        iconURL:
          "https://cdn.discordapp.com/avatars/1002577938253873312/5531369ddca2439247cf97021fb452ca.webp",
      })
      .setColor(0x4bb7f6)
      .addFields(
        {
          name: `Member Count`,
          value: `${interaction.guild.memberCount}`,
          inline: true,
        },
        {
          name: `Server Name`,
          value: `${interaction.guild.name}`,
          inline: true,
        },
        { name: `Server ID`, value: `${interaction.guild.id}`, inline: true }
      );

    await interaction.reply({
      embeds: [members],
    });
  },
};
