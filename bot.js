const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix } = require('./package.json');
const bent = require('bent');
const getJSON = bent('json');

const courseEndpoint = "https://api.umd.io/v1/courses/";
const testudoUrl = "https://app.testudo.umd.edu/soc/" 
var auth = require('./auth.json');
client.login(auth.token);

var bot = new Discord.Client({

    token: auth.token,
    autorun: true,
    guild: `{719560990550786110}`

});

client.once('ready', () => {
    console.log("Authenticated w/ server");
    client.on('message', message => {

        // kind of a jank fix, had to switch the role names around so that CMSC216 would stop being given when MATH140 was wanted.
        const roleList = ['league', 'rocket', 'overwatch', 'gaming', 'developer', 'cs-meetup', 'anime', 'cmsc131', 'cmsc132', 'cmsc216', 'math140', 'math141', 'math240', 'cmsc250', 'math241', 'stat400', 'cmsc351'];
        const roleListID = ['751507896541380670', '751507831554965576', '751507860499857580', '751479288502681664', '752585354560798800', '752585329789108334', '749749498087211089', '752616700066791545', '752616781146882089', '752616781146882089', '752642492066824222', '752617288707997788', '752617318114263160', '752648351098601524', '752647619137896518', '752648383218450562', '752648404118536292', '752647846880215220'];

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
            } else if (command === 'course' && args.length !== 0) {
                var courseResp = getJSON(courseEndpoint + "/" + args[0]).then(
                    r => {
                        if (!r['error_code']) {
                            const embed = new Discord.MessageEmbed()
                            .setTitle(r[0]['course_id'] + ": " + r[0]['name'])
                            .setColor("#E03a3e")
                            .setURL(testudoUrl + r[0]['semester']+"/"+r[0]['dept_id']+"/"+r[0]['course_id'])
                            .addFields(
                                { name: "Description", value: r[0]['description'] ? r[0]['description'] : "No provided description" },
                                { name: "Department", value: r[0]['department'], inline: false },
                                { name: "Prerequisites", value: r[0]['relationships']['prereqs'] ? r[0]['relationships']['prereqs'] : "None", inline: false },
                                { name: "Corequisites", value: r[0]['coreqs'] ? r[0]['coreqs'] : "None", inline: false},
                                { name: "Course ID", value: r[0]['course_id'], inline: true },
                                { name: "Credits", value: r[0]['credits'], inline: true }
                            );
                            message.channel.send(embed);
                        }
                        else if (r['error_code'] == 400) {
                            message.channel.send("Invalid format: course IDs take the form [major code][course number] (for example: CMSC132).");
                        }
                        else if (r['error_code'] == 404) {
                            message.channel.send("something else");
                        }
                    }
                );
            } 
        } catch (err) {
            console.err(error);
            message.channel.send("Error, please try again");
        }
        return;
    });

});
