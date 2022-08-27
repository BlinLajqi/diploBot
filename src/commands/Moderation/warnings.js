const warnModel = require("../../schemas/warnModel");
const moment = require("moment");
const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  PermissionsBitField,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("warnings")
    .setDescription("The amount of warnings a user has.")
    .addUserOption((option) =>
      option
        .setName("traget")
        .setDescription("The member's warnings you want to view.")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const user = interaction.options.getUser("traget");

    const userWarnings = await warnModel.find({
      userId: user.id,
      guildId: interaction.guildId,
    });

    if (!userWarnings?.length)
      return interaction.reply({
        content: `${user} has no warnings in this server.`,
      });

    const embedDescription = userWarnings
      .map((warn) => {
        const moderator = interaction.guild.members.cache.get(warn.moderatorId);

        return [
          `WarnId: ${warn._id}`,
          `Moderator: ${moderator || "Has Left."}`,
          `Date: ${moment(warn.timestamp).format("MMMM Do YYYY")}`,
          `Reason: ${warn.reason}`,
        ].join("\n");
      })
      .join("\n\n");

    const embed = new EmbedBuilder()
      .setTitle(`${user.tag}'s Warnings`)
      .setDescription(embedDescription)
      .setColor(0xffd580);

    interaction.reply({
      embeds: [embed],
    });
  },
};
