exports.run = (Vargs, voiceChannel, message, ytdl, Discord) => {
message.react('🔪');
	voiceChannel.join()
        .then(connection => {
            const dispatcher = connection.playFile('./Audio/Murder.mp3', { volume: 6/10 });

            dispatcher.on('end', () => voiceChannel.leave());

        }).catch(console.error);
};