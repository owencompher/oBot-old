module.exports = {
    name: 'choose',
    description: 'Chooses between the provided options. There is no limit to the amount of options '+
                 'or what the options can be, but they must be separated by exactly one space, '+
                 'and must not include any spaces.',
    execute(message, args) {
        var random = Math.random();
        var choice = args[Math.floor(random * args.length)];
        message.channel.send(choice);
    }
}