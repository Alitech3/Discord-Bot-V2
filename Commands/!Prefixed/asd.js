exports.run = (Vargs, voiceChannel, message, ytdl, Discord) => {
	voiceChannel.join().then(connection => {
		const stream = ytdl('https://www.youtube.com/watch?v=Qp55_8nSz1c');

		const dispatcher = connection.playStream(stream,  { seek: 0, volume: 4/10 });

		dispatcher.on('end', () => voiceChannel.leave());
		
	}).catch(console.error);
};