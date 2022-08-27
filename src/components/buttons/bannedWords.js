module.exports = {
    data: {
        name: `bannedWords`
    },
    async execute(interaction, client) {
        await interaction.reply({
            content: `http://www.bannedwordlist.com/`,
            ephemeral: true
        });
    }
}