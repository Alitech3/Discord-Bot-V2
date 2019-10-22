exports.run = (Vargs, voiceChannel, message, ytdl, Discord) => {
	voiceChannel.join().then(connection => {
	message.react('💳')
	 const stream = ytdl('https://youtu.be/kQ64X4XTVq8');

	 const dispatcher = connection.playStream(stream,  { seek: 0, volume: 2.5/10 });

	 dispatcher.on('end', () => voiceChannel.leave());
 });
};