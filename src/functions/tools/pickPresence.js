const { ActivityType } = require("discord.js");

module.exports = (client) => {
  client.pickPresence = async () => {
    const options = [
      {
        type: ActivityType.Watching,
        text: "everyone",
        status: "online",
      },
      {
        type: ActivityType.Playing,
        text: "with my dog",
        status: "online",
      },
      {
        type: ActivityType.Listening,
        text: "commands",
        status: "idle",
      },
      {
        type: ActivityType.Watching,
        text: "out for staff apps",
        status: "online"
      },
      {
        type: ActivityType.Watching,
        text: "the universe fall apart",
        status: "dnd",
      },
      {
        type: ActivityType.Playing,
        text: "Discord.js",
        status: "idle",
      },
      {
        type: ActivityType.Watching,
        text: "Bliny.",
        status: "online",
      },
      {
        type: ActivityType.Playing,
        text: "/help",
        status: "online",
      },
    ];
    const option = Math.floor(Math.random() * options.length);

    client.user.setPresence({
      activities: [
        {
          name: options[option].text,
          type: options[option].type,
        },
      ],
      status: options[option].status,
    });
  };
};
