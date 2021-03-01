
module.exports = {
    name: "ping",
    aliases: ["pi"],
    exec: (msg,text) => {
        const latency = Date.now() - msg.createdTimestamp;
        msg.channel.send(`<a:tping:810147703702814740> Pong! \`${latency}ms\`. API Latency is \`${Math.round(msg.client.ws.ping)}ms\``);
    }
};
