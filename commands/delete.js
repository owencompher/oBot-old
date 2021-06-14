const fs = require('fs');

/**
 * checks that role matches at lease one role in iterable roleArray
 * @param role a single role
 * @param roleArray an iterable of roles
 * @returns {boolean}
 */
function roleIn(role, roleArray) {
    for(const roleItem of roleArray) {
        if(roleItem.id == role.id) return true;
    }
    return false;
}

module.exports = {
    name: 'delete',
    description: 'Deletes whatever was sent a certain number of messages ago. '+
                 'Currently can only be used by the creator of the bot, O2C.',
    execute(message, args, bot) {
        var guildID = message.guild.id.toString();
        var configFileName = 'config/'+guildID+'.json';
        var file = JSON.parse(fs.readFileSync(configFileName));

        var cachedMessages = message.channel.messages.cache.array()
        try {
            if(!checkRoles(message.member.roles.cache, file.adminRoles) && !message.member.id.toString() == '422072681479798786') { //checks that the user has rights
                message.channel.send('you must be an admin to use that command');
                return;
            }
            if (args[0] == 'from'){
                for (var i = Number(args[1]); i > 0; i -= 1){
                    var badMessage = cachedMessages[cachedMessages.length - i+1];
                    console.log('deleted message: ' + badMessage.content);
                    badMessage.delete();
                }
                message.delete({ timeout: 2500})
            } else if (args[0]) {
                var badMessage = cachedMessages[cachedMessages.length - (Number(args[0])+1)];
                badMessage.delete();
                console.log('deleted message: ' + cachedMessages[cachedMessages.length-(Number(args[0])+1)].content);
                message.delete({ timeout: 2500});
            } else {
                var badMessage = cachedMessages[cachedMessages.length - 2];
                badMessage.delete();
                console.log('deleted message: ' + cachedMessages[cachedMessages.length-2].content);
                message.delete({ timeout: 2500});
            }
        } catch(err) {
            message.channel.send('bot doesn\'t remember that far, sorry');
        }
    }
}