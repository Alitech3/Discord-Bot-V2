const db = require('quick.db');

let pot = 0;

function MoneyFormatinput(rawamount) {

	return rawamount.endsWith('b')
	// Nine Zeroes for Billions
		? pot = rawamount.replace('b', '') * 1.0e+9

		: rawamount.endsWith('m')
		// Six Zeroes for Millions 
			? pot = rawamount.replace('m', '') * 1.0e+6

			: rawamount.endsWith('k')
			// Three Zeroes for Thousands
				? pot = rawamount.replace('k', '') * 1.0e+3

				: (pot = rawamount * 1.0e+6);
}

function MoneyFormatoutput(labelValue) {

	return Math.abs(Number(labelValue)) >= 1.0e+9
	// Nine Zeroes for Billions
		? Math.abs(Number(labelValue)) / 1.0e+9 + 'B'

		: Math.abs(Number(labelValue)) >= 1.0e+6
		// Six Zeroes for Millions 
			? Math.abs(Number(labelValue)) / 1.0e+6 + 'M'

			: Math.abs(Number(labelValue)) >= 1.0e+3
			// Three Zeroes for Thousands
				? Math.abs(Number(labelValue)) / 1.0e+3 + 'K'

				: Math.abs(Number(labelValue));
}

module.exports = {
	name: '%blackjack',
	aliases: ['%bj'],
	description: 'Play BlackJack - Closest to 21 wins.',
	ExpandedDesc: undefined,
	execute(prefCommand, message, ytdl, bot, Discord) {

		const bet = prefCommand[1];
		const author = message.author;

		async function bleh() {

			let A = 11;
			let DealerHand = [];
			let Dealer_String = '';
			let Dealer_First_Card = 0;
			let DV = 0;

			let PlayerHand = [];
			let Player_String = '';
			let PV = 0;

			function Deal(Hand, Amount) {
				const number = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
				const suits = ['H', 'C', 'D', 'S'];
				for (let i = 0; i < Amount; i++){
					let Card = number[Math.floor(Math.random() * number.length)]+suits[Math.floor(Math.random() * suits.length)];
					if (DealerHand.includes(Card) || PlayerHand.includes(Card)) {
						i--;
					} else {
						Hand.push(Card);
					}
				}
			}
			function HandValue(Hand, PH, A) {
				let value = 0;
				if (!PH) {
					if (Hand[0].slice(0, 1) == 'A') {
						Dealer_First_Card = A;
					}
					else if (Hand[0].slice(0, 1) == '1' || Hand[0].slice(0, 1) == 'J' || Hand[0].slice(0, 1) == 'Q' || Hand[0].slice(0, 1) == 'K'){
						Dealer_First_Card += 10;
					} else {
						Dealer_First_Card += Number(Hand[0].slice(0, 1));
					}
				}
				for(let i=0; i<Hand.length; i++) {
					let amount = Hand[i].slice(0, 1);
					if (amount == 'A') {
						value += A;
					} else if (amount == '1'){
						value += 10;
					} else if (amount == 'J'){
						value += 10;
					} else if (amount == 'Q'){
						value += 10;
					} else if (amount == 'K'){
						value += 10;
					}
					else {
						value += Number(amount);
					}
				}
				(PH === true) ? PV = value : DV = value;
			}
			function ToString(PlayerHand, DealerHand, bot) {
				Dealer_String = DealerHand.join(' ');
				Player_String = PlayerHand.join(' ');

				for (let i = 0; i < PlayerHand.length; i++) {
					Player_String = Player_String.replace(`${PlayerHand[i]}`, `<:${bot.emojis.cache.find(n => n.name === PlayerHand[i]).name}:${bot.emojis.cache.find(n => n.name === PlayerHand[i]).id}>`);
				}
				for (let i = 0; i < DealerHand.length; i++) {
					Dealer_String = Dealer_String.replace(`${DealerHand[i]}`, `<:${bot.emojis.cache.find(n => n.name === DealerHand[i]).name}:${bot.emojis.cache.find(n => n.name === DealerHand[i]).id}>`);
				}
			}

			Deal(DealerHand, 2);
			Deal(PlayerHand, 2);
			HandValue(DealerHand, false, A);
			HandValue(PlayerHand, true, A);
			ToString(PlayerHand, DealerHand, bot);

			if (PV === 21) {
				const embed = new Discord.MessageEmbed()
					.setTitle('BlackJack')
					.setThumbnail(message.guild.iconURL)
					.setAuthor(author.username, author.avatarURL)
					.addField('Blackjack', `**Player Wins**\nWager: **${MoneyFormatoutput(pot)} Coins**\nPot: **${MoneyFormatoutput(pot * 2)} Coins**`)
					.addField('Player Hand', `${Player_String}\nHand Value: **${PV}**`, true)
					.addField('Dealer Hand', `${Dealer_String}\nHand Value: **${DV}**`, true)
					.setColor('GREEN');

				db.add(`${author.id}.Coins`, pot);
				db.add(`${author.id}.OverallWagerCoins`, pot);
				return message.channel.send({ embeds: [embed]});
			} else if (DV === 21) {
				const embed = new Discord.MessageEmbed()
					.setTitle('BlackJack')
					.setThumbnail(message.guild.iconURL)
					.setAuthor(author.username, author.avatarURL)
					.addField('Blackjack', `**Dealer Wins\nWager: **${MoneyFormatoutput(pot)} Coins**\nPot: **${0} Coins**`)
					.addField('Player Hand', `${Player_String}\nHand Value: **${PV}**`, true)
					.addField('Dealer Hand', `${Dealer_String}\nHand Value: **${DV}**`, true)
					.setColor('#ff0000');

				db.subtract(`${author.id}.Coins`, pot);
				db.add(`${author.id}.OverallWagerCoins`, pot);
				return message.channel.send({ embeds: [embed]});
			} else {
				const embed = new Discord.MessageEmbed()
					.setTitle('BlackJack')
					.setThumbnail(message.guild.iconURL)
					.setAuthor(author.username, author.avatarURL)
					.setDescription('Please type `hit` for another card or `stand` to keep your total.')
					.addField('Player Hand', `${Player_String}\nHand Value: ${PV}`, true)
					.addField('Dealer Hand', `${Dealer_String.split(' ').shift()}  ${bot.emojis.cache.find(n => n.name === 'Back')}\nHand Value: ${Dealer_First_Card}`, true)
					.setColor('#00ccff');

				let edit = await message.channel.send({ embeds: [embed]});

				const ryan = new Discord.MessageCollector(message.channel, message =>  message.author.id == author.id && message.content.toLowerCase() === ('hit') || message.content.toLowerCase() === ('stand'), { maxMatches: 5, time: 90000});

				ryan.on('collect', async collected => {
					const yourmomdotcom = collected.content.toLowerCase();
					if (yourmomdotcom === 'hit') {
						console.log('hitting');
						console.log(DealerHand);
						
						Deal(PlayerHand, 1);
						HandValue(PlayerHand, true, A);
						ToString(PlayerHand, DealerHand, bot);
						if (A == 1 && PV > 21) {

							const Bust = new Discord.MessageEmbed()
								.setTitle('BlackJack')
								.setThumbnail(message.guild.iconURL)
								.setAuthor(author.username, author.avatarURL)
								.addField('Blackjack', `**Dealer Wins**\nWager: **${MoneyFormatoutput(pot)} Coins**\nPot: **${0} Coins**`)
								.addField('Player Hand', `${Player_String}\nHand Value: **BUST**`, true)
								.addField('Dealer Hand', `${Dealer_String}\nHand Value: **${DV}**`, true)
								.setColor('#ff0000');

							db.subtract(`${author.id}.Coins`, pot);
							db.add(`${author.id}.OverallWagerCoins`, pot);
							return edit.edit(Bust), ryan.stop('Player Bust');
						} else if ((PlayerHand.includes('AH')||PlayerHand.includes('AC')||PlayerHand.includes('AD')||PlayerHand.includes('AS')) && PV > 21) {
							A = 1;
							HandValue(PlayerHand, true, A);

							const embed2 = new Discord.MessageEmbed()
								.setTitle('BlackJack')
								.setThumbnail(message.guild.iconURL)
								.setAuthor(author.username, author.avatarURL)
								.setDescription('Please type `hit` for another card or `stand` to keep your total.')
								.addField('Player Hand', `${Player_String}\nHand Value: ${PV}`, true)
								.addField('Dealer Hand', `${Dealer_String.split(' ').shift()} ${bot.emojis.cache.find(n => n.name === 'Back')}\nHand Value: ${Dealer_First_Card}`, true)
								.setColor('#00ccff');

							edit.edit(embed2);
						} else if (PV > 21) {
							const Bust = new Discord.MessageEmbed()
								.setTitle('BlackJack')
								.setThumbnail(message.guild.iconURL)
								.setAuthor(author.username, author.avatarURL)
								.addField('Blackjack', `**Dealer Wins**\nWager: **${MoneyFormatoutput(pot)} Coins**\nPot: **${0} Coins**`)
								.addField('Player Hand', `${Player_String}\nHand Value: **BUST**`, true)
								.addField('Dealer Hand', `${Dealer_String}\nHand Value: ${DV}`, true)
								.setColor('#ff0000');
	
							db.subtract(`${author.id}.Coins`, pot);
							db.add(`${author.id}.OverallWagerCoins`, pot);
							return edit.edit(Bust), ryan.stop('Player Bust');
						} else if (PV === 21) {
							ryan.stop('Stand');
						}
						else {
							const embed2 = new Discord.MessageEmbed()
								.setTitle('BlackJack')
								.setThumbnail(message.guild.iconURL)
								.setAuthor(author.username, author.avatarURL)
								.setDescription('Please type `hit` for another card or `stand` to keep your total.')
								.addField('Player Hand', `${Player_String}\nHand Value: ${PV}`, true)
								.addField('Dealer Hand', `${Dealer_String.split(' ').shift()} ${bot.emojis.cache.find(n => n.name === 'Back')}\nHand Value: ${Dealer_First_Card}`, true)
								.setColor('#00ccff');

							edit.edit(embed2);
						}
					} else if (yourmomdotcom === 'stand') {
						ryan.stop('Stand');
					}
				});

				ryan.on('end', async (collected, reason) => {
					if (reason === 'Stand') {
						A = 11;
						HandValue(DealerHand, false, A);
						edit.edit(embed.setDescription('The Dealer is Drawing'));

						while (DV < 17) {
							Deal(DealerHand, 1);
							HandValue(DealerHand, false, A);
							await ToString(PlayerHand, DealerHand, bot);
							if ((DealerHand.includes('AH')||DealerHand.includes('AC')||DealerHand.includes('AD')||DealerHand.includes('AS')) && DV > 21) {
								A = 1;
								HandValue(DealerHand, false, A);
							} else {
								HandValue(DealerHand, false, A);

								const Draw = new Discord.MessageEmbed()
									.setTitle('BlackJack')
									.setThumbnail(message.guild.iconURL)
									.setAuthor(author.username, author.avatarURL)
									.setDescription('The Dealer is Drawing')
									.addField('Player Hand', `${Player_String}\nHand Value: ${PV}`, true)
									.addField('Dealer Hand', `${Dealer_String}\nHand Value: ${DV}`, true)
									.setColor('#00ccff');
	
								edit.edit(Draw);
							}
						}
						await ToString(PlayerHand, DealerHand, bot);
						if (DV > 21) {
							const Bust = new Discord.MessageEmbed()
								.setTitle('BlackJack')
								.setThumbnail(message.guild.iconURL)
								.setAuthor(author.username, author.avatarURL)
								.addField('Blackjack', `**Player Wins**\nWager: **${MoneyFormatoutput(pot)} Coins**\nPot: **${MoneyFormatoutput(pot * 2)} Coins**`)
								.addField('Player Hand', `${Player_String}\nHand Value: **${PV}**`, true)
								.addField('Dealer Hand', `${Dealer_String}\nHand Value: **BUST**`, true)
								.setColor('#00ff00');
	
							db.add(`${author.id}.Coins`, pot);
							db.add(`${author.id}.OverallWagerCoins`, pot);
							return edit.edit(Bust);
						} else if (DV < PV) {
							const Final = new Discord.MessageEmbed()
								.setTitle('BlackJack')
								.setThumbnail(message.guild.iconURL)
								.setAuthor(author.username, author.avatarURL)
								.addField('Blackjack', `**Player Wins**\nWager: **${MoneyFormatoutput(pot)} Coins**\nPot: **${MoneyFormatoutput(pot * 2)} Coins**`)
								.addField('Player Hand', `${Player_String}\nHand Value: **${PV}**`, true)
								.addField('Dealer Hand', `${Dealer_String}\nHand Value: **${DV}**`, true)
								.setColor('#00ff00');
					
							db.add(`${author.id}.Coins`, pot);
							db.add(`${author.id}.OverallWagerCoins`, pot);
							return edit.edit(Final);
						} else if (DV > PV) {
							const Final = new Discord.MessageEmbed()
								.setTitle('BlackJack')
								.setThumbnail(message.guild.iconURL)
								.setAuthor(author.username, author.avatarURL)
								.addField('Blackjack', `**Dealer Wins**\nWager: **${MoneyFormatoutput(pot)} Coins**\nPot: **${0} Coins**`)
								.addField('Player Hand', `${Player_String}\nHand Value: **${PV}**`, true)
								.addField('Dealer Hand', `${Dealer_String}\nHand Value: **${DV}**`, true)
								.setColor('#ff0000');
	
							db.subtract(`${author.id}.Coins`, pot);
							db.add(`${author.id}.OverallWagerCoins`, pot);
							return edit.edit(Final);
						}
						else if (DV === PV) {
							const Final = new Discord.MessageEmbed()
								.setTitle('BlackJack')
								.setThumbnail(message.guild.iconURL)
								.setAuthor(author.username, author.avatarURL)
								.addField('Blackjack', `**Draw**\nWager: **${MoneyFormatoutput(pot)} Coins**\nPot: **${0} Coins**`)
								.addField('Player Hand', `${Player_String}\nHand Value: **${PV}**`, true)
								.addField('Dealer Hand', `${Dealer_String}\nHand Value: **${DV}**`, true)
								.setColor('#00ccff');

							db.add(`${author.id}.OverallWagerCoins`, pot);
							return edit.edit(Final);
						}
					}
				});
			}
		}
		if (typeof(bet) == 'undefined') {
			return message.channel.send('please add a bet');
		}
		if(!(!isNaN(bet) || bet.endsWith('b') || bet.endsWith('m') || bet.endsWith('k'))) {
			return message.channel.send('please try again with a number\n`%bj amount[B, M, K]`');
		}
		MoneyFormatinput(bet);
		if (pot < 50000){
			return message.channel.send('Minimum Bet: 50K');
		} else {
			bleh();
		}
	}
};