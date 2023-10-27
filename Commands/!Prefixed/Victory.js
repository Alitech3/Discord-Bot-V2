// Original
const { playFile } = require('../../modules/audio');

module.exports = {
	name: 'victory',
	description: 'idk ask him not me',
	// eslint-disable-next-line no-unused-vars
	execute(Command, message, ytdl, bot, Discord, user_interaction) {
		let voiceChannel;
		(!message) ? voiceChannel = user_interaction.member.voice.channel : voiceChannel = message.member.voice.channel;
		if (!message) user_interaction.reply('<:Bigchungus:680606642567381128>');

		// message.react('<:Bigchungus:680606642567381128>');
		if (!voiceChannel) {
			return;
		}
		const path = './Audio/Victory.mp3';

		playFile(voiceChannel, path);
	},
};