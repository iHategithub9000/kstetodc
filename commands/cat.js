const {
    RestrictionsEnum
} = require("../commandAccessRestrictions.js");
module.exports = {
    accessRestriction: RestrictionsEnum.NONE,
    accessRestrictionArgs: 0,
    name: "cat",
    help_string: "- shows a random cat image",
    run: async (msg, argv, cl) => {
        msg.channel.sendTyping().catch(() => {});
        try {
            const fetch = (await import("node-fetch")).default;
            const res = await fetch("https://cataas.com/cat");
            if (!res.ok) {
                throw new Error(`Cataas returned HTTP ${res.status}`);
            }
            const buffer = Buffer.from(await res.arrayBuffer());
            await msg.reply({
                files: [{
                    attachment: buffer,
                    name: "cat.jpg"
                }]
            });
        } catch (err) {
            console.error("Failed to fetch cat image:", err);
            await msg.reply("Failed to fetch a cat image.").catch(() => {});
        }
    }
};
