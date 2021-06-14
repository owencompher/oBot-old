const tts = require('discord-tts');
const fs = require('fs');

function updateFile(file, json) {
    fs.writeFile(file, JSON.stringify(json), (err) => {
        if(err) throw err;
    });
}

module.exports = {
    name       : 'say',
    description: 'Transmits the message with tts in the same voice channel as the user.',
    execute(message, args, bot) {
        var guildID = message.guild.id.toString();
        var configFileName = 'config/' + guildID + '.json'; //gets the file name of the config file
        var file = JSON.parse(fs.readFileSync(configFileName)); //uses the file name to get JSON object

        if(message.member.voice.channelID) {
            if(!message.guild){
                message.channel.send('you need to be in a server, not dms');
                return;
            }

            var sayThing;
            if(args.join(' ').length <= 200){
                sayThing = args.join(' ');
            }
            else {
                sayThing = args.join(' ').substring(0, 200);
            }

            let item = { //represents a thing to be said, for use in ttsq
                chan  : bot.channels.cache.get(message.member.voice.channelID),
                author: message.author.username,
                saying: sayThing
            };

            async function go(item) { //for when needing to say tts thing
                if(!file.tts) file.tts = {}; //makes tts part (for backwards compat.)
                if(!file.tts[message.author.id]) {
                    file.tts[message.author.id] = {name: item.author, accent: 'US'}; //makes default profile if noe exists
                }
                let ttsProfile = file.tts[message.author.id];

                if(!bot.connections[item.chan.guild]) { //if a connection for the guild doesn't exist
                    bot.connections[item.chan.guild] = await item.chan.join(); //join the channel and add connection
                }
                if(!bot.speaking[item.chan.guild]) { //if there currently isnt a thing being said in that guild
                    if(bot.connections[item.chan.guild].channel != item.chan) { //if the connection is the wrong channel
                        bot.connections[item.chan.guild] = await item.chan.join(); //join the right channel
                        await new Promise(resolve => {
                            setTimeout(() => resolve(), 500); //waits a second for the join sound to be played
                        });
                    }
                    bot.speaking[item.chan.guild] = true; //say the thing
                    bot.connections[item.chan.guild].play(tts.getVoiceStream(`${ttsProfile.name} says: ${item.saying}`, `en-${ttsProfile.accent}`))
                        .on('finish', () => { //once done
                            bot.speaking[item.chan.guild] = false;
                            (bot.ttsq[0]) ? go(bot.ttsq.shift()) : null; //run the next thing in queue if there is a queue
                        });                                              //recursion or something i guess
                } else bot.ttsq.push(item); //if already speaking, add thing to queue
            }

            updateFile(configFileName, file);
            go(item); //initial call to above function
        } else message.channel.send('you need to be in a vc to do that');
    }
};