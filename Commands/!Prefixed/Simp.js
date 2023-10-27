// Original
const { playFile } = require('../../modules/audio');

module.exports = {
	name: 'simp',
	description: 'hate to say it but you\'re a',
	// eslint-disable-next-line no-unused-vars
	execute(Command, message, ytdl, bot, Discord, user_interaction) {
		let voiceChannel;
		(!message) ? voiceChannel = user_interaction.member.voice.channel : voiceChannel = message.member.voice.channel;
		if (!message) user_interaction.reply('🥺\n👉👈');

		// message.react('🥺');
		// message.react('👉');
		// message.react('👈');
		if (!voiceChannel) {
			return;
		}
		const stream = ytdl('https://www.youtube.com/watch?v=c3m4Q07TkMk', { filter: 'audioonly',
			fmt: 'mp3',
			highWaterMark: 1 << 62,
			liveBuffer: 1 << 62,
			dlChunkSize: 0, //disabling chunking is recommended in discord bot
			bitrate: 128,
			quality: 'lowestaudio',
		});


		playFile(voiceChannel, stream);
	},
};