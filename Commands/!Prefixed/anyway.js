exports.run = async(Vargs, voiceChannel, message, ytdl, Discord) => {
    voiceChannel.join()
        .then(connection => {    

            const dispatcher = connection.playFile('./Audio/Anyway.mp3')

			dispatcher.on('end', () => voiceChannel.leave())

		}).catch(console.error)
};