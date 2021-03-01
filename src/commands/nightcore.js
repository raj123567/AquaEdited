module.exports = {

    name: "nightcore",

    aliases: ["nc"],

    exec: async (msg, args) => {

        const message = msg;

        const music = msg.guild.music;

        music.setNightcore(!music.nightcore);  

        message.channel.send({

            embed: {

                description: (`Nightcore ${music.nightcore ? "**enable**" : "**disabled**"}`),

                color: "#1490A4"

            }

        });

    }

};
