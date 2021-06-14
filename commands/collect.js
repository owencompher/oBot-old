module.exports = {
    name: 'collect',
    description: 'Will collect messages, either for a certain amount of time ' +
                 'or a certain amount of messages.',
    execute(message, args) {
    //     const filter = m => m.channel == message.channel;
    //     const collie = message.channel.createMessageCollector(filter, {time: Number(args[0])*1000});
    //     console.log('started collector, length '+Number(args[0])*1000);
    //     collie.on('collect', m => {
    //         console.log(`Collected ${m.content}`);
    //     });
    //     collie.on('end', collected => {
    //         console.log(`Collected ${collected.size} items`);
    //     });
    }
    
}