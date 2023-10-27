// Original
const { playFile } = require('../../modules/audio.js');

module.exports = {
	name: 'cucumber',
	description: 'cum',
	// eslint-disable-next-line no-unused-vars
	execute(Command, message, ytdl, bot, Discord, user_interaction) {
		let voiceChannel;
		(!message) ? voiceChannel = user_interaction.member.voice.channel : voiceChannel = message.member.voice.channel;
		if (!message) user_interaction.reply('🥒');

		// message.react('🥒');
		if (!voiceChannel) {
			return;
		}
		const Cum =['./Audio/cucumber.mp3', './Audio/Cucumba But not so nice.mp3'];

		const path = Cum[Math.floor(Math.random() * Cum.length)];

		playFile(voiceChannel, path);
	},
};
