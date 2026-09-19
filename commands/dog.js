
const { RestrictionsEnum } = require("../commandAccessRestrictions.js");

module.exports = {
    accessRestriction: RestrictionsEnum.NONE,
    accessRestrictionArgs: 0,
    name: "dog",
    help_string: "- shows a random dog image",

    run: async (msg, argv, cl) => {
        msg.channel.sendTyping().catch(() => {});

        try {
            const fetch = (await import("node-fetch")).default;

            const apiRes = await fetch(
                "https://dog.ceo/api/breeds/image/random"
            );

            if (!apiRes.ok) {
                throw new Error(`Dog API returned HTTP ${apiRes.status}`);
            }

            const data = await apiRes.json();

            if (data.status !== "success" || !data.message) {
                throw new Error("Dog API returned an invalid response");
            }

            const imageRes = await fetch(data.message);

            if (!imageRes.ok) {
                throw new Error(`Image returned HTTP ${imageRes.status}`);
            }

            const buffer = Buffer.from(await imageRes.arrayBuffer());

            await msg.reply({
                files: [{
                    attachment: buffer,
                    name: "dog.jpg"
                }]
            });
        } catch (err) {
            console.error("Failed to fetch dog image:", err);
            await msg.reply("Failed to fetch a dog image.").catch(() => {});
        }
    }
};
