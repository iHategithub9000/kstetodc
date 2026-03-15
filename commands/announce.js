function parseCLI(str) {
  const re = /[^\s"]+|"([^"]*)"/gi;
  const args = [];
  let match;

  while ((match = re.exec(str))) {
    args.push(match[1] ?? match[0]);
  }

  return args;
}
const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const { RestrictionsEnum } = require("../commandAccessRestrictions.js")
module.exports = {
  accessRestriction: RestrictionsEnum.DISCORD_PERMISSION,
  accessRestrictionArgs: PermissionsBitField.Flags.ManageMessages,
  name: "announce",
  help_string: "<announcement_title> <announcement_content> <announcement_footer> - Sends an announcement in the channel where the command was ran. Your command is deleted after. Requires Manage Messages."
  run: async (msg, argv, cl)=>{}
}