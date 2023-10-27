//Original
const { playFile } = require('../../modules/audio');

module.exports = {
	name: 'nani',
	description: ' 50/50 chance for volume warning?',
	// eslint-disable-next-line no-unused-vars
	execute(Command, message, ytdl, bot, Discord, user_interaction) {
		let voiceChannel;
		(!message) ? voiceChannel = user_interaction.member.voice.channel : voiceChannel = message.member.voice.channel;
		if (!message) user_interaction.reply('❓');

		// message.react('❓');
		if (!voiceChannel) {
			return;
		}
		const nani = ['https://www.youtube.com/watch?v=MgPJUWjKBJ00', 'https://www.youtube.com/watch?v=nBjlpnuA89c'];
		const picker = nani[Math.floor(Math.random() * nani.length)];
		const stream = ytdl(picker, { filter: 'audioonly',
			fmt: 'mp3',
			highWaterMark: 1 << 62,
			liveBuffer: 1 << 62,
			dlChunkSize: 0, //disabling chunking is recommended in discord bot
			bitrate: 128,
			quality: 'lowestaudio',
		});

		playFile(voiceChannel, stream, {name: 'nani'});
	},
};