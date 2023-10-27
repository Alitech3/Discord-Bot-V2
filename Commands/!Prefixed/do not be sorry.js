// Original
const { playFile } = require('../../modules/audio.js');
module.exports = {
	name: 'sorry',
	description: 'boy',
	// eslint-disable-next-line no-unused-vars
	execute(Command, message, ytdl, bot, Discord, user_interaction) {
		let voiceChannel;
		(!message) ? voiceChannel = user_interaction.member.voice.channel : voiceChannel = message.member.voice.channel;
		if (!message) user_interaction.reply('👹');
		// message.react('👹');
		if (!voiceChannel) {
			return;
		}
		const stream = ytdl('https://www.youtube.com/watch?v=p0YNU1bSRoM', { filter: 'audioonly',
			fmt: 'mp3',
			highWaterMark: 1 << 62,
			liveBuffer: 1 << 62,
			dlChunkSize: 0, //disabling chunking is recommended in discord bot
			bitrate: 128,
			quality: 'lowestaudio',
		});

		playFile(voiceChannel, stream, {name: 'sorry'});
	},
};