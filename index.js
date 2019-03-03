/*
this comment can be disregared
const commando = require('discord.js-commando');
const bot = new commando.Client();

//dice roll
bot.registry.registerGroup('random','Random');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");
*/
// ping pong

const Discord = require('discord.js');

const fs = require('fs');

const ytdl = require('ytdl-core');

const https = require('https');

const bot = new Discord.Client();

const queue = new Map();

const Settings = require('./botsettings.json');

// in index.js file, get controller for spam messages
const spamCtrl = require('./spamCtrl');

// const err = false;

process.on('unhandledRejection', error => console.error(`Uncaught Promise Rejection:\n${error}`));
// bot.channels.get('482962662289047555').send(console.error)

process.on('error', error => console.error(`uncaught error : \n${error}`));

bot.on('warn', console.warn);

bot.on('error', console.error);

bot.on('ready', () => {
	bot.user.setPresence({ status: 'idle', game: { type: 'WATCHING', name: 'over Mars || --help' } }).then(console.log(`
	Username = ${bot.user.tag}
	Prefix = --
	Avatar = ${bot.user.avatarURL}
	BotID = ${bot.user.id}
	Server Count = ${bot.guilds.size}
	Server Names = ${bot.guilds.filterArray(values => bot.guilds.values())}
	Bot is Ready.`));

	// STREAMING, WATCHING, PLAYING, LISTENING
});

bot.on('disconnect', () => console.log('Disconnected'));

bot.on('reconnecting', () => console.log('Reconnecting...'));

// logs guild create
bot.on('guildCreate', guild => {
	bot.log('Log', `
    New Server = ${guild.name}
    Owner = ${guild.owner.user.tag}
    Number of Members = ${guild.memberCount}
    `);
});

bot.on('typingStart', () => {
	bot.user.setPresence({ status: 'online' });

});

bot.on('typingStop', () => {
	setTimeout(function() { bot.user.setPresence({ status: 'idle' });}, 10000);
});
/*

*/

bot.on('messageUpdate', (oldMessage, newMessage) => {
	if (oldMessage.guild.id != '455764570829488128') {
		return null;
	}
	if (oldMessage.author == bot) {
		return null;
	}
	if (newMessage.channel.id == '524587366166560768') {
		return null;
	}
	if (newMessage == null) {
		return null;
	}
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
});

bot.on('messageDelete', (oldMessage)=> {
	if (oldMessage.guild.id != '455764570829488128') {
		return null;
	}
	if (oldMessage.author == bot) {
		return null;
	}
	if (oldMessage.channel.id == '524587366166560768') {
		return null;
	}
	const embed = new Discord.RichEmbed()
		.setTitle('Message Removed')
		.setDescription(`Old Message Sent - ${oldMessage.createdAt}`)
		.setThumbnail(oldMessage.author.avatarURL)
		.addField('Message Author', oldMessage.author)
		.addField('Old Message', `***\`${oldMessage}\`***`)
		.setFooter(oldMessage.channel.name)
		.setTimestamp();
	bot.channels.get('524587366166560768').send(embed);
});

// for the servers that message is banned in : if one of the banned messages is sent to the bot as a dm...
// it will crash the bot giving a cant read property id of null
bot.on('message', async message => {
	const args = message.content.split(/ +/g);
	const argsV = message.content.split(' ');
	const commands = args.shift().toLowerCase();
	const tolowercase = message.content.toLowerCase();
	const serverqueue = queue.get(message.guild.id);

	function random_item(items) {

		return items[Math.floor(Math.random() * items.length)];

	}

	function date(uptime) {
		// day, hours, minutes, seconds, (maybe milliseconds)
		const milliseconds = uptime;
		const seconds = Math.floor(uptime / 1000);
		const minutes = Math.floor(seconds / 60);
		const hours = Math.floor(minutes / 60);
		const days = Math.floor(hours / 24);

		return `Days ${days} Hours ${hours} Minutes ${minutes} Seconds ${seconds} Milliseconds ${milliseconds}`;
	}

	function up(time) {
		const methods = [
			{ name: 'd', count: 86400 },
			{ name: 'h', count: 3600 },
			{ name: 'm', count: 60 },
			{ name: 's', count: 1 },
		];

		const timeStr = [ Math.floor(time / methods[0].count).toString() + methods[0].name ];
		for (let i = 0; i < 3; i++) {
			timeStr.push(Math.floor(time % methods[i].count / methods[i + 1].count).toString() + methods[i + 1].name);
		}

		return (timeStr.filter(g => !g.startsWith('0')).join(', '));
	}
	// the following looks for the prefix
	if (message.content.indexOf(Settings.Prefix) === 0) {

		/*
		if (message.author.bot) {
			return;
		}
		if (!message.content.startsWith(Settings.Prefix)) {
			return;
		}
		*/
		console.count(message.content.substr(0, 4));
		if (message.content === `${Settings.Prefix}help`) {
			// need to add --uptime
			message.channel.send('BotV1-(Under Construction)\nPrefix : --\n--ping : Pings the server.\n--say : Type what you want the bot to say.\n--support : Creates an invite to Bot Testing("Support Server").\n--invite : Sends the link to invite the bot to your server.\n--id : Sends your user ID.\n--serverinfo : Fetches server information\n--avatar : Sends your avatar\n--delete : Deletes up to 100 messages\n --join : Makes the bot join the voice channel you are in\n --dis : Disconnects the bot\n--play "URL" : Plays any youtube video you want, just add the link\n --stop : Stops the audio and disconnects the bot\n\nPlus respones to certain messages\nsee if you cant find them all there are 14 in total');
		}
		if (message.content === `${Settings.Prefix}Nuke`) {
			message.channel.send('Nukeing...')
				.then(() => bot.destroy())
				.then(() => bot.login(Settings.Token))
				.then(msg => message.channel.send('Reconnected'));
		}
		if (message.content === `${Settings.Prefix}uptime`) {
			// must change uptime to mins, secs, etc
		//	const uptime = bot.uptime;
		// could have the message edit and change every minute.
			const time = 100000000; // 100,000,000
			// doesnt work. (As hoped)
			message.channel.send(up(time));
		//	message.channel.send('Status: ' + bot.status);
		}
		if (message.content === `${Settings.Prefix}ping`) {
			message.channel.send('pinging...').then((m) => {
				m.edit(`Latency ${m.createdTimestamp - message.createdTimestamp}ms API ${bot.ping}ms`);
			});
		}
		if (message.content === `${Settings.Prefix}test`) {
			if (message.author.id !== Settings.OwnerID) {
				message.reply('You are not allowed to use this command');
				return;
			}
			message.channel.send('Not broken, mostly.');
		}
		if (message.content === `${Settings.Prefix}support`) {
			message.channel.send('https://discord.gg/k6T7UKP');
		}
		if (message.content === `${Settings.Prefix}id`) {
			message.channel.send(message.author.id);
		}
		if (commands === `${Settings.Prefix}say`) {
			if(message.author.bot) {
				return;
			}
			message.channel.send(args.join(' '));
			console.log(message.author.username + message.content.split(`${Settings.Prefix}say`));
			message.delete();
		}
		// needs adjustment to where only admins can delete messages or where non admins delete <20
		if (message.content.indexOf(`${Settings.Prefix}delete`) === 0) {
			try {
				const x = message.content.substr(8);
				if (!x) {
					return message.channel.send('Please specify the amount of message you wish to delete.');
				}
				if (isNaN(x)) {
					return message.channel.send('Try again but with a number.');
				}
				if (x <= 0) {
					return message.channel.send('Please use a positive number.');
				}
				if (x > 100) {
					return message.channel.send('I can only delete a max of 100 messages.');
				}
				// may be able to compress x <= 99 and x == 100 into one block but for now it works as is
				if (x == 100) {
					message.channel.bulkDelete(parseInt(x), true).then(m => {
						m.channel.send(`${x} message(s) deleted`).then(msg => setTimeout(() => {
							msg.delete();
						}, 2000));
					});
					// may need to make this slightly more dynamic in terms of saying how many messages were deleted

				}
				// may cause problems 0 < x <= 99
				if (x <= 99) {
					const amount = parseInt(x) + 1;
					message.channel.bulkDelete(parseInt(amount));
					// may need to make this slightly more dynamic in terms of saying how many messages were deleted
					message.channel.send(`${amount - 1} message(s) deleted.`).then(msg => setTimeout(() => {
						msg.delete();
					}, 2000));
				}
			}
			catch(error) {
				console.log(error);
				message.channel.send('Please use a whole number');
			}
		}
		// needs fixed
		if (message.content.startsWith(`${Settings.Prefix}avatar`)) {
			message.channel.send(message.mentions.users.first().avatarURL);
		}
		if (message.content === `${Settings.Prefix}invite`) {
			message.channel.send('https://discordapp.com/oauth2/authorize?client_id=354048815273345035&scope=bot&permissions=8');
		}
		if (message.content === `${Settings.Prefix}serverinfo`) {
			const embed = new Discord.RichEmbed()
				.setTitle(`${message.guild.name}'s Information and Details`)
				.setThumbnail(message.guild.iconURL)
				.addField('Server Created', message.guild.createdAt)
				.addField('Members', `${message.guild.memberCount - message.guild.members.filter(member => member.user.bot).size} User(s) ${message.guild.members.filter(member => member.user.bot).size} Bot(s) ${message.guild.memberCount} Total Members`)
				.addField('Channels', `${message.guild.channels.filter(chan => chan.type === 'voice').size} voice / ${message.guild.channels.filter(chan => chan.type === 'text').size} text`)
				.addField('Roles', message.guild.roles.map(role => role.name).join(', '))
				.setFooter(message.guild.owner.user.tag, message.guild.owner.user.avatarURL)
				.setColor(0x06cbe2)
				.setTimestamp();
			message.channel.send({ embed });
		}
		// dice game
		if (message.content == `${Settings.Prefix}dice`) {
			message.channel.send('this command is under construction');
		}
		// if (!message.guild) return;

		if (message.content === `${Settings.Prefix}join`) {
			// Only try to join the sender's voice channel if they are in one themselves
			if (message.member.voiceChannel) {
				message.member.voiceChannel.join();
				/* .then((connection) => { // Connection is an instance of VoiceConnection
            message.channel.send('`Joined`');
          }); */
			}
		}
		// needs changed from "play."
		if (message.content === `${Settings.Prefix}play.`) {
			const { voiceChannel } = message.member;
			voiceChannel.join().then(connection => {
				const dispatcher = connection.playFile('C:/Users/Ali/Desktop/The_Room_Theme.mp3');
				message.channel.send('`Playing : The Room Theme`').then(msg => msg.channel.send('This is a test command.'));

				dispatcher.on('end', () => voiceChannel.leave());
			});
		}
		// none of the voice below will check for permissions

		if(message.content.startsWith(`${Settings.Prefix}play`)) {
			try {
				const voiceChannel = message.member.voiceChannel;
				const connection = await voiceChannel.join();
				const dispatcher = connection.playStream(ytdl(argsV[1]));
				dispatcher.on('end', () => {
					console.log('song over');
					voiceChannel.leave();

				});
			}
			catch(error) {
				message.channel.send('please use a vaild youtube link');
			}
		}
		if(message.content === `${Settings.Prefix}dis` || message.content === `${Settings.Prefix}stop`) {
			message.member.voiceChannel.leave();
			/* .then(leave => {
                message.channel.send('`Disconnected`');
            }) */
		}


	}
	// the following looks for commands without the prefix
	else if (message.content.indexOf(Settings.Prefix) !== 0) {
		if (message.content === '0.2 + 0.1') {
			message.channel.send(0.2 + 0.1);
		}
		if (commands === 'ping') {
			if (message.guild.id === '372910390625173504') {
				return console.log(`blocked in ${message.guild.name} => ping`);
			}
			message.channel.send('pong');
			// message.reply('pong');
		}
		// http://www.emoticonfun.org/flip/ more flips
		// only i can flip tables.
		// you know what screw it FLIP ALL THE TABLES
		if (message.content === '(╯°□°）╯︵ ┻━┻') {
			const items = ['We do NOT throw tables in this server. We are civilized people!\n┬─┬﻿ ノ( ゜-゜ノ)', 'FLIP ALL OF THE TABLES!\n (ﾉಥ益ಥ）ﾉ﻿ ┻━┻', 'FLIP EVERYTHING! EVEN THE COMPUTERS!\n\n (ノÒ益Ó)ノ彡▔▔▏\n\n ┻━┻ ︵ヽ(`Д´)ﾉ︵﻿ ┻━┻'];
			message.channel.send(random_item(items));
		}
		if (message.content === '┬─┬ ノ( ゜-゜ノ)') {
			message.channel.send('Yep, that\'s the right thing to do. Clean up the server, table by table! \n ┬─┬﻿ ノ( ゜-゜ノ)');
		}
		if (message.content === 'pls help') {
			message.reply('CHECK THE PINNED MESSAGES');
		}
		if (message.content === '!help') {
			if (message.guild.id == 282681986311782402) {
				message.reply('CHECK THE PINNED MESSAGES');
			}
			else {
				return;
			}
		}
		if (message.content === '') {
			if (message.author.id === Settings.BotID) {
				return;
			}
			const x = Math.floor(Math.random() * 7);
			if (x == 1) {
				return message.channel.send('Vive la Révolution!');
			}
			if (x == 2) {
				return message.channel.send('Vive la République!');
			}
			else {
				return;
			}
		}
		if (message.content === 'frt') {
			//	const items = [0, 1, 2, 3, 4, 5, 6];

			const x = Math.floor(Math.random() * 7);
			console.log(x);
			if (x == 1) {
				return message.channel.send('Vive la Révolution!');
			}
			if (x == 2) {
				return message.channel.send('Vive la République!');
			}
			else {
				return;
			}
		}
		if (commands === 'hi') {
			if (message.guild.id === '372910390625173504') {
				return console.log(`blocked in ${message.guild.name} => ping`);
			}
			message.reply(':fencer:  :regional_indicator_f: :information_source: :regional_indicator_g: :regional_indicator_h: :regional_indicator_t:      :regional_indicator_m: :regional_indicator_e: :fencer:');
		}
		if (commands === 'bye') {
			if (message.guild.id === '372910390625173504') {
				return console.log(`blocked in ${message.guild.name} => ping`);
			}
			message.reply('No :disappointed_relieved: come back.');
		}
		if (commands === 'v') {
			if (message.guild.id === '372910390625173504') {
				return console.log(`blocked in ${message.guild.name} => ctrl+v`);
			}
			message.reply('its ctrl+v.');
		}
		if (message.author.id === '159985870458322944') {
			message.channel.send('LoOk aT Me iM Mr. MeEsEeKs');
		}
		if (message.content.startsWith('spam')) {
			if (message.author.bot) {
				return;
			}
			spamCtrl.setChannel(message.channel);
			spamCtrl.setStatus(true);
			console.log(`spam started\nAuthor : ${message.author.username}\nServer : ${message.guild.name}`);
		}
		if (message.content === 'stop spam') {
			if (message.guild.id === '372910390625173504') {
				return console.log(`blocked in ${message.guild.name} => stop spam`);
			}
			spamCtrl.setStatus(false);
			console.log(`spam stopped\nAuthor : ${message.author.username}\nServer : ${message.guild.name}`);
		}
		if (tolowercase === 'pls kill me' || tolowercase === `pls kill ${message.author}`) {
			message.channel.send(`${bot.user} shoves <@270904126974590976> out of the way and decapitates ${message.author}`);
		}
		if (message.content === `pls kill ${bot.user}`) {
			message.author.send('I WILL find you and I WILL KILL you.');
		}
		if (message.content === `${bot.user}`) {
			const a = Math.random();
			if (a < 0.5) {
				message.channel.send('?');
			}
			if (a > 0.5) {
				message.channel.send('¿');
			}
			else { message.channel.send(a); }
		}
		if (tolowercase === 'im bored') {
			message.reply('As am I.');
		}
		if (message.content === '¯\\_(ツ)_/¯') {
			message.channel.send('_/¯(ツ)¯\\\\\\_');
		}
		if (tolowercase === 'no') {
			if (message.guild.id === '372910390625173504') {
				return console.log(`blocked in ${message.guild.name} => no`);
			}
			if (message.author.bot) {
				return;
			}
			message.reply('yes');
		}
		if (tolowercase === 'yes') {
			if (message.guild.id === '372910390625173504') {
				return console.log(`blocked in ${message.guild.name} => yes`);
			}
			if (message.author.bot) {
				return;
			}
			message.reply('no');
		}
		if (message.content.startsWith('lkf ')) {
			const id = message.content.split('lkf ');
			console.log(id);
			if (!id) { return message.channel.send('no id'); }
			bot.channels.get(id).send(message.content.split('lkf' + id).join(' '));
		}
		if (tolowercase === 'maybe') {
			if (message.guild.id === '372910390625173504') {
				return console.log(`blocked in ${message.guild.name} => yes`);
			}
			if (Math.random() < 0.4999999995) {
				message.reply('yes');
			}
			else {
				message.reply('no');
			}
		}
		if (message.content === 'score') {
			message.channel.send('Computer : 3\nMath : 7\nMe : 1\nScrew it everything is broken: 10');
		}
		if (message.content == 'pls ducc') {
			const items = ['https://assets.rbl.ms/17222882/origin.jpg', 'https://cdn.discordapp.com/attachments/282663271507689473/482396666792771584/CV9htLiWcAArTvv.png', 'https://cdn.discordapp.com/attachments/282663271507689473/482396666499039252/1151084.jpg', 'https://cdn.discordapp.com/attachments/282663271507689473/482396666490519562/Quackbar-2.jpg', 'https://cdn.discordapp.com/attachments/282663271507689473/482396657325965343/screen-shot-2015-11-28-at-13-21-06.png', 'https://cdn.discordapp.com/attachments/282663271507689473/482396655010709515/24893-1fea6gi.jpg', 'https://cdn.discordapp.com/attachments/282663271507689473/482396653710737418/SY6EWN8.jpg', 'https://media.discordapp.net/attachments/455829376093782048/484157409988837386/unknown.png?width=400&height=300',		'https://media.discordapp.net/attachments/455829376093782048/484157511847641100/unknown.png?width=364&height=301', 'https://media.discordapp.net/attachments/455829376093782048/484157640390475806/unknown.png?width=300&height=300', 'https://media.discordapp.net/attachments/455829376093782048/484157742005616641/unknown.png?width=300&height=300', 'https://media.discordapp.net/attachments/455829376093782048/484158183351517194/unknown.png?width=400&height=267', 'https://media.discordapp.net/attachments/455829376093782048/484158220928155659/unknown.png', 'https://cdn.discordapp.com/attachments/455829376093782048/481987375065726996/ussr.png' ];
			message.channel.send (random_item(items)).then(msg => {
				if(message.author.id == 270904126974590976) {
					message.delete();
				}
			});
		}
		if (tolowercase === 'die') {
			const { voiceChannel } = message.member;

			if (!voiceChannel) {
				return message.channel.send({ files: ['C:/Users/Ali/Desktop/Projects/DiscordBotV2/Images/die.png'] });
			}
			else {
				message.react(':die:456523086733508609');
				voiceChannel.join()
					.then(connection => {
						const stream = ytdl('https://www.youtube.com/watch?v=uKwUlAevqGI&ab_channel=skellington15', { filter : 'audioonly' });
						const dispatcher = connection.playStream(stream).setVolume(0.098);

						dispatcher.on('end', () => voiceChannel.leave());
					}).catch(console.error);
			}
		}
		if (tolowercase === 'fbi') {
			const { voiceChannel } = message.member;
			voiceChannel.join()
				.then(connection => {
					const stream = ytdl('https://www.youtube.com/watch?v=b8i921cgWwE&ab_channel=KingVoov', { filter : 'audioonly' });
					const dispatcher = connection.playStream(stream).setVolume(0.098);
					dispatcher.on('end', () => voiceChannel.leave());
				}).catch(console.error);
		}
		if (tolowercase === 'nani') {
			const { voiceChannel } = message.member;
			voiceChannel.join()
				.then(connection => {
					const stream = ytdl('https://www.youtube.com/watch?v=nBjlpnuA89c', { filter : 'audioonly' });
					const dispatcher = connection.playStream(stream).setVolume(0.1);
					dispatcher.on('end', () => voiceChannel.leave());
				}).catch(console.error);
		}
		if (/abc/.exec(message.content)) {
			message.react('🌲');
			const { voiceChannel } = message.member;
			if (!voiceChannel) {
				return;
			}
			voiceChannel.join().then(connection => {
				const stream = ytdl('https://www.youtube.com/watch?v=g4Gj5sGnXS8&ab_channel=SpeedingBlurrZ', { filter : 'audioonly' });
				const dispatcher = connection.playStream(stream).setVolume(0.098);
				dispatcher.on('end', () => voiceChannel.leave());
			}).catch(console.error);
		}
		if (message.content === 'asd') {
			const { voiceChannel } = message.member;
			voiceChannel.join().then(connection => {
				const stream = ytdl('https://www.youtube.com/watch?v=Qp55_8nSz1c');
				const dispatcher = connection.playStream(stream);
				dispatcher.on('end', () => voiceChannel.leave()).catch(console.error);
			});
		}
		// unfinished
		if (message.content === 'it was') {
			const { voiceChannel } = message.member;
			voiceChannel.join().then(connection => {
				const stream = ytdl('https://www.youtube.com/watch?v=kc0ZTB0qFyI&feature=youtu.be&t=39');
				const dispatcher = connection.playStream(stream);
				dispatcher.on('end', () => voiceChannel.leave());
			});
		}
		if (message.content == 'gg') {

			const { voiceChannel } = message.member;

			if (!voiceChannel) {
				return;
			}

			voiceChannel.join().then(connection => {
				const stream = ytdl('https://www.youtube.com/watch?v=54xKGTgbW9A', { filter : 'audioonly' });
				const dispatcher = connection.playStream(stream);
				dispatcher.on('end', () => voiceChannel.leave());
				console.count('gg');
			}).catch(console.error);
		}
	}

	// test commands
	if (message.content.startsWith('pls magik')) {
		try {
			const reqURL = 'https://discord.services/api/magik?url=';
			const magik = reqURL + message.content.substr(10);

			//	const datasrc = URLParse(magik);
			https.request(magik, (resp) => {
				let data = '';
				resp.on('data', (chunk) => {
					data += chunk;
				});
				resp.on('end', () => {
					message.channel.send({ files: [
						JSON.parse(data)] });
					console.log((data));
				});
			}).on('error', (err) => {
				console.log('Error: ' + err.message);
			});
		/*
		https.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', (resp) => {
				let data = '';
				resp.on('data', (chunk) => {
					data += chunk;
				});
				resp.on('end', () => {
					console.log(JSON.parse(data).explanation);
					message.channel.send(JSON.parse(data).explanation, { files: [
						data] });
				});
			}).on('error', (err) => {
				console.log('Error: ' + err.message);
			});*/
		}
		catch(error) {
			console.error(error);
		}
	}
	// https://discord.services/api/magik?url=$URL
	if (message.content.includes('level')) {
		if(message.author.id === 159985870458322944) {
			// this needs to be RegEx so as to accouunt for the level # (will need to look into regex)
			message.channel.send('LoOk aT Me iM Mr. MeEsEeKs');
		}
	}
	if (message.content === 'a') {
		const x = Math.random();
		const y = Math.random();
		if (x < y) {
			message.reply(`x < y\nb\n x = ${x}\n y = ${y}`);
			return;
		}
		if (x > y) {
			message.reply(`x > y\nc\n x = ${x}\n y = ${y}`);
			return;
		}
		else if (Math.round(x) == Math.round(y)) {
			message.reply(`x = y\nd\n x = ${x}\n y = ${y}`);
			return;
		}
		else { message.reply(`x = ${x}\n y = ${y}`); }
	}
	if (message.content === 'q') {
		message.channel.send(Math.round(Math.random()));
	}
	if (message.content === 'qw') {
		let i = Number.MAX_VALUE;
		message.channel.send(Math.floor(Math.random() * 3)).then(m => {
			for (; i > 0; i--) {
				m.channel.send(i);
			}
		});
	}
	if (message.content === 'wq') {
		// prints a random number between 0 and 9007199254740991
		const i = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
		message.channel.send(i);
	}
	// ~failed random number command (to lazy to fix)
	if (message.content.startsWith('wzq')) {
		const z = message.content.substr(3);
		const x = message.content.substr(3);
		console.log(z);
		let i;
		do {
			i = Math.floor(Math.random() * z) + 1;
			message.channel.send(i);
			console.log(i);
		}
		while (i !== x);
	}
	if (message.content.startsWith('zq')) {
		const z = message.content.substr(2);
		let i;
		console.log(i);
		while (i != z) {
			i = Math.floor(Math.random() * z) + 1;
			message.channel.send(i);
		}
	}
	if (message.content === 'https') {
		const request = require('request');
		request('http://www.google.com', function(error, response, body) {
			console.log('error:', error); // Print the error if one occurred
			console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
			console.log('body:', body); // Print the HTML for the Google homepage.
		});
	}
	/*
**messing with type conversion
	if (message.content == 1) { // compare equality after conversion
		message.channel.send('d');
	}
	if (message.content === 1) { // will not convert and compare as is
		message.channel.send('z');
	}
	when looking for number values == is needed because the user enters it as a string but we are looking for a numerical value
	if we do not use == the code block may not run even though the user inputted what was needed

	end of type coversion

	if (message.content === 'testing') {
		// random numer in a array
		// this command only exists for referance
		const items = [0, 1, 2, 3];
		message.channel.send(`mr ${Math.random()} ; items length ${items.length} ; \n1x1 ${Math.random() * items.length} 1x1+mf ${Math.floor(Math.random() * items.length)} \n \n function end:${random_item(items)}`);
	}
	*/
	// console.log(message.content);
	//    if(message.author.bot) return; //prevents bot from replying to its self
	// if(!message.content.startsWith(bot.Settings.Prefix)) return;
	// ! =not; if message content does not start with Prefix it stops reading
	// add option for a global universal queue explorer in reference to voice (7,0) (server const)

});


bot.login(Settings.Token);
