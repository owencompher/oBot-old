//imports the Discord API and creates the bot's client
const Discord = require('discord.js');
const bot = new Discord.Client();

const token = require('./token.json');

bot.ttsq = []; //idk if these need to be initialized here but it works
bot.connections = new Map();
bot.speaking = new Map();

//imports fs and has something to do with interpreting files and things
const fs = require('fs'); 
bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}

function userHasARole(userRoles, targets){
    for (var tarrole of targets) {
        if(userRoles.find(role => role.id.toString() == tarrole.id.toString())) return true;
    }
    return false;
}

function checkChannel(messageChannel, targets){
    for(const channel of targets){
        if(messageChannel.id == channel.id) return true;
    }
}

//done on every startup
bot.on('ready', () =>{
    console.log('Bot is online');
    bot.user.setActivity('o, help', { type: 'LISTENING' });
});

//done on every message
bot.on('message', message =>{
    if(message.guild) {
        var guildID = message.guild.id;
        var configFileName = 'config/' + guildID + '.json';
        if(!fs.existsSync(configFileName)) {
            fs.writeFileSync(configFileName, fs.readFileSync('config/template.json'));
        }
        var config = JSON.parse(fs.readFileSync('config/' + guildID + '.json'));

        if(checkChannel(message.channel, config.ignoreChannels)) return;

        if(config.enforceUserRoles
            && !userHasARole(message.member.roles.cache, config.userRoles)
            && !userHasARole(message.member.roles.cache, config.adminRoles)
        ) {
            return;
        }
    }

    if(!message.content.startsWith('o,') || message.author.bot) return; //stops and does nothing if the prefix is not detected

    if(message.content == 'o, break' && message.author.tag == 'O2C#9358') throw 'Broken by O2C'; //stops the host through discord

    var args = message.content.substr(3).split(' '); //creates the arguments
    var command = args.shift(); //removes the first argument

    try {
        //finds the command that matches the first argument and passes the message and arguments to the execute function of that command
        if(bot.commands.has(command)) {
            bot.commands.get(command).execute(message, args, bot);
            console.log(message.author.tag + " executed " + command); //logs the use of the command
        }
    } catch(err) {console.log(err);} //does nothing if the command is not recognized
});

bot.login(token);