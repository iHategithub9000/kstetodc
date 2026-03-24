const { RestrictionsEnum } = require("../commandAccessRestrictions.js");
const { EmbedBuilder } = require('discord.js');
const os = require('os');

// helper to format seconds → "xh ym zs"
function formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${hours}h ${minutes}m ${seconds}s`;
}

module.exports = {
    accessRestriction: RestrictionsEnum.NONE,
    accessRestrictionArgs: 0,
    name: "uptime",
    help_string: "- shows bot uptime",
    run: async (msg, argv, cl) => {

        // ---- CONSTANT: 1 month (30 days) ----
        const ONE_MONTH_SEC = 30 * 24 * 60 * 60;

        // ---- UPTIMES ----
        const botUptimeSec = cl.uptime / 1000;
        const machineUptimeSec = os.uptime();

        // ---- PERCENT CALC ----
        let botPercent = Math.min((botUptimeSec / ONE_MONTH_SEC) * 100, 100);
        let machinePercent = Math.min((machineUptimeSec / ONE_MONTH_SEC) * 100, 100);

        botPercent = botPercent.toFixed(2);
        machinePercent = machinePercent.toFixed(2);

        const embed = new EmbedBuilder()
            .setTitle('⏱ Uptime Info')
            .setColor(0x00FF00)
            .setDescription(
                `**Bot uptime:** ${formatTime(botUptimeSec)}\n` +
                `**Machine uptime:** ${formatTime(machineUptimeSec)}\n\n` +
                `**Bot is up:** ${botPercent}% of 1 month\n` +
                `**Machine is up:** ${machinePercent}% of 1 month`
            )
            .setFooter({
                text: "Bot uptime - amount of time bot is connected to Discord\nMachine uptime - amount of time the computer running the bot is up"
            });

        msg.reply({ embeds: [embed] }).catch(() => {});
    }
};