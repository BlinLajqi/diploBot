const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  PermissionsBitField,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("Timeout the member provided.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addUserOption((option) =>
      option
        .setName("traget")
        .setDescription("The member you'd like to kick")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("time")
        .setDescription("The amount of minutes to timeout a member for.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason for timing out the member provided.")
    ),
  async execute(interaction, client) {
    const user = interaction.options.getUser("traget");
    let reason = interaction.options.getString("reason");
    let time = interaction.options.getInteger("time");
    const member = await interaction.guild.members
      .fetch(user.id)
      .catch(console.error);

    if (!reason) reason = "No reason provided.";
    if (!time) time = null;
    if (!member.timeout)
      return await interaction.reply({
        content: "I can't timeout this member!",
        ephemeral: true,
      });

    const timeoutEmbed = new EmbedBuilder()
      .setTitle(`**You've have been timed out of ${interaction.guild.name}**`)
      .setDescription(
        `*You have broken the server rules wich you were told not to!*`
      )
      .setAuthor({ name: 'Diplo', iconURL: 'https://cdn.discordapp.com/avatars/1002577938253873312/5531369ddca2439247cf97021fb452ca.webp'})
      .setColor(0xffd580)
      .setTimestamp()
      .setFooter({ text: 'Bliny\'s Staff'})
      .addFields(
        { name: "Reason", value: `${reason}` },
        { name: "Time", value: `${time} min/mins` }
      );

    await user
      .send({
        embeds: [timeoutEmbed],
      })
      .catch(console.error);

    await member
      .timeout(time == null ? null : time * 60 * 1000, reason)
      .catch(console.error);

    await interaction.reply({
      content: `Timed out ${user.tag} successfully!`,
      ephemeral: true
    });
  },
};
