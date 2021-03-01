const util = require("../util");

module.exports = {
    name: "info",
    aliases: ["info"],
    exec: (msg) => {
    /** @type {import("lavacord").LavalinkNode[]} */
        const nodes = [...msg.client.manager.nodes.values()];
    
        msg.channel.send(util.embed()
            .setAuthor(" |   Aqua Information", msg.client.user.displayAvatarURL())
            .addFields(
                {
                    name: "OWNER",
                    value:"1947 x ALPHA#1773",
                    inline: true
                },
                {
                    name:"RAM Usage",
                    value: nodes.map(node =>{
                        const memUsage = (node.stats.memory.used / 1024 / 1024).toFixed(2);
                        return `\
                ${memUsage} MB`;}),
                    inline: true
                },
                {
                    name: "Ping",
                    value: `${Math.round(msg.client.ws.ping)}ms`,
                    inline: true
                }

            )
            .addFields(
                {
                    name: "Guild ID",
                    value: `${msg.guild.id}`,
                    inline: true
                },
                {
                    name:"NodeVersion",
                    value: `${process.versions.node}`,
                    inline: true
                },
                {
                    name: "Servers",
                    value: `${msg.client.guilds.cache.reduce((prev, guild) => prev + guild.memberCount, 0)}`,
                    inline: true
                }
            )
            .setThumbnail(msg.client.user.displayAvatarURL({ dynamic: true, size: 2048 }))
        );
    }
};