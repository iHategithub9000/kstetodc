const { RestrictionsEnum } = require("../commandAccessRestrictions.js");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    accessRestriction: RestrictionsEnum.NONE,
    accessRestrictionArgs: 0,
    name: "avatar",
    help_string: "- shows the avatar of the author or first mentioned user",
    run: async (msg, argv, cl) => {
        const target = msg.mentions.users.first() || msg.author;
        const avatarURL = target.displayAvatarURL({ dynamic: true, size: 1024 });

        const embed = new EmbedBuilder()
            .setTitle(`${target.username}'s Avatar`)
            .setImage(avatarURL)
            .setColor(0x00FF00);

        msg.reply({ embeds: [embed] }).catch(() => {});
    }
};