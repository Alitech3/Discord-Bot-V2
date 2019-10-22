exports.run = (Vargs, voiceChannel, message, ytdl, Discord) => {
	voiceChannel.join()
	   .then(connection => {
		   const stream = ytdl('https://www.youtube.com/watch?v=3sIYe74sczE', { filter : 'audioonly' });

		   const dispatcher = connection.playStream(stream,  {volume: 1 });

		   dispatcher.on('end', () => voiceChannel.leave());
	   }).catch(console.error);
};