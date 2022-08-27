const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  PermissionsBitField,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Bans the member provided.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addUserOption((option) =>
      option
        .setName("traget")
        .setDescription("The member you'd like to ban")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason for banning the member provided.")
    ),
  async execute(interaction, client) {
    const user = interaction.options.getUser("traget");
    let reason = interaction.options.getString("reason");
    const member = await interaction.guild.members
      .fetch(user.id)
      .catch(console.error);

    if (!reason) reason = "No reason provided.";
    if (!member.ban)
      return await interaction.reply({
        content: "I can't ban this member!",
        ephemeral: true,
      });

      const banEmbed = new EmbedBuilder()
      .setTitle(`**You've have been banned out of ${interaction.guild.name}**`)
      .setDescription(
        `*You have broken Discord Trems and service wich you were told not to! This has lead to a ban.More info below*`
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
        embeds: [banEmbed],
      })
      .catch(console.error);

    await member
      .ban({
        deleteMessageDays: 1,
        reason: reason,
      })
      .catch(console.error);

    await interaction.reply({
      content: `Banned ${user.tag} successfully!`,
    });
  },
};
