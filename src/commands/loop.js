const util = require("../util");

module.exports = {
    name: "loop",
    aliases: ["repeat", "lp"],
    exec: (msg) => {
        const { music } = msg.guild;
        if (!music.player) return msg.channel.send(util.embed().setAuthor(" |   Currently Not Playing Anything.", msg.client.user.displayAvatarURL()));
        if (!msg.member.voice.channel)
            return msg.channel.send(util.embed().setAuthor(" |   You Aren't Connected To A Voice Channel",msg.client.user.displayAvatarURL()));
        if (msg.guild.me.voice.channel && !msg.guild.me.voice.channel.equals(msg.member.voice.channel))
            return msg.channel.send(util.embed().setAuthor(" |   You Aren't Connected To The Same Voice Channel As I Am", msg.client.user.displayAvatarURL()));

        music.loop = !music.loop;

        msg.channel.send(util.embed().setAuthor(` |   Loop ${music.loop ? "Enabled" : "Disabled"}.`, msg.client.user.displayAvatarURL()));
    }
};
