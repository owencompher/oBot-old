const { MessageEmbed } = require("discord.js");

const helpMessage = new MessageEmbed()
    .setTitle('Commands:')
    .addFields(
        { name: 'o, ping', value: 'returns pong, for testing' },
        { name: 'o, uptime', value: 'gives uptime of bot' },
        { name: 'o, die', value: 'bot is immortal, sorry' },
        { name: 'o, say <message>', value: 'transmits a message with tts'},
        { name: 'o, ask <yes or no question>', value: 'responds with yes or no' },
        { name: 'o, avatar <@ a user>', value: 'returns a user\'s avatar' },
        { name: 'o, choose <option1> <option2> <option3>', value: 'makes a choice for you' },
        { name: 'o, random <min> <max>', value: 'picks a random number between max and min (inclusive)' },
        { name: 'o, wiki <search>', value: 'shows the wikipedia page for a search'},
        { name: 'o, xkcd', value: 'shows a random xkcd comic'},
        { name: 'o, owo <messages back>', value: 'returns the message with \'r\'s replaced with \'w\'s'},
        { name: 'o, bee', value: 'haha funny movie'},
        { name: 'o, kill <@ a user>', value: 'literally kills whoever you @'},
        { name: 'o, info', value: 'shows some info about the bot'},
        { name: 'o, help <command>', value: 'shows this message' }
    )
    .setFooter('use \'o, help admin\' for admin commands');

const adminMessage = new MessageEmbed()
    .setTitle('Admin Commands')
    .addFields(
        { name: 'o, config', value: 'views or edits server configuration file'},
        { name: 'o, kick <@ a user>', value: 'kicks whoever is tagged'},
        { name: 'o, ban <@ a user>', value: 'bans whoever is tagged'},
        { name: 'o, delete <messages back>', value: 'deletes whatever was sent so many messages ago'}
    )
    .setFooter('use \'o, help\' for normal commands');

module.exports = {
    name: 'help',
    description: 'Shows the help message. Use \'o, help <command>\' for more information on a specific command.',
    execute(message, args, bot) {
        if (args[0]) {
            if (args[0] == 'admin') {
                message.channel.send(adminMessage);
            } else {
                try {
                    var emmbed = new MessageEmbed()
                        //.setTitle(args[0].substring(0,1).toUpperCase() + args[0].substr(1)) old title
                        .setTitle('o, '+args[0]+'  |  help')
                    .setDescription(bot.commands.get(args[0]).description);
                    message.channel.send(emmbed);
                } catch(err) {
                    message.channel.send('invalid command');
                }
            }
        } else {
            message.channel.send(helpMessage);
        }
    }
}