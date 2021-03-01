const util = require("../util");

module.exports = {
    name: "volume",
    aliases: ["vol","vo","VO","vl","vl"],
    exec: async (msg, args) => {
        const { music } = msg.guild;
        const newVolume = parseInt(args[0], 10);
        if (!music.player || !music.player.playing) return msg.channel.send(util.embed().setAuthor(" |   Currently Not Playing anything", msg.client.user.displayAvatarURL()));
        if (!msg.member.voice.channel)
            try {
                if (isNaN(newVolume)) {
                    msg.channel.send(util.embed()
                        .setAuthor(" |   Current volume Is ")
                        .setDescription(`\`${music.volume}\``)
                    );
                } else {
                    if (!msg.member.voice.channel)
                        return msg.channel.send(util.embed().setAuthor(" |   You aren't connected to a voice channel.",  msg.client.user.displayAvatarURL()));
                        
                    if (msg.guild.me.voice.channel && !msg.guild.me.voice.channel.equals(msg.member.voice.channel))
                        return msg.channel.send(util.embed().setAuthor(" |   You Aren't Connected To The Same Voice Channel As I Am", msg.client.user.displayAvatarURL()));

                    if (newVolume < 0 || newVolume > 400)
                        return msg.channel.send(util.embed().setAuthor(" |   You can only set the volume from 0 to 440.", msg.client.user.displayAvatarURL()));

                    await music.setVolume(newVolume);
                    msg.channel.send(util.embed()
                        .setAuthor(" |   Volume set to ", msg.client.user.displayAvatarURL())
                        .setDescription(`\`${music.volume}\``)
                    );
                }
            } catch (e) {
                msg.channel.send(`An error occured: ${e.message}.`);
            }
    }
};
