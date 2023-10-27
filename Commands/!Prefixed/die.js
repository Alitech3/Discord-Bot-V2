// Original
const { playFile } = require('../../modules/audio.js');
module.exports = {
	name: 'die',
	description: 'I just assumed that eventually over time he would just...',
	// eslint-disable-next-line no-unused-vars
	execute(Command, message, ytdl, bot, Discord, user_interaction) {
		let voiceChannel;
		(!message) ? voiceChannel = user_interaction.member.voice.channel : voiceChannel = message.member.voice.channel;
		// if (!voiceChannel && message) {
		// 	return message.channel.send({ files: ['./Images/die.png'] });
		// }
		// else {
		if (!message) user_interaction.reply('<:die:456523086733508609>');
		if (message) message.react('<:die:456523086733508609>');

		const stream = ytdl('https://www.youtube.com/watch?v=uKwUlAevqGI&ab_channel=skellington15', {
			filter: 'audioonly',
			fmt: 'mp3',
			highWaterMark: 1 << 62,
			liveBuffer: 1 << 62,
			dlChunkSize: 0, //disabling chunking is recommended in discord bot
			bitrate: 128,
			quality: 'lowestaudio',
		});

		playFile(voiceChannel, stream);
		// }
	},
};