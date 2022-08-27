const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("banned-words-list")
        .setDescription('Returns a link to the bad words list.'),
    async execute(interaction, client) {
        const button = new ButtonBuilder()
            .setCustomId('bannedWords')
            .setLabel(`Click me!`)
            .setStyle(ButtonStyle.Primary);

            await interaction.reply({
                components: [new ActionRowBuilder().addComponents(button)],
                ephemeral: true
            });
    },
};