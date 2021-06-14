module.exports = {
    name: 'ping',
    description: 'Returns pong, for testing.',
    execute(message, args) {
        message.channel.send('pong');
    }
}