module.exports = {
  data: {
    name: "fav-colors",
  },
  async execute(interaction, client) {
    await interaction.reply({
      content: `You're favorite color is: ${interaction.fields.getTextInputValue(
        "favColorInput"
      )}`,
    });
  },
};
