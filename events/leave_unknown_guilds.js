module.exports = {
    type: "guildCreate",
    runOnce: false,
    run: async (_, cl) => {
        cl.guilds.cache.forEach(async g => {
            if (require("allowedguildids.json").includes(g.id)) return;

            const firstChatable = g.channels.cache
                .filter(c =>
                    c.isTextBased() &&
                    c.viewable &&
                    c.permissionsFor(g.members.me)?.has("SendMessages")
                )
                .sort((a, b) => a.rawPosition - b.rawPosition)
                .first();

            if (firstChatable) {
                await firstChatable.send("I cannot join unknown servers!");
            }

            await g.leave();
        });
    }
};
