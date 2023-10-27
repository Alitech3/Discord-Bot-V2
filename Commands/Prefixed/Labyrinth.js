async function Begin(prefCommand, message, ytdl, bot, Discord, CP, PD, difficulty) {
	let i = 0;

	while (i < difficulty) {
		CP.push(PD[Math.floor(Math.random() * PD.length)]);
		i++;
	}

	let position = 0;

	console.log(CP);

	const embed = new Discord.MessageEmbed()
		.setTitle('The Labyrinth')
		.setDescription('Welcome, your goal is to escape - you have 2 possible directions you can go `Left or Right`\n\n please type which way you would like to go - faliure to guess the correct direction will result in you being lost to a trap in the labyrinth')
		.setFooter('you have one minute to decided')
		.setColor('BLUE');

	const edit = await message.channel.send(embed);

	const collector = new Discord.MessageCollector(message.channel, m => m.author.id  === message.author.id && (m.content.toLowerCase() === 'left' || m.content.toLowerCase() === 'right'), {time: 120000, maxMatches: CP.length});

	let users_path = [];

	collector.on('collect', async collected => {
		if (collected.content === CP[position]) {
			embed.fields = [];
			await users_path.push(CP[position]);
			edit.edit(embed.addField('Your Path', `\`${users_path.join(', ')}\``));
			position += 1;
			if (users_path.length === CP.length) {
				collector.stop();
			}
		} else {
			embed.fields = [];
			await users_path.push(collected.content);
			edit.edit(embed.addField('Your Path', `\`${users_path.join(', ')}\``));
			collector.stop('faliure');
		}
	});

	collector.on('end', (collected, reason) => {
		embed.footer = {};
		if (reason === 'faliure') {
			edit.edit(embed.setDescription('You have been lost to the Labyrinth.').addField('Correct Path', `\`${CP.join(', ')}\``).setColor('RED'));
		} 
		else if (reason === 'time') {
			edit.edit(embed.setDescription('You have run out of time thus being consumed by the Labyrinth').setColor('RED'));
		}
		else {
			edit.edit(embed.setDescription('You have successfully escaped the Labyrinth - Well Done.').addField('Correct Path', `\`${CP.join(', ')}\``).setColor('GREEN'));
		}
	});
}

module.exports = {
	name: '%labyrinth',
	aliases: ['%maze'],
	description: 'Maze mini game.',
	ExpandedDesc: undefined,
	execute(prefCommand, message, ytdl, bot, Discord) {

		const PD = ['left', 'right'];
		console.log(prefCommand);

		const CP = [];
		const difficulty = prefCommand[1];
		
		if(!difficulty){
			return message.channel.send('please specify a difficulty\n `%labyrinth <easy || medium || hard>`');
		}
		else if(difficulty === 'easy') {
			Begin(prefCommand, message, ytdl, bot, Discord, CP, PD, 3);
		}
		else if(difficulty === 'medium'){
			Begin(prefCommand, message, ytdl, bot, Discord, CP, PD, 5);
		}
		else if(difficulty === 'hard') {
			Begin(prefCommand, message, ytdl, bot, Discord, CP, PD, 7);
		}
	},
};