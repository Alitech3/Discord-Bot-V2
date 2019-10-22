exports.run = (Vargs, voiceChannel, message, ytdl, Discord) => {
    if (!voiceChannel) {
        return;
    }
    voiceChannel.join().then(connection => {
        const stream = ytdl('https://www.youtube.com/watch?v=54xKGTgbW9A', { filter : 'audioonly' });

        const dispatcher = connection.playStream(stream,  { seek: 0, volume: 2/10 });

        dispatcher.on('end', () => voiceChannel.leave());

    }).catch(console.error);
};