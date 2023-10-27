module.exports = {
	name: '%seek',
	aliases: undefined,
	description: 'N/A',
	ExpandedDesc: undefined,
	execute(prefCommand, message, ytdl, bot, Discord) {
		return message.channel.send('broken command.');
		const { voiceChannel } = message.member;
		if (!voiceChannel) {
			return message.channel.send('please join a voice channel');
		}
		const x = message.content.split(' ');
		console.log(x);
		try {
			voiceChannel.join()
				.then(connection => {

					const dispatcher = connection.playStream(ytdl(x[1]));

					dispatcher.on('end', () => { 
						message.channel.send('The audio has finished playing.');
						voiceChannel.leave();
					});
				});
		}
		catch(error) {
			return message.channel.send('please use a vaild youtube link');
		}
	},
};