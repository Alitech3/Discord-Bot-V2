exports.run = async(Vargs, voiceChannel, message, ytdl, Discord) => {
    voiceChannel.join()
        .then(connection => {    

            const dispatcher = connection.playFile('./Audio/Albino.mp3', { volume: 6/10 });

			dispatcher.on('end', () => voiceChannel.leave())

		}).catch(console.error)
};