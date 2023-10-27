// Original
const { playFile } = require('../../modules/audio.js');
module.exports = {
	name: 'asd',
	description: 'AUSSIE! AUSSIE! AUSSIE! OI! OI! OI!',
	// eslint-disable-next-line no-unused-vars
	execute(Command, message, ytdl, bot, Discord, user_interaction) {
		let voiceChannel;
		(!message) ? voiceChannel = user_interaction.member.voice.channel : voiceChannel = message.member.voice.channel;
		if (!message) user_interaction.reply('🤰');
		if (!voiceChannel) {
			return;
		}
		const obama = ['https://www.youtube.com/watch?v=uhY9Zxv1-oo', 'https://www.youtube.com/watch?v=Qp55_8nSz1c'];
		const picker = obama[Math.floor(Math.random() * obama.length)];
		const stream = ytdl(picker, { filter: 'audioonly' });

		playFile(voiceChannel, stream);
	},
};