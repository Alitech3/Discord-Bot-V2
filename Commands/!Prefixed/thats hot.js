exports.run = (Vargs, voiceChannel, message, ytdl, Discord) => {
    voiceChannel.join()
        .then(connection => { 
			message.react('🔥')
            const stream = ytdl('https://www.youtube.com/watch?v=pbH0Fuv9fCA', { filter : 'audioonly' });

            const dispatcher = connection.playStream(stream,  { seek: 0, volume: 3/10 });

            dispatcher.on('end', () => voiceChannel.leave());

        }).catch(console.error);
    };