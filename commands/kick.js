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
    name: 'kick',
    description: 'Kicks whoever is tagged. Currently can only be used by the creator of the bot, O2C.',
    execute(message, args) {
        var guildID = message.guild.id.toString();
        var configFileName = 'config/'+guildID+'.json';
        var file = JSON.parse(fs.readFileSync(configFileName));


        if(!checkRoles(message.member.roles.cache, file.adminRoles) && !message.member.id.toString() == '422072681479798786') { //checks that the user has rights
            message.channel.send('you must be an admin to use that command');
            return;
        }
        var badUser = message.mentions.members.first();
        if (badUser){
            console.log(badUser.username + ' was kicked by ' + message.author.username)
            badUser.kick()
            message.channel.send('kicked');
        } else {
            message.channel.send('you need to tag a user');
        }
    }
}