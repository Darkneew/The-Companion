//SETTINGS
const Discord = require('discord.js');
const bot = new Discord.Client();
var prefix = 'l!';
client.login(process.env.BOT_TOKEN);
bot.on('ready', () => {
    console.log("Alleluia ca marche")
    bot.user.setActivity("over the disciples of the holy Lumi", {type: 3});
});
 
// ORANGE IS BAD

bot.on('message', message =>{
    let msg = message.content.toLowerCase();
    if (msg.indexOf('orange') >= 0) {
        message.channel.send('Wait, that\'s illegal');
        message.author.send('Be careful, saying _you-know-what-color_ can result in a ban!');
        let author = message.author;
        let members = message.guild.members;
        let LumismFounderRole = message.guild.roles.find(role => role.name === "Lumism Founder");
        members.forEach(member => {
            if (member.roles.has(LumismFounderRole.id)) {
                console.log('found a user');
                member.user.send(`${author} just pronounced the _you-know-what-color_\nIt is now up to you to ban him or not.`);

        }
        });
    }

});

//HECK OR FRICK
bot.on('message', message =>{
    let msg = message.content.toLowerCase();
    if ((msg.indexOf('heck') >= 0)||(msg.indexOf('frick') >= 0)) {
        message.channel.send('You\'re banned from my good Christian Minecraft server');
    }

});

//A GOOD START
bot.on("guildCreate", guild => {
    console.log("Added to a new server, named " + guild.name);
    if (guild.systemChannelID)  {var gchannel = bot.channels.get(guild.systemChannelID);}
    else if (guild.afkChannelID) {var gchannel = bot.channels.get(guild.afkChannelID) }
    if (gchannel) {
        let nembed = new Discord.RichEmbed()
        .setTitle("Hello there :wave:")
        .setColor(0x999999)
        .addField("I am the Companion", "Here to guide you!")
        gchannel.send(nembed);
    }
    else {console.log('Couln\'t send the message')} ;
    let user = bot.user;
    let Tmember = guild.members.find(member => member.user === user);
    guild.createRole({
        name: 'The Holy guide',
        color: '0x999999',
        hoist: 'true',

    }).then((Nrole) => {
        if (!Tmember) return console.log('Couln\'t find the member');
        if (!Nrole) return console.log('Couldn\'t find the role');
        Tmember.addRole(Nrole);
    }
    )    
});

 
