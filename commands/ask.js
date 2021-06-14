const begins = ['is', 'am', 'are', 'can', 'have', 'do', 'was', 'were', 'will', 'would', 'did', 'should'];

module.exports = {
    name: 'ask',
    description: 'Answers a question. Must begin with \'why\' or be a yes or no question.'+
                 ' The answer is completely random, except for \'why\','+
                 ' to which the answer is always \'because\'.',
    execute(message, args) {
        if (args[0]){
            if (args[0] == 'why?'){
                message.channel.send('because');
            } else if (begins.includes(args[0]) && message.content.endsWith('?')) {
                const random = args.join(' ').length % 8;
                if (random == 0 || random == 1 || random == 3 || random == 6) {
                    message.channel.send('yes');
                } else {
                    message.channel.send('no');
                }
            } else {
                message.channel.send('must be a yes or no question');
            }
        } else {
            message.channel.send('you need to ask a question');
        }
    }
}