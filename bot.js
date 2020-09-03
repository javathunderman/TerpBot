const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix } = require('./package.json');

var auth = require('./auth.json');
client.login(auth.token);

var bot = new Discord.Client({
    token: auth.token,
    autorun: true,
    guild: `{719560990550786110}`

});

client.once('ready', () => {
    client.on('message', message => {
        if (message.content === '!ping') {
            message.channel.send('Pong.');
        } else if (message.content === `${prefix}links`) {
            message.channel.send("Testudo: https://testudo.umd.edu/ \nELMS: https://elms.umd.edu/ \nCMSC131 Homepage: http://www.cs.umd.edu/class/fall2020/cmsc131-010X-030X/index.shtml ");
        } else if (message.content === `${prefix}server`) {
            message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
        } else if (message.content === '^') {
            message.channel.send('^^^');
        } else if (message.content.includes('rocky') || message.content.includes('Rocky')) {
            message.channel.send('Which one?');
        } else if (message.content === `${prefix}login`) {
            message.channel.send("Username: cmsc131 \nPassword: sprcoredump");
        } else if (message.content.includes('is a nerd')) {
            message.channel.send("no u");
        } else if (message.content.includes('heck')) {
            message.channel.send("hecc");
        } else if (message.content.includes('terpbot is dumb')) {
            message.channel.send('NO U');
        } else if (message.content.includes('terpbot is not dumb')) {
            message.channel.send('damn straight');
        } else if (message.content.includes('trans')) {
            message.channel.send('Trans rights!');
        } else if (message.content.includes('hw') || message.content.includes("HW") || message.content.includes('homework') || message.content.includes('Homework')) {
            if (message.content.includes('finished')) {
                message.channel.send("congrats <3");
            } else {
                message.channel.send('**DO YOUR HOMEWORK CHILD**');
            }
        } else if(message.content.includes('shut up')) {
            message.channel.send("make pizza not war children");
        }

    });

});




