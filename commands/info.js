const { MessageEmbed } = require("discord.js");

const infoMessage = new MessageEmbed()
    .setTitle('oBot Info')
    .setDescription('oBot is a bot made by and for O2C. Use \'o, help\' '+
                    'for a list of commands. DM O2C#9358 to give suggestions '+
                    'or for information on making your own bot.');

module.exports = {
    name: 'info',
    description: 'Shows info about the bot. Nothing special.',
    execute(message, args) {
        message.channel.send(infoMessage);
    }
}

