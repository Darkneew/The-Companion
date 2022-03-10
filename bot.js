//SETTINGS
const prayers = ["Hail The Purple One full of Grace, Lumi is with thee.\nBlessed are thou among cats and blessed is the fruit of thy womb the grey square.\nHoly Purple One Mother of the square,\npray for us sinners now and at the hour of our death\nMeow.","I believe  in The Grey Square,\nHis companion, our Lord,\nwho was conceived by the Last quarter dev,\nborn of the Purple one,\nand in Lumi,\nthe Cat Almighty,\nCreator of heaven and earth,\nwho suffered under the orang e,\nHe descended into the shadows;\non the third day a light in the shadow appeared;\nHe ascended into a better place,\nis seated between The purple One and The Grey Square;\nfrom there He will come to judge the living and the dead.\nI believe in the Last quarter dev,\nthe Holy Luminists,\nthe forgiveness of sins,\nand life everlasting when in the shadows.\n\nMeow."];
const Discord = require('discord.js');
const weather = require("weather-js");
const os = require('os');
const cpuStat = require("cpu-stat");
const bot = new Discord.Client();
bot.login(process.env.BOT_TOKEN);
bot.on('ready', () => {
    console.log("Alleluia it is working")
    bot.user.setActivity("over the disciples of the holy Lumi", {type: 3});
});
const fs = require ('fs');
 
// ORANGE IS BAD

bot.on('message', message =>{
    let msg = message.content.toLowerCase();
    if (msg.indexOf('orange') >= 0) {
        message.channel.send('Wait, that\'s illegal');
        message.author.send('Be careful, saying _you-know-what-color_ can result in a ban!');
        console.log(`${message.author.username} just said you-know-what-color`);
        let author = message.author;
        let members = message.guild.members;
        let LumismFounderRole = message.guild.roles.find(role => role.name === "Lumism Founder");
        members.forEach(member => {
            if (member.roles.has(LumismFounderRole.id)) {
                member.user.send(`${author} just pronounced the _you-know-what-color_\nIt is now up to you to ban him or not.`);
                console.log(`${member.user.username} has been alerted`);
        }
        });
    }

});

//HECK OR FRICK
bot.on('message', message =>{
    let msg = message.content.toLowerCase();
    if ((msg.indexOf(' heck') >= 0)||(msg.indexOf(' frick') >= 0)||(msg.startsWith('frick'))||(msg.startsWith('heck'))) {
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

//SOME MOD COMMAND
bot.on('message', message => {
    if (message.author.bot) return;
    let database = JSON.parse(fs.readFileSync("./database.json"));
    let prefix = database.prefix;
    if (!message.content.startsWith(prefix)) return;
    var text = message.content.split('').slice(prefix.length).join('');
//help
    if (text.startsWith('help')) {
        let helpembed = new Discord.RichEmbed()
        .setColor(Math.floor(Math.random() * 16777214) + 1)
        .setAuthor('My prefix: ' + `${prefix}`)
        .addField("The useful commands:", "serverinfo, roleinfo, userinfo, report")
        .addField("The _just a little_ useful commands:", "ping, stats, avatar, weather")
        .addField("The moderator commands:", "delmsg, setprefix")
        .addField("The **true** commands:", "wiki, prayer, meme")
        .addField("Commands to help Lumism:", "addmeme, howtohelp")
      message.channel.send(helpembed);
    }
//ping
    else if (text=='ping') {
        message.channel.send("Ping-pong... Ping-pong... Pinging...") 
			.then((msg) => { 
				msg.edit(":clock2: Ping: " + (Math.floor(Math.round(bot.ping))) + 'ms \nSo, am I not the fastest holy leader you\'ve ever seen?')
})
    }
//serverinfo
    else if (text=='serverinfo') {
        let online = message.guild.members.filter(member => member.user.presence.status !== 'offline');
  let day = message.guild.createdAt.getDate()
  let month = 1 + message.guild.createdAt.getMonth()
  let year = message.guild.createdAt.getFullYear()
   let sicon = message.guild.iconURL;
   let serverembed = new Discord.RichEmbed()
   .setAuthor(message.guild.name, sicon)
   .setFooter(`Server Created • ${day}.${month}.${year}`)
   .setColor("#7289DA")
   .setThumbnail(sicon)
   .addField("ID", message.guild.id, true)
   .addField("Name", message.guild.name, true)
   .addField("Supreme Leader", message.guild.owner.user.tag, true)
   .addField("Place", message.guild.region, true)
   .addField("places to spam", message.guild.channels.size, true)
   .addField("Disciples", message.guild.memberCount, true)
   .addField("Humans", message.guild.memberCount - message.guild.members.filter(m => m.user.bot).size, true)
   .addField("ME and other useless bots", message.guild.members.filter(m => m.user.bot).size, true)
   .addField("Present", online.size, true)
   .addField("Roles", message.guild.roles.size, true);
   message.channel.send("**/" + message.guild + "/" + message.channel.name + "/**")
   message.channel.send(serverembed);
    }
//report
    else if (text.startsWith('report')) {
        let rUser = message.guild.member(message.mentions.users.first() );
    if(!rUser) return message.channel.send("Couldn't find this user\nThe right way to use this command is by typing `"+prefix+"report @user reason`");
    let rreason = text.split(" ").splice(2).join(" ");
    if(!rreason) return message.channel.send('Please, precise why');
    message.channel.send(`Report sended! This bad disciple will get the punishment he deserves`);
    console.log(`${message.author.username} just reported ${rUser.user.username}\nreason: ${rreason}`)
    let members = message.guild.members;
    let LumismFounderRole = message.guild.roles.find(role => role.name === "Lumism Founder");
    members.forEach(member => {
            if (member.roles.has(LumismFounderRole.id)) {
                console.log(`${member.user.username} has been alerted`);
                member.user.send(`For your information, ${message.author} just reported ${rUser.user}, with for reason: ${rreason}`);

        }
        });
    message.delete().catch(O_o=>{});

    }
//avatar
    else if (text.startsWith('avatar')) {
        let user = message.mentions.users.first();
    if (user) return message.channel.send(user.avatarURL);
    message.channel.send(message.author.avatarURL);
    }
//delmsg
    else if (text.startsWith('delmsg')) {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Sorry, you need to be a leader to use this command");
    let deleteNumberstr = message.content.split(" ").slice(1);
    let deleteNumber = parseInt(deleteNumberstr, 10);
    if (!deleteNumber) {
        let arrprefix = message.content.split("d");
        message.channel.send("This is the wrong way to delete a chat history :weary:\nYou should do : " + arrprefix[0] + "delmsg [number of message to delete]\nAlso, values under 1 are not accepted, *logic*");
        return;
    }
    if ((deleteNumber <= 0)||(deleteNumber>100)) { 
        message.channel.send("This is the wrong way to delete a chat history :weary:\nYou should choose a number between 1 and 100")
    }
    else {
        message.channel.bulkDelete(deleteNumber);
        console.log(deleteNumber + ` messages have been deleted by ${message.author.username} in the channel "${message.channel.name}"`)
    }
    }
//roleinfo
    else if (text.startsWith('roleinfo')) {
        let inline = true

    let role = text.split(' ').splice(1).join(" ");
    if(!role) return message.reply("Please specify a role!");
    let gRole = message.guild.roles.find(`name`, role);
    if(!gRole) return message.reply("Couldn't find that role. In order to use this command, you must say the name of the role, not mention it.");

    const status = {
        false: "No",
        true: "Yes"
      }

    let roleemebed = new Discord.RichEmbed()
    .setColor("#00ff00")
    .addField("ID", gRole.id, inline )
    .addField("Name", gRole.name, inline)
    .addField("Mention", `\`<@${gRole.id}>\``, inline)
    .addField("Hex", gRole.hexColor, inline)
    .addField("Members", gRole.members.size, inline)
    .addField("Position", gRole.position, inline)
    .addField("Hoisted", status[gRole.hoist], inline)
    .addField("Mentionable", status[gRole.mentionable], inline)
    .addField("Managed", status[gRole.managed], inline)
    
    message.channel.send(roleemebed);

    }
//weather
    else if (text.startsWith('weather')) {
        text = text.toLowerCase();
        let Tregion = text.split(' ').splice(1).join(" ");
        if (!Tregion) return message.channel.send('You need to type where, how could I know what you want otherwise?')
        weather.find({search: Tregion, degreeType: "C"}, function(err, result) { //en co
            if(err) message.channel.send(err)
    
                if(result.length === 0) {
                    message.channel.send("Mmm, man we don't live in the same planet...")
                    return;
                }
            var current = result[0].current 
            var location = result[0].location 
    
         
            let embed = new Discord.RichEmbed()
               .setDescription(`**${current.skytext}**`) 
               .setAuthor(`So, in ${current.observationpoint}`)
               .setThumbnail(current.imageUrl) 
               .setColor(0x00AE86) 
               .addField("Timezone", `UTC${location.timezone}`, true) 
               .addField("Degree Type", location.degreetype, true) 
               .addField("Temperature", `${current.temperature}`, true)
               .addField("Feels like", `${current.feelslike} Degrees`, true)
               .addField("Winds", current.winddisplay, true)
               .addField("Humidity", ` ${current.humidity}%`, true)
               .addField("Day", `${current.day}`, true)
               .addField("Date", `${current.date}`, true)
        
               message.channel.send(embed)
    
        });
    
        message.delete();
    }
//userinfo
    else if (text.startsWith('userinfo')) { 
        let inline = true
    let status = {
        online: "<:online:424890369688469504> Online",
        idle: "<:idle:424890472855502849> Idle",
        dnd: "<:dnd:424890429524410368> Do Not Disturb",
        offline: "<:offilne:424890400319340546> Offline/Invisible"
      }
      
let member = message.mentions.members.first() || message.member;
let target = message.mentions.users.first() || message.author

if (member.user.bot === true) {
    Hbot = "<:bottag:425631858265423883> Yes";
  } else {
    Hbot = "<:user:424958082691629057> No";
  }

            let embed = new Discord.RichEmbed()
                //.setAuthor(member.user.username)
                .setThumbnail((target.displayAvatarURL))
                .setColor("#00ff00")
                .addField("Full Username", `${member.user.tag}`, inline)
                .addField("ID", member.user.id, inline)
                .addField("Nickname", `${member.nickname !== null ? `<:yes:425632265993846795> Nickname: ${member.nickname}` : "<:no:425632070036094986> None"}`, true)
                .addField("Bot", `${Hbot}`,inline, true)
                .addField("Status", `${status[member.user.presence.status]}`, inline, true)
                .addField("Playing", `${member.user.presence.game ? `🎮 ${member.user.presence.game.name}` : "<:no:425632070036094986> Not playing"}`,inline, true)
                .addField("Roles", `${member.roles.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).join(" **|** ") || "<:no:425632070036094986> No Roles"}`, true)
                .addField("Joined Discord At", member.user.createdAt)
                .setFooter(`Information about ${member.user.username}`)
                .setTimestamp()
    
            message.channel.send(embed);

            message.delete();
    }
//stats
    else if (text=='stats') {
        let { version } = require("discord.js");
     
            cpuStat.usagePercent(function(err, percent, seconds) {
              if (err) {
                return console.log(err);
              }
             
             let secs = Math.floor(bot.uptime % 60);
             let days = Math.floor((bot.uptime % 31536000) / 86400);
             let hours = Math.floor((bot.uptime / 3600) % 24);
             let mins = Math.floor((bot.uptime / 60) % 60);
     
              //let duration = moment.duration(bot.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
              let embedStats = new Discord.RichEmbed()
             .setTitle("*** Stats ***")
             .setColor("#00ff00")
             .addField("• Mem Usage", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, true)
             .addField("• Uptime ", `${hours}h ${mins}m`, true) //`${duration}`, true)
             .addField("• Users", `${bot.users.size.toLocaleString()}`, true)
             .addField("• Servers", `${bot.guilds.size.toLocaleString()}`, true)
             .addField("• Channels ", `${bot.channels.size.toLocaleString()}`, true)
             .addField("• Discord.js", `v${version}`, true)
             .addField("• Node", `${process.version}`, true)
             .addField("• CPU", `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
             .addField("• CPU usage", `\`${percent.toFixed(2)}%\``,true)
             .addField("• Arch", `\`${os.arch()}\``,true)
             .addField("• Platform", `\`\`${os.platform()}\`\``,true)
             .setFooter("Your Holy Leader")
     
             message.channel.send(embedStats)
             })
    }
//wiki 
    else if (text.startsWith('wiki')) {
        text = text.toLowerCase();
        if ((text.indexOf('lumism') >= 0)||(text.indexOf('lumist') >= 0)) {
            message.channel.send('Lumism is a sect created by **The Sanse of Life** and **Meganai** end of July 2019. Its goal is to show to the world the supremacy of **Lumi**, and of his companions **The purple one** and **the grey square**. For that, the goal of lumists is to spread the holy words and show to the entire world who Lumi and his companions are.')
        }
        else if (text.indexOf('lumi')>= 0) {
            message.channel.send('Lumi is the Godess of everything, superior to everyone, and we should pray her before anything, because she is the only true thing that matter in the universe')
        }
    }
//prayers
    else if (text.startsWith('prayer')) {
        let prayer = prayers[Math.floor(Math.random()*(prayers.length))];
        message.channel.send(prayer);
        message.delete();
    }
//memes
    else if (text.startsWith('meme')) {
        let database = JSON.parse(fs.readFileSync("./database.json"));
        let memes = database.memes;
        let meme = memes[Math.floor(Math.random()*(memes.length))];
        let image = new Discord.Attachment(meme);
        message.channel.send(image);
    }
//SETPREFIX
    else  if (text.startsWith('setprefix')) {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("I'm sorry little one. Only leaders can do that.");
        let args = text.split(" ").slice(1);
        if (!args[0] ) return message.channel.send("Please include the new prefix in your message, otherwise it is useless");
        let database = JSON.parse(fs.readFileSync("./database.json"));
        database.prefix = args[0];
        fs.writeFile("./database.json", JSON.stringify(database), (err) =>{
        if(err) console.log(err)
        });
        let sembed = new Discord.RichEmbed()
        .setColor("#a6a6a6")
        .setTitle("All done")
        .setDescription(`My new prefix is ${args[0]}`);
        message.channel.send(sembed);
        console.log(`${message.author.username} changed my prefix to ${args[0]} `);
    }
//THE ADDMEME
    else if (text.startsWith('addmeme')) {
        if (!message.attachments.size) return message.channel.send(`It is really nice of you to add memes, but this is the wrong utilisation. To add memes, you should put them as an attachment`);
        let attachments = message.attachments;
        let links = []
        attachments.forEach(attachment => {
            let link = attachment.url;
            if ((link.endsWith('.tif'))||(link.endsWith('.jpg'))||(link.endsWith('.png'))||(link.endsWith('.gif'))) links.push(link);
            else message.channel.send(`I'm sorry, I can't add ${attachment.filename} because it is not a jpeg, gif, png or tiff image.`);
        });
        if (!links.length) return message.channel.send('Your help is really appreciated, but this way of submitting memes only accept links to gif, tiff, jpeg or png images. \nTo know more about submitting other type of memes, just type `'+ prefix + "howtohelp`");
        let database = JSON.parse(fs.readFileSync("./database.json"));
        links.forEach(link => {
            database.memes.push(link);
            console.log(`${message.author.username} just added a new meme.\nThe link is : ${link}`);
        });
        fs.writeFile("./database.json", JSON.stringify(database), (err) =>{
        if(err) console.log(err)
        });
        message.channel.send('Meme(s) added with success !');
    }
//HOW TO HELP
    else if (text == 'howtohelp') {
        message.channel.send(`Good! A fellow lumist! \nLet me explain to you how YOU can improve our everyday life as a lumist, and how to submit your own prayers, memes, or anything else.\nFirst, to submit a meme, just type \`${prefix}addmeme [link to your meme]\`\nTo add a prayer or some wiki stuff, commands are in constructions right now.\nFinally, if there is anything you want to submit and there is no other way to do it, just DM my slave, <@496902413240893450>`)
    }

    else {
        message.channel.send(`Lumi only knows what you mean. Or at least I didn\'t understand. \nTo know what I can understand, just type \`${prefix}help\``);
    }
});
 
//REWARDING WITH ADVERTISMENT SQUAD ROLE
bot.on('message', message => {
    if(message.author.bot) return;
    if(message.channel.name != 'advertisement-images') return;
    if(!message.attachments.size) return;
    let Arole = message.guild.roles.find(role => role.name === "Advertisement Squad");
    if(!Arole) return console.log('No roles found');
    if(message.member.roles.has(Arole.id)) return;
    message.member.addRole(Arole);
    console.log(message.author.username + ' just received the Advertisement Squad Role');
});

//THE SAY
bot.on('message', message => {
    if(message.author.bot) return;
    if (!message.content.startsWith('companioncodeis1234')) return;
    let command = message.content.split(" ").splice(1).join(" ");
    message.delete();
    if (command.startsWith('say')) {
        command = command.split(" ");
        let Tchannel = message.guild.channels.get(command[1]);
        if (!Tchannel) return message.author.send('Can\'t find the channel\nThe correct use is : `[code] say [channel ID] [phrase]`');
        let phrase = command.splice(2).join(" ");
        if (!phrase) return message.author.send('There is no phrase or sentence!\nThe correct use is : `[code] say [channel ID] [phrase]`');
        Tchannel.send(phrase);
        console.log(`${message.author.username} just sended a message in the channel "${Tchannel.name}" using my secret code.\nHis message was : ${phrase}`)
    }
});
//BEING MENTIONED
bot.on('message', message => {
    if (message.author.bot) return;
    if (!message.isMentioned(bot.user)) return;
    let size = message.content.split(" ");
    if (size.length > 3) return;
    let database = JSON.parse(fs.readFileSync("./database.json"));
    let prefix = database.prefix;
    message.channel.send("Yes, someone talked to me? I am always here to help disciples of the Almighty Lumi :innocent:.\nIf you want me to help you, just type `" + prefix + "help`");
});

//AUtOMATIC ADDMEME
bot.on('message', message => {
    if(message.author.bot) return;
    if(message.channel.name != 'memes-lumism') return;
    if(!message.attachments.size) return;
    let attachments = message.attachments;
    let links = []
    attachments.forEach(attachment => {
        let link = attachment.url;
        if ((link.endsWith('.tif'))||(link.endsWith('.jpg'))||(link.endsWith('.png'))||(link.endsWith('.gif'))) links.push(link);
    });
    if (!links.length) return;
    let database = JSON.parse(fs.readFileSync("./database.json"));
    links.forEach(link => {
        database.memes.push(link);
        console.log(`A new meme has been added.\nThe link is : ${link}`);
    });
    fs.writeFile("./database.json", JSON.stringify(database), (err) =>{
    if(err) console.log(err)
    });
});