const { writeFileSync } = require('fs');

process.title = 'Ascraeus - Discord Bot :)';

const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout
});

readline.on('line', (ans) => {
	if (ans.toLowerCase() === 'exit') {
		bot.destroy();
		readline.close();
		process.exit();
	} else {
		// do nothing.
	}
});

// overwritten
// readline.question('You are free to close this terminal or type \'EXIT\' to close\n', ans => {
// 	bot.destroy();
// 	if (ans.toLowerCase() === 'exit') {
// 		readline.close();
// 		process.exit();
// 	}
// });

/*
	const FORCED_PREFIX = [	
		require('./Commands/Prefixed/Anime.js'),
		require('./Commands/Prefixed/Blackjack.js'),
		require('./Commands/Prefixed/Brazil.js'),
		require('./Commands/Prefixed/Bulk.js'),
		require('./Commands/Prefixed/Call.js'),
		require('./Commands/Prefixed/Canvas.js'),
		require('./Commands/Prefixed/Clear.js'),
		require('./Commands/Prefixed/Clever.js'),
		require('./Commands/Prefixed/Dice.js'),
		require('./Commands/Prefixed/Eval.js'),
		require('./Commands/Prefixed/Icon.js'),
		require('./Commands/Prefixed/Jazz.js'),
		require('./Commands/Prefixed/Labyrinth.js'),
		require('./Commands/Prefixed/Leave.js'),
		require('./Commands/Prefixed/Play.js'),
		require('./Commands/Prefixed/Queue.js'),
		require('./Commands/Prefixed/Reddit.js'),
		require('./Commands/Prefixed/seek.js'),
		require('./Commands/Prefixed/Serverinfo.js'),
		require('./Commands/Prefixed/Set.js'),
		require('./Commands/Prefixed/Skip.js'),
		require('./Commands/Prefixed/Tamagotchi.js'),
		require('./Commands/Prefixed/Tarot.js'),
		require('./Commands/Prefixed/XP.js')
	];
*/

const FORCED_NoPREFIX = [
	require('./Commands/!Prefixed/(╯°□°）╯︵ ┻━┻.js'),
	require('./Commands/!Prefixed/Abc.js'),
	require('./Commands/!Prefixed/Anyway.js'),
	require('./Commands/!Prefixed/Are you ok.js'),
	require('./Commands/!Prefixed/Asd.js'),
	require('./Commands/!Prefixed/Bean.js'),
	require('./Commands/!Prefixed/Believe.js'),
	require('./Commands/!Prefixed/Bitch.js'),
	require('./Commands/!Prefixed/Black.js'),
	require('./Commands/!Prefixed/Cucumberr.js'),
	require('./Commands/!Prefixed/Daddy.js'),
	require('./Commands/!Prefixed/Die.js'),
	require('./Commands/!Prefixed/Do not be sorry.js'),
	require('./Commands/!Prefixed/Fbi.js'),
	require('./Commands/!Prefixed/Flash.js'),
	require('./Commands/!Prefixed/Flint.js'),
	require('./Commands/!Prefixed/Gabe.js'),
	require('./Commands/!Prefixed/Gay.js'),
	require('./Commands/!Prefixed/Heresy.js'),
	require('./Commands/!Prefixed/IRS.js'),
	require('./Commands/!Prefixed/It was.js'),
	require('./Commands/!Prefixed/King.js'),
	require('./Commands/!Prefixed/Let me in.js'),
	require('./Commands/!Prefixed/Lies.js'),
	require('./Commands/!Prefixed/Lmao.js'),
	require('./Commands/!Prefixed/Marker.js'),
	require('./Commands/!Prefixed/Massacred.js'),
	require('./Commands/!Prefixed/Meat.js'),
	require('./Commands/!Prefixed/Movie.js'),
	require('./Commands/!Prefixed/Murder.js'),
	require('./Commands/!Prefixed/Nani.js'),
	require('./Commands/!Prefixed/Nigga.js'),
	require('./Commands/!Prefixed/Nobody.js'),
	require('./Commands/!Prefixed/Oh boi.js'),
	require('./Commands/!Prefixed/Orc.js'),
	require('./Commands/!Prefixed/Religion.js'),
	require('./Commands/!Prefixed/Science.js'),
	require('./Commands/!Prefixed/Senpai.js'),
	require('./Commands/!Prefixed/Simp.js'),
	require('./Commands/!Prefixed/Smile.js'),
	require('./Commands/!Prefixed/Stupid.js'),
	require('./Commands/!Prefixed/Terry.js'),
	require('./Commands/!Prefixed/Thats hot.js'),
	require('./Commands/!Prefixed/Tower.js'),
	require('./Commands/!Prefixed/Vayne.js'),
	require('./Commands/!Prefixed/Victory.js'),
	require('./Commands/!Prefixed/We got him.js'),
	require('./Commands/!Prefixed/Weak.js'),
	require('./Commands/!Prefixed/What are you doing.js'),
	require('./Commands/!Prefixed/Wrong.js'),
	require('./Commands/!Prefixed/┬─┬ ノ( ゜-゜ノ).js')
];

const Discord = require('discord.js');

// intent syntax copy paste after comma js:5:57
// ws: {intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'GUILD_VOICE_STATES'] }
const bot = new Discord.Client({ ws:{large_threshold: 80}, intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'GUILD_VOICE_STATES', 'GUILD_PRESENCES', 'DIRECT_MESSAGES']});

// const db = require('quick.db');

// const Guild_DB = new db.table('Guild_Info');
// const VcUsers = new db.table('VcUsers');
// const All_Users = new db.table('All_Users');

// module.exports.VcUsers = VcUsers;
// module.exports.Guild_DB = Guild_DB;

// const fs = require('fs');
// const {join} = require('path');

const ytdl = require('ytdl-core');

const Settings = require('./botsettings.json');
const { name } = require('./Commands/!Prefixed/(╯°□°）╯︵ ┻━┻.js');
const { userInfo } = require('os');

bot.PrefixedCommands = new Discord.Collection();

bot.NoPrefixCommands = new Discord.Collection();

// bot.commands = new Discord.Collection();

// bot.application.commands.set(bot.NoPrefixCommands);

// for (const command of FORCED_PREFIX) {
// 	if (command.name) {
// 		bot.PrefixedCommands.set(command.name, command);
// 	}
// 	else{
// 		continue;
// 	}
// }

// const Path = fs.readdirSync(join(__dirname, 'Commands'));

// for (const Folder of Path) {
// 	fs.readdirSync(`./Commands/${Folder}`).forEach((file) => {
// 		console.log(`require('./Commands/${Folder}/${file}'),`);
// 	});
// 	// for (const file of commandFiles) {
// 	// 	const command = require(`./Commands/${Folder}/${file}`);
// 	// 	//console.log(`./Commands/${Folder}/${file}`);
// 	// 	(command.name && Folder === '!Prefixed') ? bot.NoPrefixCommands.set(command.name, command) : (command.name && Folder === 'Prefixed') ? bot.PrefixedCommands.set(command.name, command) : null;
// 	// }
// }

process.on('unhandledRejection', error => {
	writeFileSync('Error Log', `Unhandeled Rejection:\n${error}`);
	console.log(error);
	bot.destroy();
	readline.setPrompt('\nThe bot has run into an UNHANDLED PROMISE REJECTION please close and reopen the bot and report this error by dming me it. Look for a file called "Error Log" in the same folder as the bot.\nType \'EXIT\' to close this terminal\n');
	readline.prompt();
});

process.on('uncaughtException', error => {
	writeFileSync('Error Log', `Uncaught Exception:\n${error}`);
	bot.destroy();
	readline.setPrompt('\nThe bot has run into a EXCEPTION ERROR please close and reopen the bot and reopen the bot and report this error by dming me it. Look for a file called "Error Log" in the same folder as the bot.\nType \'EXIT\' to close this terminal\n');
	readline.prompt();
});

bot.on('warn', (info) => {
	console.warn(info);
});
bot.on('error', () => {
	console.log('Error');
});
bot.on('disconnect', () => { 
	console.log('Disconnected.');
});

let unique = ['a', 'b', 'c', 'd', '1', '2', '3', '4'];
let send = [];

for (let i = 0; i < 10; i++) {
	send.push(unique[Math.floor(Math.random() * unique.length)]);
}

let CurrentVCParticipants = [];

let Slash_Command_Builder = [{name: 'help', description: 'display a list of all active commands.'}];

bot.on('ready', () => {

	for (const command of FORCED_NoPREFIX) {
		if (command.name) {
			// bot.application.commands.create({ name: command.name, description: command.description});
			Slash_Command_Builder.push({
				name: command.name,
				description: command.description
			});
			bot.NoPrefixCommands.set(command.name, command);
		}
		else {
			continue;
		}
	}

	bot.application.commands.set(Slash_Command_Builder);

	console.log(`${bot.NoPrefixCommands.size + bot.PrefixedCommands.size} commands loaded`);

	bot.guilds.cache.get('397960121944113153').channels.cache.get('524587366166560768').send(send.join('') + ' - READY');

	// let guilds = Array.from(bot.guilds.cache.values());

	// // Sets up server databases
	// for (let i = 0; i < guilds.length; i++) {
	// 	if (!Guild_DB.get(guilds[i].id)) {
	// 		Guild_DB.set(guilds[i].id, {Clever: {lastused:0, convo: []}, reddit: {subreddit: [], index: [], lastused: 0}, Tamagotchi: {Name: '', Gender: '', Type: '', Health: 0, Age: 0, Weight: 0, Hunger: 0, LastFed: 0, Happy: 0, LastPlayedWith: 0, Disease: 0, Reincarnation: 0, Bounded: ''}});
	// 	}
	// }

	// // sets the time for the call notify cd
	// if (!All_Users.get(bot.user.id)) {
	// 	All_Users.set(bot.user.id, { Date: 0 });
	// }

	// let Fools_Members = bot.guilds.cache.get('455764570829488128');

	// // add fools guild members to VC db
	// for (let i = 0; i < Fools_Members.length; i++) {
	// 	if ((!VcUsers.get(Fools_Members[i].id)) && (!Fools_Members[i].user.bot)) {
	// 		VcUsers.set(Fools_Members[i].id, { JoinedVC: 0, LeftVC: 0, VoiceTimeXP:0 });
	// 	}
	// }

	// // STREAMING, WATCHING, PLAYING, LISTENING

	// let DateMS = Date.now();

	// let VCmembers = Array.from(bot.channels.cache.get('836498721407500310').members);

	// for (let i = 0; i < VCmembers.length; i++) {
	// 	if (!VCmembers[i].user.bot) {
	// 		VcUsers.set(`${VCmembers[i].id}.JoinedVC`, DateMS);
	// 		VcUsers.set(`${VCmembers[i].id}.LeftVC`, 0);
	// 		CurrentVCParticipants.push(VCmembers[i]);
	// 		console.log('Master list');
	// 		console.log(`User: ${VCmembers[i].user.username}`);
	// 	}
	// }

	/*
	let Users_Array = bot.users.cache.filter(user => user.bot === false).array();

	for(let i = 0; i < Users_Array.length; i++) {
		if (!All_Users.get(Users_Array[i].id)) {
			All_Users.set(Users_Array[i].id, { Coins: 0, Tamagotchi: {Name: '', Gender: '', Health: 0, Age: 0, Weight: 0}})
		}
	}
	*/
	bot.user.setPresence({ status: 'dnd', activities: [{name: 'over Mars. || %help', type: 'WATCHING' }]});
	console.log(`
	BOT UID: ${send.join('')}
	Username = ${bot.user.tag}
	Server Count = ${Array.from(bot.guilds.cache.entries()).length}
	Server Names = ${Array.from(Array.from(bot.guilds.cache.values()), Guild_Object => { return Guild_Object.name; })}
	Bot is Ready.\n`);
	readline.setPrompt('Bot is running type \'EXIT\' to close.\nThe bot will auto exit if another person starts a new instance.\n\n');
	readline.prompt();
});

bot.on('invalidated', () => {
	console.log('the bots session has been invalidated for some reason - ideally terminating the bot so as to not boot again.');
	bot.destroy();
});

//bot.on('debug', (info) => {
//	console.log(info);
//});

bot.on('rateLimit', (rateLimitInfo) => {
	console.log(rateLimitInfo);
});

/*
bot.on('typingStart', () => {
	bot.user.setStatus('online');
	setTimeout(function() { bot.user.setStatus('idle');}, 10000);
});
*/

// bot.on('guildMemberRemove' , (RemovedMember) =>  {

// 	if (RemovedMember.guild.id === '455764744217821194') {
// 		const embed = new Discord.MessageEmbed()
// 			.setTitle('User Removed')
// 			.setThumbnail(RemovedMember.user.avatarURL())
// 			.setDescription('User was removed from a server')
// 			.addField('Server:', RemovedMember.guild)
// 			.addField('User:', RemovedMember)
// 			.setFooter('if any of the info in this embed seems wrong let me know')
// 			.setTimestamp();

// 		bot.channels.cache.get('455791554054062083').send(embed);
// 	}

// 	const embed = new Discord.MessageEmbed()
// 		.setTitle('User Removed')
// 		.setDescription('User was removed from a server')
// 		.setThumbnail(RemovedMember.user.avatarURL())
// 		.addField('Server:', RemovedMember.guild)
// 		.addField('User:', RemovedMember)
// 		.setTimestamp();
// 	bot.channels.cache.get('524587366166560768').send(embed);
// });

// bot.on('messageUpdate', (oldMessage, newMessage) => {
// 	if (oldMessage.guild.id != '455764570829488128') {
// 		return null;
// 	}
// 	else if (oldMessage.author.bot) {
// 		return;
// 	}
// 	else if (newMessage.channel.id == '524587366166560768') {
// 		return null;
// 	}else {
// 		const embed = new Discord.MessageEmbed()
// 			.setTitle('Message Update')
// 			.setDescription(`Old Message Sent - ${oldMessage.createdAt}\n\nNew Message Sent - ${newMessage.editedAt}`)
// 			.setThumbnail(oldMessage.author.avatarURL())
// 			.addField('Message Author', oldMessage.author)
// 			.addField('Old Message', `***\`${oldMessage}\`***`)
// 			.addField('New Message', `***\`${newMessage}\`***`)
// 			.setFooter(oldMessage.channel.name)
// 			.setTimestamp();
// 		bot.channels.cache.get('524587366166560768').send(embed);
// 	}
// });

// bot.on('messageDelete', (oldMessage)=> {
// 	if (oldMessage.guild.id != '455764570829488128') {
// 		return;
// 	}
// 	if (oldMessage.author == bot) {
// 		return;
// 	}
// 	if (oldMessage.channel.id == '524587366166560768') {
// 		return;
// 	} else {/*
// 	const embed = new Discord.RichEmbed()
// 		.setTitle('Message Removed')
// 		.setDescription(`Old Message Sent - ${oldMessage.createdAt}`)
// 		.setThumbnail(oldMessage.author.avatarURL)
// 		.addField('Message Author', oldMessage.author)
// 		.addField('Old Message', `***\`${oldMessage}\`***`)
// 		.setFooter(oldMessage.channel.name)
// 		.setTimestamp();
// 		*/
// 		try {

// 			const embed2 = `Title: Message Removed \n Old Message Sent @ ${oldMessage.createdAt} \n Message Author: ${oldMessage.author} \n Old Message: ${oldMessage} \n Server & Channel: ${oldMessage.guild.name} - ${oldMessage.channel.name} \n Images: ${oldMessage.attachments.first().proxyURL}`;

// 			bot.channels.cache.get('524587366166560768').send(embed2);
// 			// first(# from beginnging?)
// 		}
// 		catch(error) {
// 			const embed1 = `Title: Message Removed \n Old Message Sent @ ${oldMessage.createdAt} \n Message Author: ${oldMessage.author} \n Old Message: ${oldMessage} \n Server & Channel: ${oldMessage.guild.name} - ${oldMessage.channel.name} \n Images: None`;

// 			bot.channels.cache.get('524587366166560768').send(embed1);
// 		}
// 	}
// });

let flag = false;

async function CallNotify(flag, connected, newMember, oldMember) {
	return;
	if (connected.size < 3) {
		flag = false;
	}
	if (flag) {
		return;
	}
	else if (connected.size >= 3) {
		let Humans = 0;
		for (const members of connected) {
			if(Humans === 3) {
				continue;
			}
			if (!members[1].user.bot) {
				Humans += 1;
			}
			else {
				null;
			}
		}
		if (Humans >= 3) {
			if(!bot.guilds.cache.get(newMember.guild.id).roles.cache.find(n => n.name == 'Call Notify')) {
				return;
			}
			else if (!bot.guilds.cache.get(newMember.guild.id).roles.cache.find(n => n.name == 'Call Notify').mentionable) {
				return;
			}
			else {
				if ((Date.now() - await All_Users.get(`${bot.user.id}.Date`)) >= 14400000) {
					bot.channels.cache.get('484911965135962142').send(`${bot.guilds.cache.get(newMember.guild.id).roles.cache.find(n => n.name == 'Call Notify')}\nJoin the party!`);
					All_Users.set(`${bot.user.id}.Date`, Date.now());
					flag = true;
				} else {
					return;
				}
			}
		} else {
			return;
		}
	}
}

//453,600 XP earned for Voice Fool
// potential bug: user joins VC while bot is online they are never added to db
// bug down here causing this:
//{"JoinedVC":1607636744311,"LeftVC":1607726610470,"VoiceTimeXP":346194}
// seperate join instant where joined nor left are reset.
//{"JoinedVC":1607636744311,"LeftVC":1607726610470,"VoiceTimeXP":346194}
// only fixed when the upper half is activated
//{"JoinedVC":1607726785527,"LeftVC":0,"VoiceTimeXP":346194}
async function CallXP() {
	return;
	let VCmembers = bot.channels.cache.get('836498721407500310').members.array();

	// joined vc bug located in here i think
	// your missing a deadzone idk what it is though its a rare one
	// maybe fixed? with the change to or in the second half
	for (let New_Member of VCmembers) {
		if ((!New_Member.user.bot) && (!CurrentVCParticipants.includes(New_Member) || (VcUsers.get(`${New_Member.id}.JoinedVC`) === 0))) {
			VcUsers.set(`${New_Member.id}.JoinedVC`, Date.now());
			CurrentVCParticipants.push(New_Member);
			console.log(`added user ${New_Member.user.username} to master list (They joined VC i think)`);
		}
	}

	for (let CurrentVC of CurrentVCParticipants) {

		if (!VCmembers.includes(CurrentVC) && !(CurrentVC.roles.cache.some(role => role.name === 'Voice Fool 🥴'))) {

			console.log(`User: ${CurrentVC.user.username} has left the VC`);

			VcUsers.set(`${CurrentVC.id}.LeftVC`, Date.now());

			let Time_in_VC = VcUsers.get(`${CurrentVC.id}.LeftVC`) - VcUsers.get(`${CurrentVC.id}.JoinedVC`);

			console.log(`Time_in_VC: ${Time_in_VC}`);

			let VC_miuntes = Math.floor(Time_in_VC / 60000);

			console.log(`VC_Min: ${VC_miuntes}`);

			for (let x = 0; x < VC_miuntes; x++) {

				let XP = Math.floor(Math.random() * 6) + 15;

				VcUsers.add(`${CurrentVC.id}.VoiceTimeXP`, XP);

				console.log(`${CurrentVC.user.username} Earned: ${VcUsers.get(`${CurrentVC.id}.VoiceTimeXP`)} XP`);

				// in charge of assigning Fool role.
				if ((CurrentVC.roles.cache.some(role => role.name === 'Voice Fool 🥴')) && (CurrentVC.roles.cache.some(role => role.name === 'Text Fool 🥴'))) {

					console.log ('Detected Both Roles');

					CurrentVC.roles.remove(bot.guilds.cache.get('455764570829488128').roles.cache.find(n => n.name == 'Voice Fool 🥴').id);

					console.log('Removed Voice');

					CurrentVC.roles.remove(bot.guilds.cache.get('455764570829488128').roles.cache.find(n => n.name == 'Text Fool 🥴').id);

					console.log('Remove Text');

					CurrentVC.roles.add(bot.guilds.cache.get('455764570829488128').roles.cache.find(n => n.name == 'Fool 🥴').id);

					console.log('Added Fools');

					const attachment = new Discord.MessageAttachment('./Images/gmagik.gif', 'gmagik.gif');

					const embed = new Discord.MessageEmbed()
						.attachFiles(attachment)
						.setTitle('LEVEL UP!')
						.setDescription(`Yee Howdy <@${CurrentVC.id}>! You just unlocked the ${bot.guilds.cache.get('455764570829488128').roles.cache.find(n => n.name == 'Fool 🥴')} role and have earned new permissions in the voice channels!`)
						.setThumbnail('attachment://gmagik.gif')
						.setColor('#F931C4');

					bot.channels.cache.get('455835394806775818').send(embed).then(() => {
						bot.channels.cache.get('455835394806775818').send(`<@${CurrentVC.id}>`);
					});
				}
				// in charge of assigning Voice Fool
				// 453,600 for voice fool

				else if ((VcUsers.get(`${CurrentVC.id}.VoiceTimeXP`) >= 453600) && !(CurrentVC.roles.cache.some(role => role.name === 'Voice Fool 🥴')) && !(CurrentVC.roles.cache.some(role => role.name === 'Fool 🥴'))) {

					console.log('Setting role');

					CurrentVC.roles.add(bot.guilds.cache.get('455764570829488128').roles.cache.find(n => n.name == 'Voice Fool 🥴').id);

					const attachment = new Discord.MessageAttachment('./Images/gmagik.gif', 'gmagik.gif');

					const embed = new Discord.MessageEmbed()
						.attachFiles(attachment)
						.setTitle('LEVEL UP!')
						.setDescription(`Yee Howdy <@${CurrentVC.id}>! You just unlocked the ${bot.guilds.cache.get('455764570829488128').roles.cache.find(n => n.name == 'Voice Fool 🥴')} role and have earned new permissions in the voice channels!`)
						.setThumbnail('attachment://gmagik.gif')
						.setColor('#F931C4');

					bot.channels.cache.get('455835394806775818').send(embed).then(() => {
						bot.channels.cache.get('455835394806775818').send(`<@${CurrentVC.id}>`);
					});
				}
			}

			VcUsers.set(`${CurrentVC.id}.JoinedVC`, 0);

			console.log(`Defaulting ${CurrentVC.user.username} JoinedVC to 0: ${VcUsers.get(`${CurrentVC.id}.JoinedVC`)}`);
		}
	}
	CurrentVCParticipants = [];

	console.log('Master list Cleared');

	for (let z = 0; z < VCmembers.length; z++) {
		if (!VCmembers[z].user.bot) {
			CurrentVCParticipants.push(VCmembers[z]);
			console.log(`New Master List User Added: ${VCmembers[z].user.username}`);
		}
	}
}

bot.on('voiceStateUpdate', (oldMember, newMember) => {
	return;
	if (newMember.guild.id !== '455764570829488128') {
		return;
	} else {
		let voicechannel = bot.guilds.cache.get(newMember.guild.id).channels.cache.get('836498721407500310');
		let connected = voicechannel.members;

		CallNotify(flag, connected, newMember, oldMember);

		CallXP();

		// let VCmembers = bot.channels.cache.get('836498721407500310').members.array();

	}
});

bot.on('messageCreate', async message => {
	if (message.author.bot && message.content.includes('READY') && message.channel.id === '524587366166560768' && !message.content.includes(send.join(''))) {
		let new_uid = message.content.replace(' - READY', '').trim();
		readline.setPrompt(`\nTHIS BOT IS BEING OVERRIDDEN - SOMEONE ELSE HAS BOOTED A NEW VERSION UP\nBot info:\nOld UID(yours): ${send.join('')}\nNew UID(other user): ${new_uid}\nYou are free to close this terminal or type 'EXIT' to close\n`);
		readline.prompt();
		bot.guilds.cache.get('397960121944113153').channels.cache.get('524587366166560768').send(`Bot UID: ${send.join('')} has been overwritten by UID: ${new_uid}`).then(() => bot.destroy());
	}
	// bookmark
	// ignore other bots prefix so as not to activate on their commands?
	// a disable option of the the non-prefixed commands
	// make where it doesnt join vc on the upper level and only reacts?

	// dm notifications
	if(message.channel.type === 'dm' && message.author.bot == false) {
		bot.users.cache.get('264227830953541632').send(`${message.author.username}\n${message.author.id}:\n ${message.content}`);
		console.log(`${message.author.username}: ${message.content}`);
	}

	// if(message.content === '%reloadcommands') {
	// 	bot.NoPrefixCommands.clear();
	// 	bot.PrefixedCommands.clear();
	// 	for (const Folder of Path) {
	// 		const commandFiles = fs.readdirSync(`./Commands/${Folder}`).filter(file => file.endsWith('.js'));
	// 		for (const file of commandFiles) {
	// 			delete require.cache[require.resolve(`./Commands/${Folder}/${file}`)];
	// 			const command = require(`./Commands/${Folder}/${file}`);

	// 			(Folder === '!Prefixed') ? bot.NoPrefixCommands.set(command.name, command) : (Folder === 'Prefixed') ? bot.PrefixedCommands.set(command.name, command) : console.log('Invalid Folder');
	// 		}
	// 	}
	// 	message.channel.send('done probably');
	// }

	if (message.content === '%CurrentVC') {
		if (CurrentVCParticipants.length === 0) {
			message.channel.send('zero VC members');
		} else {
			message.channel.send(CurrentVCParticipants);
		}
	}

	// if (message.content === '%notifystatus') {
	// 	message.channel.send(`Last updated: ${All_Users.get(`${bot.user.id}.Date`)}\nToday: ${Date.now()}\n\nResults: ${Date.now() - All_Users.get(`${bot.user.id}.Date`)}\nPassing: ${Date.now() - All_Users.get(`${bot.user.id}.Date`)} >= 14400000\nSudo Status: ${(Date.now() - All_Users.get(`${bot.user.id}.Date`)) >= 14400000}\n\nFlag State: ${flag}`);
	// }

	// bot.channels.cache.get('455775675425619981').fetchMessage(VcUsers.get(`${bot.user.id}.RoleMessageID`));

	/*
	if (message.content.startsWith('react')) {
		const reac = message.content.split('--');
	bot.channels.cache.get(reac[1]).fetchMessage(reac[2]).then(message => {message.react(reac[3])})
		}
	*/

	const URLRegExp = /(((https?:\/\/)|(www\.)))|[^\s]+(\.com\/)|[^\s]+(\.org\/[^\s]+)|[^\s]+(\.net\/[^\s]+)/gim;

	if (message.author.bot) return;

	else {
		if(message.content.toLowerCase().startsWith('%help')) {
			let Cmd = Array.from(bot.NoPrefixCommands.keys());

			// limited to ~40 characters
			let Cmd_Desc = Array.from(bot.NoPrefixCommands.values(), element => element.description || 'NA');

			let embed = new Discord.MessageEmbed()
				.setTitle(`Help - ${Cmd.length} Active Commands`)
				.addFields({name: 'Command', value : Cmd.join('\n\n'), inline: true}, {name: 'Description', value: Cmd_Desc.join('\n\n'), inline: true})
				.setFooter({text: 'bot isnt online? Message someone im sure they have the file to run it... probably.'})
				.setColor('RANDOM');

			message.channel.send({embeds: [embed]});
		}
		// if(message.content.toLowerCase().startsWith('%help') && message.content.toLowerCase() !== '%help hidden') {
		// 	// bookmark: modify so that it displays commands without a prefix

		// 	let InDepth = message.content.toLowerCase().split(/ +/)[1];

		// 	let HelpCMD = bot.PrefixedCommands.get(InDepth) || bot.PrefixedCommands.find((cmd) => cmd.aliases && cmd.aliases.includes(InDepth));

		// 	if (InDepth) {

		// 		let Aliases = HelpCMD.aliases;
		// 		let ExpandedDesc = HelpCMD.ExpandedDesc;

		// 		(Aliases) ? null : Aliases = 'N/A';
		// 		(ExpandedDesc) ? null : ExpandedDesc = 'N/A';

		// 		let embed = new Discord.MessageEmbed()
		// 			.setTitle(`Help - ${HelpCMD.name}`)
		// 			.addFields({name: 'Command Name:', value: HelpCMD.name}, {name: 'Aliases:', value: Aliases}, {name: 'Description:', value: ExpandedDesc})
		// 			.setColor('RANDOM');

		// 		message.channel.send(embed);
		//	} else {

		// 	let Cmd = Array.from(bot.PrefixedCommands.keys());

		// 	let Cmd_Aliases = Array.from(bot.PrefixedCommands.values(), element => element.aliases || 'NA' );

		// 	// limited to ~40 characters
		// 	let Cmd_Desc = Array.from(bot.PrefixedCommands.values(), element => element.description || 'NA');

		// 	let embed = new Discord.MessageEmbed()
		// 		.setTitle(`Help - ${Cmd.length} Active Commands`)
		// 		.addFields(
		// 			{name: 'Command', value: Cmd.join('\n\n'), inline: true}, 
		// 			{name: 'Aliases', value: Cmd_Aliases.join('\n\n'), inline: true}, 
		// 			{name: 'Descritption', value: Cmd_Desc.join('\n\n'), inline: true})
		// 		.setFooter({text: 'try %help hidden'})
		// 		.setColor('RANDOM');

		// 	message.channel.send({embeds: [embed]});
		// }
	}

	/*
		var x = message.content;

		if(x.startsWith('say')){
		// console.log(bot.guilds.cache.get('455764570829488128').channels.cache.forEach(n => console.log(n.name)));
		//.send(x.split('say'));
			bot.guilds.cache.get(message.guild.id).channels.cache.forEach(c => {
				if (c.type === 'text') {
					c.send(x.split('say'));
				}
				else {
					console.log('false');
				}
				console.log(c);
			});
			return;
		}
*/
	const prefCommand = message.content.toLowerCase().split(/ +/);
	const Command = message.content.toLowerCase();

	let Command_Module = bot.PrefixedCommands.get(prefCommand[0]) || bot.PrefixedCommands.find((cmd) => cmd.aliases && cmd.aliases.includes(prefCommand[0]));

	// Prefixed
	if (Command_Module) {
		Command_Module.execute(prefCommand, message, ytdl, bot, Discord);
	}

	// Not Prefixed
	if (!message.content.startsWith(Settings.Prefix)) {

		// make sure the command isnt from a url
		if (message.content.match(URLRegExp)) return;

		if (!message.content.startsWith(Settings.Prefix) && bot.NoPrefixCommands.has(Command)) {
			let percent = Math.floor(Math.random() * 100);
			if (percent < 51) {
				return bot.NoPrefixCommands.get(Command).execute(Command, message, ytdl, bot, Discord), console.log(`upper activated ${message.author.username} - ${Command} - ${percent} < 51`);
			}
			else {
				console.log(`upper failed ${message.author.username} - ${Command} - ${percent} > 51`);
			}
		}

		const namecon = Array.from(bot.NoPrefixCommands.keys());

		for (const com of namecon) {
			let percent = Math.floor(Math.random() * 100);
			if (typeof(com) === 'undefined') {
				null;
			}
			else if (message.content.toLowerCase().includes(com) && !message.content.startsWith(Settings.Prefix)) {
				if (percent < 6) {
					return console.log(`lower activated ${message.author.username} -> ${com} + ${percent} < 6`),
					bot.NoPrefixCommands.get(com).execute(Command, message, ytdl, bot, Discord);
				} else {
					console.log(`lower failed ${com} - ${message.author.username} - ${percent} > 6`);
				}
			}
		}
	}
});

bot.on('interactionCreate', async(user_interaction) => {
	const { commandName } = user_interaction;

	if(!Slash_Command_Builder.some((value) => value.name === commandName )) return;

	if (commandName === 'help') {
		let Cmd = Array.from(bot.NoPrefixCommands.keys());

		// limited to ~40 characters
		let Cmd_Desc = Array.from(bot.NoPrefixCommands.values(), element => element.description || 'NA');

		let embed = new Discord.MessageEmbed()
			.setTitle(`Help - ${Cmd.length} Active Commands`)
			.addFields({name: 'Command', value : Cmd.join('\n\n'), inline: true}, {name: 'Description', value: Cmd_Desc.join('\n\n'), inline: true})
			.setFooter({text: 'bot isnt online? Message someone im sure they have the file to run it... probably.'})
			.setColor('RANDOM');

		user_interaction.reply({embeds: [embed]});
	} else {
		console.log(`Slash Command: ${commandName} - ${user_interaction.user.username}`);
		bot.NoPrefixCommands.get(commandName).execute(commandName, undefined, ytdl, bot, Discord, user_interaction);
	}
});

bot.login(Settings.Token);