exports.run = (Vargs, voiceChannel, message, ytdl, Discord) => {
			message.react('🌲');
			if (!voiceChannel) {
				return;
			}
			voiceChannel.join().then(connection => {
				const stream = ytdl('https://www.youtube.com/watch?v=g4Gj5sGnXS8&ab_channel=SpeedingBlurrZ', { filter : 'audioonly' });

				const dispatcher = connection.playStream(stream,  { seek: 0, volume: 1.5/10 });
				
				dispatcher.on('end', () => voiceChannel.leave());

			}).catch(console.error);
		};