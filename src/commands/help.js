const util = require("../util");

const unlisted = ["eval", "source"];
prefix=process.env.PREFIX;
module.exports = {
    name: "help",
    aliases: ["h", "hp"],
    exec: (msg) => {
        const commands = msg.client.commands
            .filter(c => !unlisted.includes(c.name))
            .map(c => `\`${c.name}\``);

        const embed = util.embed()
            .setAuthor("| Aqua Help Menu: all", msg.client.user.displayAvatarURL())
            .addField(" **❯ INFO**", `My Prefix is\`${prefix}\` or Just @Mention Me :fingers_crossed:`)
            .addField(" **❯ MUSIC[14] :**", " `play`, `loop`, `lyrics`, `nowplaying`, `pause`, `queue`, `remove`, `resume`, `search`, `shuffle`, `skip`, `skipto`, `stop`, `volume`")
            .addField(" **❯ FILTERS & MISC[4] :**","`bassboost`, `autoplay`, `seek`,`move`")
            .addField(" **❯ UTILITIES[4] :**","`stats`,`invite`,`help`, `ping`")
            .setFooter(`© ${msg.guild.me.displayName}`)
            .setColor("f8a408")
            .setThumbnail(msg.client.user.displayAvatarURL({ dynamic: true, size: 2048 }))
            .setTimestamp();

        msg.channel.send(embed);
    }
};

console.log("help working");