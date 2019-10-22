const Discord = require('discord.js');

const bot = new Discord.Client();

const Settings = require('./botsettings.json');

const ytdl = require('ytdl-core');

process.on('unhandledRejection', error => {
	console.log(`Uncaught Promise Rejection:\n${error}`);
	bot.channels.get('633633595054882826').send(`${error.toString()}`);
});

bot.on('ready', () => {
//	bot.user.setPresence({ status: 'online', game: { type: 'PLAYING', name: 'Pokémon on 556349 servers.' } })

	bot.user.setPresence({ status: 'idle', game: { type: 'WATCHING', name: 'over Mars || --help' } }).then(console.log(`
	Username = ${bot.user.tag}
	Server Count = ${bot.guilds.size}
	Server Names = ${bot.guilds.filterArray(values => bot.guilds.values())}
	Bot is Ready.`));
	// STREAMING, WATCHING, PLAYING, LISTENING
});

bot.on('typingStart', () => {
	bot.user.setPresence({ status: 'online' });

});

bot.on('typingStop', () => {
	setTimeout(function() { bot.user.setPresence({ status: 'online' });}, 10000);
});

bot.on('guildMemberRemove' , (guildMember) =>  {
	const embed = new Discord.RichEmbed()
	.setTitle('User Removed')
	.setDescription('User was removed from a server')
	.setThumbnail(guildMember.user.avatarURL)
	.addField('Server:', guildMember.guild)
	.addField('User:', guildMember)
	.setTimestamp();
bot.channels.get('524587366166560768').send(embed);
});

bot.on('messageUpdate', (oldMessage, newMessage) => {
	if (oldMessage.guild.id != '455764570829488128') {
		return null;
	}
	else if (oldMessage.author == bot) {
		return;
	}
	else if (newMessage.channel.id == '524587366166560768') {
		return null;
	}else {
	const embed = new Discord.RichEmbed()
		.setTitle('Message Update')
		.setDescription(`Old Message Sent - ${oldMessage.createdAt}\n\nNew Message Sent - ${newMessage.editedAt}`)
		.setThumbnail(oldMessage.author.avatarURL)
		.addField('Message Author', oldMessage.author)
		.addField('Old Message', `***\`${oldMessage}\`***`)
		.addField('New Message', `***\`${newMessage}\`***`)
		.setFooter(oldMessage.channel.name)
		.setTimestamp();
	bot.channels.get('524587366166560768').send(embed);
	}
});

bot.on('messageDelete', (oldMessage)=> {
	if (oldMessage.guild.id != '455764570829488128') {
		return;
	}
	if (oldMessage.author == bot) {
		return;
	}
	if (oldMessage.channel.id == '524587366166560768') {
		return;
	} else {/*
	const embed = new Discord.RichEmbed()
		.setTitle('Message Removed')
		.setDescription(`Old Message Sent - ${oldMessage.createdAt}`)
		.setThumbnail(oldMessage.author.avatarURL)
		.addField('Message Author', oldMessage.author)
		.addField('Old Message', `***\`${oldMessage}\`***`)
		.setFooter(oldMessage.channel.name)
		.setTimestamp();
		*/
		try {
			const embed2 = `Title: Message Removed \n Old Message Sent @ ${oldMessage.createdAt} \n Message Author: ${oldMessage.author} \n Old Message: ${oldMessage} \n Server & Channel: ${oldMessage.guild.name} - ${oldMessage.channel.name} \n Images: ${oldMessage.attachments.first().proxyURL}`;

			bot.channels.get('524587366166560768').send(embed2);
			// first(# from beginnging?)
		}
		catch(error) {
			console.log(error);
			const embed1 = `Title: Message Removed \n Old Message Sent @ ${oldMessage.createdAt} \n Message Author: ${oldMessage.author} \n Old Message: ${oldMessage} \n Server & Channel: ${oldMessage.guild.name} - ${oldMessage.channel.name} \n Images: None`;

			bot.channels.get('524587366166560768').send(embed1);
		}
}
});

bot.on('message', async message => {
/*
	const poke = require('./Commands/!Prefixed/pokemon.json');

	if(message.content.startsWith('psy')) {
		const x = message.content.split('-');
		const embed = new Discord.RichEmbed()
		.setTitle('‌‌A wild pokémon has appeared!')
		.setDescription('Guess the pokémon and type p!catch <pokémon> to catch it!')
		.setFooter(x[2])
		.setColor('AQUA')
		.setImage(poke[Math.floor(Math.random() * poke.length)])
		bot.channels.get(x[1]).send(embed);
	}
*/
if(message.content.startsWith('--play')) {

	const x = message.content.split(' ');
	console.log(x)
	try {
		const voiceChannel = message.member.voiceChannel;
		const connection = await voiceChannel.join();
		const dispatcher = connection.playStream(ytdl(x[1]));
		dispatcher.on('end', () => {
			console.log('song over');
			voiceChannel.leave();

		});
	}
	catch(error) {
		message.channel.send('please use a vaild youtube link');
	}
}

	var x = message.content;
	if(x.startsWith('say')){
		message.channel.send(x.split('say'));
		return;
	}

	if (message.content.startsWith('--eval') && message.author.id == 264227830953541632){
		var y = x.split('--eval')
		message.channel.send(eval(y[1]));
	}

	if (message.content.startsWith(`${Settings.Prefix}avatar`)) {
		message.channel.send(message.mentions.users.first().avatarURL);
	}

// react to a specific message
/*
	if (message.content.startsWith('react')) {
	const reac = message.content.split('--');
bot.channels.get(reac[1]).fetchMessage(reac[2]).then(message => {message.react(reac[3])})
	}

	if (message.content.startsWith('bypass')) {
		const bypassing = message.content.split(';;');

		const Vargs = require(`./Commands/!Prefixed/${bypassing[1]}.js`);
		const voiceChannel = bot.channels.get(bypassing[2]);

		(bypassing[3] === 'voice') ? Vargs.run(Vargs, voiceChannel, message, ytdl, Discord) : voiceChannel.fetchMessage(bypassing[4]).then(message => {message.react(bypassing[5])});
	}
*/
	if(message.content === '--test') {
		message.reply('working?');
	}
	if(message.author.bot) {
		return;
	}
	else if(message.content.startsWith(Settings.Prefix)) {

		const Targs = message.content.toLowerCase().split(Settings.Prefix);

		console.log(Targs);

		const CommandFileText = require(`./Commands/Prefixed/${Targs[1]}.js`);

		return CommandFileText.run(Targs, message, Discord);

	}
	else {
		const Vargs = message.content.toLowerCase();

		const { voiceChannel } = message.member;

		const CommandsFile = require(`./Commands/!Prefixed/${Vargs}.js`);

		return CommandsFile.run(Vargs, voiceChannel, message, ytdl, Discord);
	}
});

//To Do:
// Reorginize to sperate text commands from voice commands
// Fix help command
// implement pseudocode
// new message sends the wrong time - sends time as null
// change for voice and text to teritary operator - if(voice) sfdsfds ? dgfdgfd
// play command broken entierly
/*
Pseudocode

	if(message.startswith(prefix)) {
		try {
			CommandsFile.run(etc);
		}
		catch(error) {
			console.error();
		}
		else {
			try {
				VoiceFile.run(etc);
			}
			catch(error) {
				console.error();
			}
		}
	}

*/

bot.login(Settings.Token);