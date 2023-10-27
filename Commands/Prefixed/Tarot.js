// https://github.com/byronhulcher/tarot-deck
var tarot = require('tarot-deck');
module.exports = {
	name: '%tarot',
	aliases: ['%fortune'],
	description: 'insightful wisdom give by this bot.',
	ExpandedDesc: 'Have insightful wisdom bestowed upon you by this bot.',
	execute(prefCommand, message, ytdl, bot, Discord) {

		// let num = Math.floor(Math.random() * 15);
		let suits = ['major', 'wands'];
		let suit = suits[Math.floor(Math.random() * suits.length)];

		var go = tarot.getBySuit(suit);

		// console.log(go);

		let fortune = go[Math.floor(Math.random() * go.length)];

		const embed = new Discord.MessageEmbed()
			.setTitle('Heart of The Cards')
			.addField('Name', fortune.name, true)
			.addField('Rank', fortune.rank, true)
			.addField('Suit', fortune.suit, true)
			.addField('Fortune:', fortune.fortune_telling[Math.floor(Math.random() * fortune.fortune_telling.length)]);
		message.channel.send({embeds: [embed]});
	},
};