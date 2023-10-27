// Original
return;
module.exports = {
	name: 'believe',
	description: undefined,
	// eslint-disable-next-line no-unused-vars
	execute(Command, message, ytdl, bot, Discord) {
		const voiceChannel = message.member.voice.channel;
		// message.react('🙏');
		if (!voiceChannel) {
			return;
		}
		voiceChannel.join()
			.then(connection => {
				if (connection.speaking.has('SPEAKING')) {
					return message.react('❌');
				} else {
					const believe = ['https://www.youtube.com/watch?v=GV2wzNQ0JnQ', 'https://www.youtube.com/watch?v=XU6fWOtjEYY'];
					const stream = ytdl(believe[Math.floor(Math.random() * believe.length)], { filter : 'audioonly' });

					const dispatcher = connection.play(stream,  { seek: 7, volume: 0.35 });

					dispatcher.on('finish', () => voiceChannel.leave());
				}
			}).catch(error => console.error(error));
	},
};