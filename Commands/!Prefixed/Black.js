// Original
const { playFile } = require('../../modules/audio.js');

module.exports = {
	name: 'black',
	description: 'run. hes coming...',
	// eslint-disable-next-line no-unused-vars
	execute(Command, message, ytdl, bot, Discord, user_interaction) {
		let voiceChannel;
		(!message) ? voiceChannel = user_interaction.member.voice.channel : voiceChannel = message.member.voice.channel;
		if (!message) user_interaction.reply('🃏');

		// message.react('🃏');
		if (!voiceChannel) {
			return;
		}
		const path = './Audio/Black.mp3';

		playFile(voiceChannel, path);
	},
};