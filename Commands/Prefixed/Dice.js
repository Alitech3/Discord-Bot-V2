//bookmark
// can probably add an image with the roll number.

module.exports = {
	name: '%dice',
	aliases: undefined,
	description: 'High-Low - Dice mini game.',
	ExpandedDesc: 'High-Low - React with an emoji betting if the dice will roll high, low or 7.',
	execute(prefCommand, message, ytdl, bot, Discord) {
		let Roll = Math.floor(Math.random() * (12 - 1) + 2);

		let High_Seven_Low = (Roll >= 8) ? 'High' : (Roll === 7) ? 'Seven' : 'Low' ;

		const embed = new Discord.MessageEmbed()
			.setTitle('High-Low')
			.setDescription('React with an emoji\n⬆️ = High(8, 9, 10, 11, 12)\n⬇️ = Low(6, 5, 4, 3, 2)\n7️⃣ = 7')
			.setFooter('once your bet is placed it cant be changed.\ncommand: %dice')
			.setColor('RANDOM');

		message.channel.send(embed).then(async (Msg_Edit) => {
			await Msg_Edit.react('⬆️');
			await Msg_Edit.react('⬇️');
			await Msg_Edit.react('7️⃣');

			const filter = (reaction, user) => {
				return (reaction.emoji.name === '⬆️' || reaction.emoji.name === '⬇️' || reaction.emoji.name === '7️⃣') && (user.bot === false);
			};

			const Bet_Collector = new Discord.ReactionCollector(Msg_Edit, filter, {time: 30000, idle: 10000});

			let Bets = new Map();

			Bet_Collector.on('collect', (reaction, user) => {
				if (Bets.has(user)) {
					null;
				} else {
					Bets.set(user, reaction.emoji.name);
				}
			});

			Bet_Collector.on('end', () => {
				let Payout = (Roll === 7) ? 'Nine Cookies.' : 'A Singular Cookie.';

				let Winners = [];

				Bets.forEach( (value, key) => {
					let Converted_Roll = (High_Seven_Low === 'High') ? '⬆️' : (High_Seven_Low === 'Seven') ? '7️⃣' : '⬇️';

					if (value === Converted_Roll) {
						Winners.push(key);
					}
				});

				Msg_Edit.edit(embed.setDescription(`**Roll:** ${Roll}`).addFields([{ name: 'Winners:', value: `${Winners}\u200b`, inline: true}, { name: '\u200b', value: '\u200b', inline: true}, { name: 'PAYOUT', value: Payout, inline: true}]));
			});

		});
	}
};