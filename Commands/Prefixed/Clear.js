const { Exported_Queue } = require('./Play.js');
module.exports = {
	name: '%clear',
	aliases: undefined,
	description: 'Clear the song queue',
	ExpandedDesc: undefined,
	// eslint-disable-next-line no-unused-vars
	execute(prefCommand, message, ytdl, bot, Discord) {
		const ServerQueue = Exported_Queue.get(message.guild.id);
		if (!ServerQueue) return message.channel.send('there is no queue to clear');
		ServerQueue.songs = [];
		message.channel.send('The queue has been cleared.');
	}
};