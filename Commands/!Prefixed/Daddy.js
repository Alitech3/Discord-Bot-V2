// Donny, Original
const { playFile } = require('../../modules/audio.js');

module.exports = {
	name: 'daddy',
	description: '😉',
	// eslint-disable-next-line no-unused-vars
	execute(Command, message, ytdl, bot, Discord, user_interaction) {
		let voiceChannel;
		(!message) ? voiceChannel = user_interaction.member.voice.channel : voiceChannel = message.member.voice.channel;
		if (!message) user_interaction.reply('<:thanosdaddy:680604785694867479>');
		
		// message.react('<:thanosdaddy:680604785694867479>');
		if(!voiceChannel) {
			return;
		}
		const path = './Audio/oh daddy.mp3';

		playFile(voiceChannel, path, {name: 'daddy'});
	},
};