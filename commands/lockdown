const { RestrictionsEnum } = require("../commandAccessRestrictions.js");
const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    accessRestriction: RestrictionsEnum.DISCORD_PERMISSION,
    accessRestrictionArgs: PermissionsBitField.Flags.ManageChannels,
    name: "lockdown",
    help_string: "<on|off> - Lock or unlock the current channel",
    run: async (msg, argv, cl) => {
        try {
            const action = argv[1]; // "on" or "off"
            if (!["on", "off"].includes(action)) {
                return msg.reply("Usage: %lockdown <on|off>");
            }

            const everyone = msg.guild.roles.everyone;
            const channel = msg.channel;

            if (action === "on") {
                await channel.permissionOverwrites.edit(everyone, { SendMessages: false });
                return msg.reply(`🔒 Channel locked down!`);
            } else {
                await channel.permissionOverwrites.edit(everyone, { SendMessages: true });
                return msg.reply(`🔓 Channel unlocked!`);
            }

        } catch (e) {
            const embed = new EmbedBuilder()
                .setTitle(":x: Lockdown failed")
                .setDescription(`\`\`\`${e.stack}\`\`\``)
                .setColor(0xff0000);
            await msg.reply({ embeds: [embed] });
        }
    }
};
