exports.run = (Vargs, voiceChannel, message, ytdl, Discord) => {
    voiceChannel.join()
        .then(connection => {
            const stream = ytdl('https://www.youtube.com/watch?v=b8i921cgWwE&ab_channel=KingVoov', { filter : 'audioonly' });

            const dispatcher = connection.playStream(stream,  { seek: 0, volume: 3/10 });

            dispatcher.on('end', () => voiceChannel.leave());

        }).catch(console.error);
    };