const util = require("../util");

module.exports = {
    name: "stop",
    aliases: ["leave", "dc"],
    exec: async (msg) => {
        const { music } = msg.guild;
        if (!music.player) return msg.channel.send(util.embed().setAuthor(" |   Currently Not Playing anything", msg.client.user.displayAvatarURL()));
        if (!msg.member.voice.channel)
            return msg.channel.send(util.embed().setDescription(" |   You aren't connected to a voice channel"));
        if (msg.guild.me.voice.channel && !msg.guild.me.voice.channel.equals(msg.member.voice.channel))
            return msg.channel.send(util.embed().setDescription(` |   You must be on ${msg.guild.me.voice.channel} to use this command.`));

        try {
            await music.stop();
            msg.react(":pause_button:").catch(e => e);
        } catch (e) {
            msg.channel.send(`An error occured: ${e.message}.`);
        }
    }
};
