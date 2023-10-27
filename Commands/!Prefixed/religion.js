// Original
return;

module.exports = {
	name: 'religion',
	description: undefined,
	// eslint-disable-next-line no-unused-vars
	execute(Command, message, ytdl, bot, Discord) {
		const voiceChannel = message.member.voice.channel;
		message.react('🙏');
		if (!voiceChannel) {
			return;
		}
		voiceChannel.join()
			.then(connection => {
				if (connection.speaking.has('SPEAKING')) {
					return message.react('❌');
				} else {
					const stream = ytdl('https://www.youtube.com/watch?v=yuQhZDyXyB8', { filter : 'audioonly' });

					const dispatcher = connection.play(stream, { volume: 0.35 });

					dispatcher.on('finish', () => voiceChannel.leave());
				}
			}).catch(error => console.error(error));
	},
};