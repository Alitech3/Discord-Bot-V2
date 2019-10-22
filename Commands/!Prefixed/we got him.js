exports.run = (Vargs, voiceChannel, message, ytdl, Discord) => {
	voiceChannel.join()
		.then(connection => {
			const dispatcher = connection.playFile('./Audio/We Got Him.mp3', { seek: 0, volume: 0.038 });

			dispatcher.on('end', () => voiceChannel.leave());

		}).catch(console.error);
};