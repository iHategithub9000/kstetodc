module.exports = {
  type: "messageCreate",
  runOnce: false,
  run: async (message,client) => {
    if (!message.guild) {
        console.log("Someone slid into Teto's DMs!")
									console.log(`  User: ${message.author.username}`)
									console.log(`  Message: ${message.content}`)


    }
	 }
};
