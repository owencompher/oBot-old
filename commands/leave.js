module.exports = {
    name: 'leave',
    description: 'Tells the bot to leave the current vc',
    execute(message, args, bot) {
        cnct = bot.connections[message.guild]
        delete bot.connections[message.guild]
        cnct.disconnect();
    }
}