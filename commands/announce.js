function parseCLI(str) {
  const re = /[^\s"]+|"([^"]*)"/gi;
  const args = [];
  let match;

  while ((match = re.exec(str))) {
    args.push(match[1] ?? match[0]);
  }

  return args;
}
const { RestrictionsEnum } = require("../commandAccessRestrictions.js")
module.exports = {
  accessRestriction: RestrictionsEnum.DISCORD_PERMISSION,
  accessRestrictionArgs: "",
  name: "announce"
}