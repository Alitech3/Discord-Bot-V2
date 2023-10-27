// Original
return;
module.exports = {
	name: 'bitch',
	description: undefined,
	// eslint-disable-next-line no-unused-vars
	execute(Command, message, ytdl, bot, Discord) {
		const voiceChannel = message.member.voice.channel;
		message.react('🐕‍🦺');
		if (!voiceChannel) {
			return;
		}
		voiceChannel.join()
			.then(connection => {
				if (connection.speaking.has('SPEAKING')) {
					return message.react('❌');
				} else {
					const Like =['./Audio/Like A Bitch.mp3', './Audio/Like A Little Bitch.mp3'];

					const dispatcher = connection.play(Like[Math.floor(Math.random() * Like.length)], { volume: 0.35 });

					dispatcher.on('finish', () => voiceChannel.leave());
				}
			}).catch(error => console.error(error));
	},
};