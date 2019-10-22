exports.run = () => { if (message.content.startsWith('bypass')) {
	const bypassing = message.content.split(' &&& ');

	Vargs = require(`./Commands/!Prefixed/${bypassing[2]}.js`);;
	voiceChannel = bot.channels.get(bypassing[1])

	Vargs.run(Vargs, voiceChannel, message, ytdl, Discord);
    }
}