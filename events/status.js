const { PresenceUpdateStatus, ActivityType } = require("discord.js");

module.exports = {
  name: "ready",
  runOnce: true,
  run: async (client) => {
    client.user.setPresence({
      status: PresenceUpdateStatus.Online,
      activities: [
        {
          type: ActivityType.Custom,
          state: "hguhgdughusfgai",
          emoji: "🔥"
        }
      ]
    })
  }
};
