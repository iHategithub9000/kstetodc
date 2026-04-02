const { RestrictionsEnum } = require("../commandAccessRestrictions.js");
const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    accessRestriction: RestrictionsEnum.DISCORD_PERMISSION,
    accessRestrictionArgs: PermissionsBitField.Flags.ManageChannels,
    name: "recreate",
    help_string: " - Clones the channel and deletes the original. Requires Manage Channels.",
    
    run: async (msg, argv, cl) => {
        try {
            const oldChannel = msg.channel;
            const auth = msg.author.tag;

            if (!oldChannel.deletable) {
                return msg.reply("❌ I can't delete this channel.");
            }

            // Clone channel
            const newChannel = await oldChannel.clone({
                name: oldChannel.name,
            });

            // Send confirmation in new channel
            const embed = new EmbedBuilder()
                .setTitle("♻️ Channel recreated.")
                .setFooter({ text: "Requested by " + auth })
                .setColor(0x00ff00);

            await newChannel.send({ embeds: [embed] });

            // Delete old channel
            await oldChannel.delete();

        } catch (e) {
            const embed = new EmbedBuilder()
                .setTitle(":x: Recreate failed.")
                .setDescription(`\`\`\`${e.stack}\`\`\``)
                .setColor(0xff0000);

            await msg.reply({ embeds: [embed] });
        }
    }
};
