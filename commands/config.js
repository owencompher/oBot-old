const fs = require('fs');

function updateFile(file, json) {
    fs.writeFile(file, JSON.stringify(json), (err) => {
        if(err) throw err;
    });
}

function checkRoles(sources, targets) {
    for(const role of targets) {
        if(sources.has(role.id)) return true;
    }
    return false;
}

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

/**
 *  checks that channel matches at least one role in iterable channelArray
 * @param channel a single channel
 * @param channelArray an iterable of channels
 * @returns {boolean}
 */
function channelIn(channel, channelArray) {
    for(const channelItem of channelArray) {
        if(channelItem.id == channel.id) return true;
    }
    return false;
}

const {MessageEmbed} = require('discord.js');
const configFields = new MessageEmbed()
    .setTitle('Configuration Fields:')
    .addFields({
            name : 'ignoreChannels',
            value: 'the bot will not use channels that are found in this list'
        }, {
            name : 'adminRoles',
            value: 'only users with a role in this list can use admin commands'
        }, {
            name : 'enforceUserRoles',
            value: 'when true, only users with a role in userRoles can use the bot'
        }, {
            name : 'userRoles',
            value: 'only users with a role in this list can use the bot when enforeUserRoles is true'
        }
    );
const configEdits = new MessageEmbed()
    .setTitle('Configuration Editing:')
    .setDescription('\'o, config <field>\' will show the current state of the field')
    .addFields({
            name : 'list fields',
            value: 'o, config <field> <\'add\', \'+\', or \'remove\', \'-\'> <#channel or @role>'
        }, {
            name : 'boolean fields',
            value: 'o, config <field> <\'true\' or \'false\'>'
        }, {
            name : 'tts',
            value: 'o, config tts <\'name\', \'n\', or \'accent\', \'a\'> <new value> <optional @ for other user>'
        }
    );

module.exports = {
    name       : 'config',
    description: 'For editing the config files. Please use \'o, config help\' for more info',
    execute(message, args) {
        if(!message.guild){
            message.channel.send('you need to be in a server, not dms');
            return;
        }

        var guildID = message.guild.id.toString();
        var configFileName = 'config/' + guildID + '.json'; //gets the file name of the config file
        var file = JSON.parse(fs.readFileSync(configFileName)); //uses the file name to get JSON object

        if(!checkRoles(message.member.roles.cache, file.adminRoles) && !message.member.id.toString() == '422072681479798786') { //checks that the user has rights
            message.channel.send('you must be an admin to use that command');
            return;
        }

        if(args[0] == 'ignoreChannels') {
            if(message.mentions.channels.first()) {
                if(args[1] == 'add' || args[1] == '+') {
                    if(!channelIn(message.mentions.channels.first(), file.ignoreChannels)) {
                        file.ignoreChannels.push({
                            name: message.mentions.channels.first().name,
                            id  : message.mentions.channels.first().id
                        });
                        message.channel.send('added ' + message.mentions.channels.first().name + ' to list of channels to ignore');
                    } else message.channel.send(message.mentions.channels.first().name + ' is already in list of channels to ignore');
                } else if(args[1] == 'remove' || args[1] == '-') {
                    if(channelIn(message.mentions.channels.first(), file.ignoreChannels)) {
                        file.ignoreChannels.splice(file.ignoreChannels.indexOf({
                            name: message.mentions.channels.first().name,
                            id  : message.mentions.channels.first().id
                        }), 1);
                        message.channel.send('removed ' + message.mentions.channels.first().name + ' from list of channels to ignore');
                    } else message.channel.send(message.mentions.channels.first().name + ' is not in list of channels to ignore');
                } else message.channel.send('you need to specify whether to \'add\' (\'+\') or \'remove\' (\'-\') channels');
            } else if(args[1]) message.channel.send('you need to specify a channel to \'add\' (\'+\') or \'remove\' (\'-\')');
            else message.channel.send('```ignoreChannels: ' + JSON.stringify(file.ignoreChannels, null, 1) + '```'); //displays field if nothing else

        } else if(args[0] == 'adminRoles') {
            if(message.mentions.roles.first()) {
                if(args[1] == 'add' || args[1] == '+') {
                    if(!roleIn(message.mentions.roles.first(), file.adminRoles)) {
                        file.adminRoles.push({
                            name: message.mentions.roles.first().name,
                            id  : message.mentions.roles.first().id
                        });
                        message.channel.send('added ' + message.mentions.roles.first().name + ' to list of admin roles');
                    } else message.channel.send(message.mentions.roles.first().name + ' is already in list of admin roles');
                } else if(args[1] == 'remove' || args[1] == '-') {
                    if(roleIn(message.mentions.roles.first(), file.adminRoles)) {
                        file.adminRoles.splice(file.adminRoles.indexOf({
                            name: message.mentions.roles.first().name,
                            id  : message.mentions.roles.first().id
                        }), 1);
                        message.channel.send('removed ' + message.mentions.roles.first().name + ' from list of admin roles');
                    } else message.channel.send(message.mentions.roles.first().name + ' is not in list of admin roles');
                } else message.channel.send('you need to specify whether to \'add\' (\'+\') or \'remove\' (\'-\') roles');
            } else if(args[1]) message.channel.send('you need to specify a role to \'add\' (\'+\') or \'remove\' (\'-\')');
            else message.channel.send('```adminRoles: ' + JSON.stringify(file.adminRoles, null, 1) + '```'); //displays field if nothing else

        } else if(args[0] == 'enforceUserRoles') {
            if(args[1] == 'true') {
                file.enforceUserRoles = true;
                message.channel.send('set enforceUserRoles to true');
            } else if(args[1] == 'false') {
                file.enforceUserRoles = false;
                message.channel.send('set enforceUserRoles to false');
            } else message.channel.send('```enforceUserRoles: ' + JSON.stringify(file.enforceUserRoles) + '```'); //displays field if nothing else

        } else if(args[0] == 'userRoles') {
            if(message.mentions.roles.first()) {
                if(args[1] == 'add' || args[1] == '+') {
                    if(!roleIn(message.mentions.roles.first(), file.userRoles)) {
                        file.userRoles.push({
                            name: message.mentions.roles.first().name,
                            id  : message.mentions.roles.first().id
                        });
                        message.channel.send('added ' + message.mentions.roles.first().name + ' to list of user roles');
                    } else message.channel.send(message.mentions.roles.first().name + ' is already in list of user roles');
                } else if(args[1] == 'remove' || args[1] == '-') {
                    if(roleIn(message.mentions.roles.first(), file.userRoles)) {
                        file.userRoles.splice(file.userRoles.indexOf({
                            name: message.mentions.roles.first().name,
                            id  : message.mentions.roles.first().id
                        }), 1);
                        message.channel.send('removed ' + message.mentions.roles.first().name + ' from list of user roles');
                    } else message.channel.send(message.mentions.roles.first().name + ' is not in list of user roles');
                } else message.channel.send('you need to specify whether to \'add\' (\'+\') or \'remove\' (\'-\') roles');
            } else if(args[1]) message.channel.send('you need to specify a role to \'add\' (\'+\') or \'remove\' (\'-\')');
            else message.channel.send('```userRoles: ' + JSON.stringify(file.userRoles, null, 1) + '```'); //displays field if nothing else

        } else if(args[0] == 'tts') {
            if(!file.tts) file.tts = {};
            if(message.mentions.members.first()) person = message.mentions.members.first();
            else person = message.member;
            if(!file.tts[person.id]) {
                file.tts[person.id] = {name: person.user.username, accent: 'US'};
            }
            if(args[1] == 'name' || args[1] == 'n') {
                file.tts[person.id].name = args[2];
                message.channel.send('set tts name to ' + args[2]);
            } else if(args[1] == 'accent' || args[1] == 'a') {
                file.tts[person.id].accent = args[2];
                message.channel.send('set tts accent to ' + args[2]);
            } else message.channel.send('```your tts config: ' + JSON.stringify(file.tts[person.id], null, 1) + '```');

        } else if(args[0] == 'reset') { //reverts the config file to the template
            file = JSON.parse(fs.readFileSync('config/template.json'));
            message.channel.send('reset ' + guildID + ' configuration to default');

        } else if(args[0] == 'view' || !args[0]) { //displays the config file in discord
            message.channel.send('```' + JSON.stringify(file, null, 2) + '```');

        } else if(args[0] == 'help') { //displays the help embed in discord
            message.channel.send(configFields);
            message.channel.send(configEdits);
        }
        updateFile(configFileName, file);
    }
};