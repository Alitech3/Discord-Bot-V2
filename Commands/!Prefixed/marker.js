exports.run = (Vargs, voiceChannel, message, ytdl, Discord) => {
    voiceChannel.join()
        .then(connection => {
            const dispatcher = connection.playFile('./Audio/Marker.mp3', { seek: 0, volume: 2.5/10});

            dispatcher.on('end', () => voiceChannel.leave());

        }).catch(console.error);
};