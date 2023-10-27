// Isahia
const { playFile } = require('../../modules/audio');

module.exports = {
	name: 'nigga',
	description: 'This command was a request dont crucify me twitter',
	// eslint-disable-next-line no-unused-vars
	execute(Command, message, ytdl, bot, Discord, user_interaction) {
		let voiceChannel;
		(!message) ? voiceChannel = user_interaction.member.voice.channel : voiceChannel = message.member.voice.channel;
		if (!message) user_interaction.reply('🥷🏿');

		// message.react('🥷🏿');
		if (!voiceChannel) {
			return;
		}
		const path = './Audio/GokuN.mp3';

		playFile(voiceChannel, path);
	},
};