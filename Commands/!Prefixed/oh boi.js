exports.run = (Vargs, voiceChannel, message, ytdl, Discord) => {
         voiceChannel.join()
            .then(connection => {
                const stream = ytdl('https://www.youtube.com/watch?v=-IYwc84hMZc', { filter : 'audioonly' });

                const dispatcher = connection.playStream(stream,  { seek: 0, volume: 5/10 });

                dispatcher.on('end', () => voiceChannel.leave());
            }).catch(console.error);
    };