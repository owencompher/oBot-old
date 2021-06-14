module.exports = {
    name: 'random',
    description: 'Picks a random number between a max and min. The result will be an integer that ranges from the '+
                 'minimum to the maximum. Must be two numbers, separated by exactly one space.',
    execute(message, args) {
        if (args.length == 2 && !args.includes(' ')) {
            var range = Number(args[1]) - Number(args[0]) + 1;
            if (Math.sign(range) == 1) {
                var number = Math.floor(range * Math.random()) + Number(args[0]);
                message.channel.send(number);
            } else message.channel.send('max must be greater than min');
        } else message.channel.send('needs a max and min');
    }
}