const util = require("../util");

module.exports = {
    name: "skip",
    aliases: ["skipto","sp","Skip"],
    exec: async (msg, args) => {
        const { music } = msg.guild;
        const skipTo = args[0] ? parseInt(args[0], 10) : null;
        if (!music.player || !music.player.playing) return msg.channel.send(util.embed().setAuthor(" |   Currently Not Playing anything", msg.client.user.displayAvatarURL()));
        if (!msg.member.voice.channel)
            return msg.channel.send(util.embed().setAuthor(" |   You aren't connected to a voice channel.",  msg.client.user.displayAvatarURL()));
        if (msg.guild.me.voice.channel && !msg.guild.me.voice.channel.equals(msg.member.voice.channel))
            return msg.channel.send(util.embed().setAuthor(" |   You Aren't Connected To The Same Voice Channel As I Am", msg.client.user.displayAvatarURL()));

        if (skipTo !== null && (isNaN(skipTo) || skipTo < 1 || skipTo > music.queue.length))
            return msg.channel.send(util.embed().setAuthor(" |  Invalid number to skip.", msg.client.user.displayAvatarURL()));

        try {
            await music.skip(skipTo);
            msg.react("⏭️").catch(e => e);
        } catch (e) {
            msg.channel.send(`An error occured: ${e.message}.`);
        }
    }
};
