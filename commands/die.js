module.exports = {
    name: 'die',
    description: 'The bot is immortal, sorry. Really just always replies wiht \'no\'.', // actually just returns "no"
    execute(message, args) {
        message.channel.send('no');
    }
}