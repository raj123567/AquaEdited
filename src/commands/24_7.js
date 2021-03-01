const db = require("quick.db")
module.exports = {

    name: "24/7",

    aliases: ["24*7"],
    
	     exec: async (msg, args) => {
        const message = msg;
        if (!msg.member.permissions.any(["ADMINISTRATOR"])) return
        let x = db.get(`247_${message.guild.id}`)
        if(x == true) {
            db.set(`247_${message.guild.id}`, false)
            message.channel.send("**Disabled** 24/7")
        }
        else if(!x){
            db.set(`247_${message.guild.id}`, true)
            message.channel.send("**Enabled** 24/7")
        }

    }

}
