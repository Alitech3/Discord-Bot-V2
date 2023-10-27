// To Do:s
// Bind Channel - store only id in db and then fetch it when this command is being used
// restart function - need admin perms or server owner
// Types
// probably use classes

// const { Guild_DB } = require('../../index.js');

// class Dog { }
// class Cat { }
// 

module.exports = {
	name: '%tamagotchi',
	aliases: ['%pet'],
	description: 'WIP',
	ExpandedDesc: undefined,
	async execute(prefCommand, message, ytdl, bot, Discord) {
		return message.channel.send('this command is not functional');
		console.log(prefCommand);

		/*
		if (!Guild_DB.get(`${message.guild.id}.Tamagotchi.Bounded`) && prefCommand[1] !== 'bind') {
			return message.channel.send('please bind the Tamagotchi to a text channel. `%pet bind`');
		}
		*/

		if (prefCommand[1] === 'bind') {
			return message.channel.send(`Tamagotchi binded to ${message.channel.name} \n \`%pet unbind\` to unbind from a text channel`);
			// Guild_DB.set(`${message.guild.id}.Tamagotchi.Bounded`, message.channel.id);
		}
		if (prefCommand[1] === 'unbind') {
			// Need to test
			return message.channel.send(`Tamagotchi unbounded from ${bot.channel.cache.get(Guild_DB.get(`${message.guild.id}.Tamagotchi.Bounded`).name)}`);
		}

		if (prefCommand[1] === 'start') {

			const EmbedStart = new Discord.MessageEmbed()
				.setTitle('New Game')
				.setDescription('Please type the name of your new pet')
				.setColor('GREEN');

			let Sent_Embed = await message.channel.send(EmbedStart);

			// 
			message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, time: 10000, errors: ['time'] })
				.then(collected => {
					Guild_DB.set(`${message.guild.id}.Tamagotchi.Name`, collected.first().content);

					const Gender = ['Male', 'Female', 'Alfred'];

					let TamaGender = Gender[Math.floor(Math.random() * Gender.length)];
					// set the gender of the tamagotchi
					Guild_DB.set(`${message.guild.id}.Tamagotchi.Gender`, TamaGender);

					// type of tamagotchi code goes here (need to figure out a way to do this) may want to use a constructor for each type

					// set the health to max
					Guild_DB.add(`${message.guild.id}.Tamagotchi.Health`, 300);

					// set the weight
					let weight = Math.floor(Math.random() * 10) + 5;
					Guild_DB.add(`${message.guild.id}.Tamagotchi.Weight`, weight);

					// set the hunger to max
					Guild_DB.add(`${message.guild.id}.Tamagotchi.Hunger`, 100);

					// set happiness to max
					Guild_DB.add(`${message.guild.id}.Tamagotchi.Happy`, 100);

					// set incarnation
					Guild_DB.add(`${message.guild.id}.Tamagotchi.Reincarnation`, 1);

					//need to get thumbnails for the pet type
					let embed = new Discord.MessageEmbed()
					// .setThumbnail('')
						.setDescription('Congrats on your new Tamagotchi!')
						.addField('Name', Guild_DB.get(`${message.guild.id}.Tamagotchi.Name`), true)
						.addField('Type', 'Digimon'/*Guild_DB.get(`${message.guild.id}.Tamagotchi.Type`)*/, true);
					//.addField('Age', Guild_DB.get(`${message.guild.id}.Tamagotchi.Name`), true)
					message.channel.send(embed);

				})
				.catch((error) => {
					console.log(error);
					return Sent_Embed.edit(EmbedStart.setDescription('You Took too long to name your pet please type `%pet start` to start the game again').setColor('GREY'));
				});
		}
	}
};