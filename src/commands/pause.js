const util = require("../util");

module.exports = {
    name: "pause",
    aliases: ["pa"],
    exec: async (msg) => {
        const { music } = msg.guild;
        if (!music.player || !music.player.playing) return msg.channel.send(util.embed().setAuthor(" |  Currently not playing anything.", msg.client.user.displayAvatarURL()));
        if (!msg.member.voice.channel)
            return msg.channel.send(util.embed().setAuthor(" |  You aren't connected to a voice channel", msg.client.user.displayAvatarURL()));
        if (msg.guild.me.voice.channel && !msg.guild.me.voice.channel.equals(msg.member.voice.channel))
            return msg.channel.send(util.embed().setAuthor(" |  You aren't connected to the same voice channel as I am", msg.client.user.displayAvatarURL()));

        try {
            await music.pause();
            msg.channel.send(util.embed().setAuthor(" |  Paused the player",msg.client.user.displayAvatarURL()));
        } catch (e) {
            msg.channel.send(util.embed().setAuthor(` |  An error occured: ${e.message}.`,msg.client.user.displayAvatarURL()));
        }
    }
};
