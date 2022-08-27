const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  PermissionsBitField,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kicks the member provided.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addUserOption((option) =>
      option
        .setName("traget")
        .setDescription("The member you'd like to kick")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason for kicking the member provided.")
    ),
  async execute(interaction, client) {
    const user = interaction.options.getUser("traget");
    let reason = interaction.options.getString("reason");
    const member = await interaction.guild.members
      .fetch(user.id)
      .catch(console.error);

    if (!reason) reason = "No reason provided.";
    if (!member.kick)
      return await interaction.reply({
        content: "I can't kick this member!",
        ephemeral: true,
      });

      const kickEmbed = new EmbedBuilder()
      .setTitle(`**You've have been kicked out of ${interaction.guild.name}**`)
      .setDescription(
        `*You have broken the server rules wich you were told not to! More info below.*`
      )
      .setAuthor({ name: 'Diplo', iconURL: 'https://cdn.discordapp.com/avatars/1002577938253873312/5531369ddca2439247cf97021fb452ca.webp'})
      .setColor(0xffd580)
      .setTimestamp()
      .setFooter({ text: 'Bliny\'s Staff'})
      .addFields(
        { name: "Reason", value: `${reason}` },
      );

    await user
      .send({
        embeds: [kickEmbed],
      })
      .catch(console.error);

    await member.kick(reason).catch(console.error);

    await interaction.reply({
      content: `Kicked ${user.tag} successfully!`,
    });
  },
};
