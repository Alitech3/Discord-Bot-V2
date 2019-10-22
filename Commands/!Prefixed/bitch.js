exports.run = async(Vargs, voiceChannel, message, ytdl, Discord) => {
    voiceChannel.join()
        .then(connection => {    
            const Like =['./Audio/Like A Bitch.mp3', './Audio/Like A Little Bitch.mp3'];

            const dispatcher = connection.playFile(Like[Math.floor(Math.random() * Like.length)]);

			dispatcher.on('end', () => voiceChannel.leave())

		}).catch(console.error)
};