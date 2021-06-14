module.exports = {
    name: 'wiki',
    description: 'Returns a wiki url with the argument. Spaces will be replaced with underscores.',
    execute(message, args) {
        message.channel.send('https://en.wikipedia.org/wiki/'+args.join('_'));
    }
}