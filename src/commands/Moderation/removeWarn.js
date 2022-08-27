const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  PermissionsBitField,
  EmbedBuilder,
} = require("discord.js");
const warnModel = require("../../schemas/warnModel");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("removewarn")
    .setDescription("Remove a member's warnings")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addStringOption((option) =>
      option
        .setName("warnid")
        .setDescription("WarnId you want to delete.")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const warnId = interaction.options.getString("warnid");

    const data = await warnModel.findById(warnId);

    if (!data)
      return interaction.reply({
        content: `${warnId} is not a valid id!`,
      });

    data.delete();

    const user = interaction.guild.members.cache.get(data.userId);
    return interaction.reply({ content: `Removed 1 of ${user}'s warnings`})
  },
};
