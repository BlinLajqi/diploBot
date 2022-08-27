const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  PermissionsBitField,
  ApplicationCommandOptionWithChoicesAndAutocompleteMixin,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("permission")
    .setDescription("This command requires permission")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction, client) {
    const { roles } = interaction.member;
    const role = await interaction.guild.roles
      .fetch("989137056598994972")
      .catch(console.error);

    const testRole = await interaction.guild.roles
      .create({
        name: `Test`,
        permissions: [PermissionsBitField.Flags.KickMembers],
      })
      .catch(console.error);

    if (roles.cache.has("989137056598994972")) {
      await interaction.deferReply({
        fetchReply: true,
      });

      await role.remove(role).catch(console.error);
      await interaction.editReply({
        content: `Removed: ${role.name} role form you.`,
      });
    } else {
      await interaction.reply({
        content: `You do not have the ${role.name} role.`,
      });
    }

    await roles.add(testRole).catch(console.error);

    await testRole
      .setPermissions([PermissionsBitField.Flags.BanMembers])
      .catch(console.error);

      const channel = await interaction.guild.channels.create
  },
};
