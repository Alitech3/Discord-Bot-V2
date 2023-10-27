const { Exported_Queue } = require('./Play.js');
module.exports = {
	name: '%queue',
	aliases: undefined,
	description: 'View the song queue',
	ExpandedDesc: '¯\\_(ツ)_/¯ doesnt work properly',
	// eslint-disable-next-line no-unused-vars
	execute(prefCommand, message, ytdl, bot, Discord) {
		const ServerQueue = Exported_Queue.get(message.guild.id);
		if (!ServerQueue) return message.channel.send('there is no queue to display');
		message.channel.send('sorry this command doesnt work properly yell at me if you actually want me to fix it.\n\nwas too lazy to properly implement it ¯\\_(ツ)_/¯');
		// message.channel.send(ServerQueue.songs.join(', '));
	}
};