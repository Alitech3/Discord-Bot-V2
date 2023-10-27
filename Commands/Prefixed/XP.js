const fs = require('fs');
module.exports = {
	name: '%xp',
	aliases: ['%exp', '%level'],
	description: 'Check your xp Voice chat XP',
	ExpandedDesc: undefined,
	execute(prefCommand, message, ytdl, bot, Discord) {

		const Path = fs.readdirSync('./Images');

		let Random_Image = Path[Math.floor(Math.random() * Path.length)];

		const { VcUsers } = require('../../index.js');
		const attachment = new Discord.MessageAttachment(`./Images/${Random_Image}`, Random_Image);

		let mention = message.mentions.users.first();

		if (mention === undefined) {
			const embed = new Discord.MessageEmbed()
				.attachFiles(attachment)
				.setTitle('XP')
				.setThumbnail(`attachment://${Random_Image}`)
				.setDescription(`**Your XP: ${VcUsers.get(`${message.author.id}.VoiceTimeXP`)}**`)
				.setColor('#7b00ff');

			message.channel.send(embed);
		} else {
			const embed = new Discord.MessageEmbed()
				.attachFiles(attachment)
				.setTitle(`${mention.username}'s XP`)
				.setThumbnail(`attachment://${Random_Image}`)
				.setDescription(`**XP: ${VcUsers.get(`${mention.id}.VoiceTimeXP`)}**`)
				.setColor('#7b00ff');

			message.channel.send(embed);
		}
	}
};