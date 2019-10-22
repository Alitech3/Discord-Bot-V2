exports.run = (Vargs, voiceChannel, message, ytdl, Discord) => {
         voiceChannel.join()
            .then(connection => {
                const stream = ytdl('https://www.youtube.com/watch?v=Mwf3EPnusVQ', { filter : 'audioonly' });

                const dispatcher = connection.playStream(stream,  { seek: 22, volume: 1 });

                dispatcher.on('end', () => voiceChannel.leave());
            }).catch(console.error);
};
