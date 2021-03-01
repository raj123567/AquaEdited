const util = require("../util");

module.exports = {
    name: "previous",
    aliases: ["prev", "pre", "Pre"],
    exec: async (msg) => {
        const { music } = msg.guild;
        if (!music.player) return msg.channel.send(util.embed().setAuthor(" |  Currently Not Playing anything", msg.client.user.displayAvatarURL()));
        if (!music.previous) return msg.channel.send(util.embed().setAuthor(" |   There Is No Previous Track To Play",  msg.client.user.displayAvatarURL()));

        if (!msg.member.voice.channel)
            return msg.channel.send(util.embed().setAuthor(" |   You aren't connected to a voice channel.",  msg.client.user.displayAvatarURL()));
        if (msg.guild.me.voice.channel && !msg.guild.me.voice.channel.equals(msg.member.voice.channel))
            return msg.channel.send(util.embed().setAuthor(" |   You Aren't Connected To The Same Voice Channel As I Am", msg.client.user.displayAvatarURL()));

        try {
            music.queue.unshift(music.previous);
            await music.skip();
            msg.react("⏮️").catch(e => e);
        } catch (e) {
            msg.channel.send(`An error occured: ${e.message}.`);
        }
    }
};
