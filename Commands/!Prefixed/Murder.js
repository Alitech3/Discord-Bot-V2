// Original
const { playFile } = require('../../modules/audio');

module.exports = {
	name: 'murder',
	description: 'what happened?',
	// eslint-disable-next-line no-unused-vars
	execute(Command, message, ytdl, bot, Discord, user_interaction) {
		let voiceChannel;
		(!message) ? voiceChannel = user_interaction.member.voice.channel : voiceChannel = message.member.voice.channel;
		if (!message) user_interaction.reply('🔪');

		// message.react('🔪');
		if (!voiceChannel) {
			return;
		}
		const path = './Audio/Murder.mp3';

		playFile(voiceChannel, path, {name: 'murder'});
	},
};