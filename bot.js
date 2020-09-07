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
        const roleList = ['league', 'rocket', 'overwatch', 'gaming', 'developer', 'cs-meetup', 'anime', 'cmsc131', 'cmsc132', 'cmsc216', 'math140', 'math141'];
        const roleListID = ['751507896541380670', '751507831554965576', '751507860499857580', '751479288502681664', '752585354560798800', '752585329789108334', '749749498087211089', '752616700066791545', '752616753439440957', '752616781146882089', '752617288707997788', '752617318114263160'];

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        try {
            if (!message.content.startsWith(prefix) && !message.author.bot) {
                if (message.content.includes('^')) {
                    message.channel.send("^^^");
                } else if ((message.content.includes("hw") || message.content.includes("homework"))) {
                    if (args.length !== 0) {
                        message.channel.send("***DO YOUR HOMEWORK CHILD***");
                    } else {
                        return;
                    }
                }
            } if (command === 'ping') {
                message.channel.send('pong!');
            } else if (command === 'links') {
                message.channel.send("**Testudo**: https://testudo.umd.edu/ \n**ELMS**: https://elms.umd.edu/** \n**CMSC131 Homepage**: http://www.cs.umd.edu/class/fall2020/cmsc131-010X-030X/index.shtml \n**CMSC132 Homepage**: http://www.cs.umd.edu/class/fall2020/cmsc132/ ");
            } else if (command === 'server') {
                message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
            } else if (command === 'login') {
                message.channel.send("131: Username: cmsc131 \nPassword: sprcoredump \n \n132: Username: cmsc132 \nPassword: UMDjava20!");
            } else if (command === 'invite') {
                message.channel.send("Invite your friends! Use this link: https://discord.gg/uCSX8Dh")
            } else if (command === 'giveme' && args.length !== 0) {
                try {
                    var isFound = false;
                    var roleID;
                    var user = message.mentions.members.first();
                    for (var i = 0; i < roleList.length; i++) {
                        if ((roleList[i] === args[1])) {
                            roleID = roleListID[i];
                            isFound = true;
                            if (message.member.roles.cache.has(roleID) === true) {
                                message.channel.send("User already has this role!");
                                i = roleListID.length - 1;
                            } else if (message.member.roles.cache.has(roleID) === false) {
                                user.roles.add(roleListID[i]);
                                console.log(`Added ${roleList[i]} to ${user.displayName}.`);
                                message.channel.send(`Gave ${user.displayName} the role.`);
                                i = roleListID.length - 1;
                            }
                        }
                    } if (!isFound) {
                        message.channel.send("Could not find the specified role.");
                    }
                } catch (err) {
                    return;
                }

            } else if (command === 'takerole' && args.length !== 0) {
                var u = message.mentions.members.first();
                try {
                    var foundRole = false;
                    for (var i = 0; i < roleList.length; i++) {
                        if (roleList[i] === args[1]) {
                            foundRole = true;
                            u.roles.remove(roleListID[i]);
                            console.log(`Removed ${roleList[i]} from ${u.displayName}.`)
                            message.channel.send(`Removed ${u.displayName}'s role.`);
                            i = roleListID.length - 1;
                            return;
                        }
                    }
                    message.channel.send(`${u.displayName} does not have this role. `);
                    return;
                } catch (err) {
                    return;
                }
            }
        } catch (err) {

        }

    });

});




