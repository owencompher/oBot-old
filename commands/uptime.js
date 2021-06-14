module.exports = {
    name: 'uptime',
    description: 'Returns uptime of bot, rounded to the minute and counting hours.',
    execute(message, args, bot) {
        var minutes = Math.round(bot.uptime / 60000);
        if (minutes >= 60) {
            message.channel.send(Math.floor(minutes / 60) + ' hours, ' + minutes % 60 + ' minutes');
        } else message.channel.send(minutes + ' minutes');
    }
}