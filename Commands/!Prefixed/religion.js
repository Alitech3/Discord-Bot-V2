
exports.run = (Vargs, voiceChannel, message, ytdl, Discord) => {
	message.react('🌲');
	if (!voiceChannel) {
		return;
	}
	voiceChannel.join().then(connection => {
		const stream = ytdl('https://www.youtube.com/watch?v=yuQhZDyXyB8', { filter : 'audioonly' });

		const dispatcher = connection.playStream(stream,  { seek: 0, volume: 1.5/10 });
		
		dispatcher.on('end', () => voiceChannel.leave());

	}).catch(console.error);
};