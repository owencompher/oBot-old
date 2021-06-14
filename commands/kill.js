function randomDeath(person){
    switch(Math.floor(Math.random()*40)+1){
        case 1: return `where were u wen ${person} die\n` +
                   `i was on discord wen phone ring\n` +
                   `\"${person}\" is kil\n` +
                   `\"no\"`;
        case 2:  return `can we get an f in chat for ${person}`;
        case 3:  return `${person} is now dead. this is so sad`;
        case 4:  return `:crab:${person} is gone:crab:`;
        case 5:  return `RIP ${person}, ${(Math.floor(Math.random()*2020)+20)} - 2021`;
        case 6:  return `**BANG**\n\nlet this be a lesson to the rest of you`;
        case 7:  return `*${person} tried to swim in lava*\n\`score=0\``;
        case 8:  return `BREAKING NEWS: Nation Celebrates After ${person} Is Killed In Brutal Car Crash`;
        case 9:  return `#${person}isoverparty`;
        case 10: return `${person} was downvoted into oblivion`;
        case 11: return `${person} was burned at the stake`;
        case 12: return `${person} got swallowed by a blue whale (are you krill or something?)`;
        case 13: return `*${person} was pricked to death by a cactus while escaping Silverfish*\n\`score=2\``;
        case 14: return `${person} did the flop`;
        case 15: return `${person} doesn't feel so good`;
        case 16: return `BREAKING NEWS: ${person} Masturbated 56 Times Straight Before Dying of Heart Attack`;
        case 17: return `${person} god run over by a reindeer`;
        case 18: return `${person}'s dad found their browser history`;
        case 19: return `${person} got Philza'd`;
        case 20: return `${person} overdosed on TUMS®`;
        case 21: return `${person} called Rocket a raccoon one too many times`;
        case 22: return `${person} accidentally sold their soul to the devil`;
        case 23: return `no. do it yourself, coward`;
        case 24: return `${person} choked on deez nuts (gottem)`;
        case 25: return `*${person} was squashed by a falling anvil*\n\`score=1\``;
        case 26: return `*${person} was impaled by NoobMaster69*\n\`score=3\``;
        case 27: return `${person} was eviscerated`;
        case 28: return `${person} no-clipped into the backrooms`;
        case 29: return `${person} has fallen, and can't get up`;
        case 30: return person.toUpperCase() + ' HAS FALLEN INTO THE RIVER IN LEGO CITY';
        case 31: return `${person} politically opposed Vladmir Putin`;
        case 32: return `${person} forgot that their actions have consequences`;
        case 33: return `${person} got their dick stuck in a blender`;
        case 34: return `${person} failed to out-pizza the hut`;
        case 35: return `${person} was not welcome to Chili's`;
        case 36: return `${person} has hemorrhoids and can't sit with us`;
        case 37: return `${person} got lost in a different dimension`;
        case 38: return `${person} got harvested for their quintessence`;
        case 39: return `${person} was gunned down in the streets of Brazil by a rival drug cartel`;
        case 40: return `${person}'s dick is now a noodle`;
    }
}

module.exports = {
    name: 'kill',
    description: 'literally kills whoever you @. Really just sends a funny message about their death.',
    execute(message, args) {
        if(message.mentions.users.first()){
            message.channel.send(randomDeath(message.mentions.users.first().username));
        } else if(args[0]) {
            message.channel.send(randomDeath(args[0]));
        } else message.channel.send('you need to specify someone to kill');
    }
}