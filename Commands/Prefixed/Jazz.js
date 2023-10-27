module.exports = {
	name: '%jazz',
	aliases: ['%radio'],
	description: 'Play jazz from the radio 24/7.',
	ExpandedDesc: 'Play radio jazz. (Uses a radio station based in Louisiana)',
	// eslint-disable-next-line no-unused-vars
	execute(prefCommand, message, ytdl, bot, Discord) {

		// swap to broadcast
		// full list of radio channels: https://tektite.streamguys1.com:5145
		// probably

		let URL = prefCommand[1];

		if (!URL) URL = 'https://tektite.streamguys1.com:5145/wwnojazz';

		const voiceChannel = message.member.voice.channel;

		if (!voiceChannel) {
			return message.channel.send('please join a voice channel');
		}
		try {
			voiceChannel.join().then(connection => {
				connection.play(URL, { volume: 0.25 });
			}).catch(error => console.error(error));
		}
		catch (error) {
			console.log(error);
		}
	}
};