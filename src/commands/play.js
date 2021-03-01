const util = require("../util");

module.exports = {
    name: "play",
    aliases: ["p", "P"],
    exec: async (msg, args) => {
        const { music } = msg.guild;
        if (!msg.member.voice.channel)
            return msg.channel.send(util.embed().setAuthor(" |  You aren't connected to a voice channel", msg.client.user.displayAvatarURL()));
        if (msg.guild.me.voice.channel && !msg.guild.me.voice.channel.equals(msg.member.voice.channel))
            return msg.channel.send(util.embed().setAuthor(" |  You aren't connected to the same voice channel as I am", msg.client.user.displayAvatarURL()));

        const missingPerms = util.missingPerms(msg.guild.me.permissionsIn(msg.member.voice.channel), ["CONNECT", "SPEAK"]);
        if ((!music.player || !music.player.playing) && missingPerms.length)
            return msg.channel.send(util.embed().setAuthor(`|  I need ${missingPerms.length > 1 ? "these" : "this"} permission${missingPerms.length > 1 ? "s" : ""} on your voice channel: ${missingPerms.map(x => `\`${x}\``).join(", ")}.`,msg.client.user.displayAvatarURL()));

        if (!music.node || !music.node.connected)
            return msg.channel.send(util.embed().setDescription("<a:rtest:810143135538741308> | Lavalink node not connected."));

        const query = args.join(" ");
        if (!query) return msg.channel.send(util.embed().setAuthor(" | Please Type In Something To Play", msg.client.user.displayAvatarURL()));

        try {
            const { loadType, playlistInfo: { name }, tracks } = await music.load(util.isValidURL(query) ? query : `ytsearch:${query}`);
            if (!tracks.length) return msg.channel.send(util.embed().setAuthor(" |  Please Put A Correct Link Or Type In Something To Play", msg.client.user.displayAvatarURL()));
            
            if (loadType === "PLAYLIST_LOADED") {
                for (const track of tracks) {
                    track.requester = msg.author;
                    music.queue.push(track);
                }
                msg.channel.send(util.embed().setAuthor(` |  Loaded \`${tracks.length}\` tracks from **${name}**.`, msg.client.user.displayAvatarURL()));
            } else {
                const track = tracks[0];
                track.requester = msg.author;
                music.queue.push(track);
                if (music.player && music.player.playing) 
                    msg.channel.send(util.embed()
                        .setAuthor("Added To The Queue", msg.client.user.displayAvatarURL())
                        .setDescription(`[${track.info.title}](${track.info.uri})`)
                    );
            }
            
            if (!music.player) await music.join(msg.member.voice.channel);
            if (!music.player.playing) await music.start();

            music.setTextCh(msg.channel);
        } catch (e) {
            msg.channel.send(`An error occured: ${e.message}.`);
        }
    }
};
