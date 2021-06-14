const fs = require('fs');

module.exports = {
    name: 'bee',
    description: 'Returns the entire bee movie script. Use with caution',
    execute(message, args) {
        for(var i = 0; i < 20; i++){
            message.channel.send(fs.readFileSync("commands/bee/"+i+'.txt').toString());
        }
    }
}