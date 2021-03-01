const util = require("../util");

module.exports = {
    name: "invite",
    aliases: ["inv" , "i"],
    exec: (msg) => {msg.channel.send(util.embed()
        .setAuthor(" |   Invite Aqua", msg.client.user.displayAvatarURL())
        .setDescription(`[Invite Aqua 1](https://discord.com/oauth2/authorize?client_id=${msg.client.user.id}scope=bot&permissions=2147478769) | [Invite Aqua 2](https://discord.com/oauth2/authorize?client_id=802195829330280498scope=bot&permissions=2147478769) | [Invite Aqua Beta](https://discord.com/oauth2/authorize?client_id=809397008926113812scope=bot&permissions=2147478769)`)
    );}    
};