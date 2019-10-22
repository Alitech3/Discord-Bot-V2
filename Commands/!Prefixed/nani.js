exports.run = (Vargs, voiceChannel, message, ytdl, Discord) => {
    voiceChannel.join()
        .then(connection => {
            const nani =['https://www.youtube.com/watch?v=MgPJUWjKBJ00', 'https://www.youtube.com/watch?v=nBjlpnuA89c']
            const stream = ytdl(nani[Math.floor(Math.random() * nani.length)], { filter : 'audioonly' });

            const dispatcher = connection.playStream(stream,  { seek: 0, volume: 1/10 });

            dispatcher.on('end', () => voiceChannel.leave());

        }).catch(console.error);
}