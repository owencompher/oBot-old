module.exports = {
    name: 'owo',
    description: 'Returns the entire bee movie script. Use with caution',
    execute(message, args, bot) {
        var cachedMessages = message.channel.messages.cache.array();
        if (args[0]) {
            var toOwO = cachedMessages[cachedMessages.length - (Number(args[0])+1)].content;
            message.channel.send(toOwO.replace(/r/g, 'w').replace(/R/g, 'W'));
        } else {
            var toOwO = cachedMessages[cachedMessages.length - 2].content;
            message.channel.send(toOwO.replace(/r/g, 'w').replace(/R/g, 'W'));
        }
    }
}