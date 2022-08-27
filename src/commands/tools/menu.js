const { SlashCommandBuilder, SelectMenuBuilder, ActionRowBuilder, SelectMenuOptionBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('menu')
        .setDescription('Returns a select menu.'),
    async execute(interaction, client) {
        const menu = new SelectMenuBuilder()
            .setCustomId('sub-menu')
            .setMinValues(1)
            .setMaxValues(1)
            .setOptions(new SelectMenuOptionBuilder({
                label:`1`,
                value: `Diplo is good bot!`
            }), new SelectMenuOptionBuilder({
                label: `2`,
                value: `Dyno is bad bot!`
            }));
        await interaction.reply({
            components: [new ActionRowBuilder().addComponents(menu)]
        });
    },
};