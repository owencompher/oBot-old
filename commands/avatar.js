module.exports = {
    name: 'avatar',
    description: 'Sends the image link of the avatar of whoever is tagged.',
    execute(message, args){
        var user = message.mentions.users.first();
        if (user) message.channel.send(user.avatarURL());
        else message.channel.send('missing user')
    }
}