const { RestrictionsEnum } = require("../commandAccessRestrictions.js");

module.exports = {
    accessRestriction: RestrictionsEnum.NONE,
    accessRestrictionArgs: 0,
    name: "aww",
    help_string: "- shows a random cute image",

    run: async (msg, argv, cl) => {
        msg.channel.sendTyping().catch(() => {});

        try {
            const fetch = (await import("node-fetch")).default;

            const res = await fetch(
                "https://api.sourcesplash.com/i/random?q=cute%20animals"
            );

            if (!res.ok) {
                throw new Error(`SourceSplash returned HTTP ${res.status}`);
            }

            const buffer = Buffer.from(await res.arrayBuffer());

            await msg.reply({
                files: [{
                    attachment: buffer,
                    name: "cute.jpg"
                }]
            });
        } catch (err) {
            console.error("Failed to fetch cute image:", err);
            await msg.reply("Failed to fetch a cute image.").catch(() => {});
        }
    }
};
