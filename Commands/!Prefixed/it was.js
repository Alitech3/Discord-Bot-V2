exports.run = (Vargs, voiceChannel, message, ytdl, Discord) => {
       voiceChannel.join().then(connection => {
        const stream = ytdl('https://www.youtube.com/watch?v=kc0ZTB0qFyI&feature=youtu.be&t=39');

        const dispatcher = connection.playStream(stream,  { seek: 0, volume: 2.5/10 });

        dispatcher.on('end', () => voiceChannel.leave());
    });
};