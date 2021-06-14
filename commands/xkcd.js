module.exports = {
    name: 'xkcd',
    description: 'Shows a random xkcd comic.',
    execute(message, args) {
        var number = Math.floor(Math.random()*2440);
        message.channel.send('https://xkcd.com/'+number);
    }
}