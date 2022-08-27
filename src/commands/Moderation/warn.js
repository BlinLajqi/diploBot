const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  PermissionsBitField,
  EmbedBuilder,
} = require("discord.js");
const moment = require("moment");
const warnModel = require("../../schemas/warnModel");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("warn")
    .setDescription("Warn the member provided.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addUserOption((option) =>
      option
        .setName("traget")
        .setDescription("The member you'd like to warn")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason for warning the member provided.")
    ),
  async execute(interaction, client) {
    const user = interaction.options.getUser("traget");
    let reason = interaction.options.getString("reason");
    const member = await interaction.guild.members
      .fetch(user.id)
      .catch(console.error);

    switch (true) {
      case user == "802906120393457684":
        interaction.reply({
          content: "I cannot warn that member.",
        });
        break;
      case user == "772227668389134366":
        interaction.reply({
          content: "I cannot warn that member.",
        });
        break;
      case user == "994071382658920499":
        interaction.reply({
          content: "I cannot warn that member.",
        });
        break;
      default:
        new warnModel({
          userId: user.id,
          guildId: interaction.guildId,
          moderatorId: interaction.user.id,
          reason,
          timestamp: Date.now(),
        }).save();

        if (!reason) reason = "No reason provided.";

        const userWarnings = await warnModel.find({
          userId: user.id,
          guildId: interaction.guildId,
        });

        const time = 180;
        const reason1 = 'Too many warnings';

        if (userWarnings.length > 1) {
          member.timeout(time * 60 * 1000, reason1).catch(console.error);
          member.setNickname(`[Muted User] ${user.tag}`)
        }

        const warnEmbed = new EmbedBuilder()
          .setTitle(`**You've have been warned in ${interaction.guild.name}**`)
          .setDescription(
            `*This is a warning for your actions. If you continue that will result in a mute.*`
          )
          .setAuthor({
            name: "Diplo",
            iconURL:
              "https://cdn.discordapp.com/avatars/1002577938253873312/5531369ddca2439247cf97021fb452ca.webp",
          })
          .setColor(0xffd580)
          .setTimestamp()
          .setFooter({ text: "Bliny's Staff" })
          .addFields({ name: "Reason", value: `${reason}` });

        await user
          .send({
            embeds: [warnEmbed],
          })
          .catch(console.error);

        await interaction.reply({
          content: `${user.tag} has been warned!`,
          ephemeral: true,
        });
    }
  },
};
