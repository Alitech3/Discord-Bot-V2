const { Exported_Queue } = require('./Play.js');
module.exports = {
	name: '%leave',
	aliases: ['%dis', '%disconnect'],
	description: 'Disconnects bot from the voice channel.',
	ExpandedDesc: undefined,
	// eslint-disable-next-line no-unused-vars
	execute(prefCommand, message, ytdl, bot, Discord) {

		let ServerQueue = Exported_Queue.get(message.guild.id);

		console.log(Exported_Queue);

		console.log(ServerQueue);

		let Guild_Msg_ID = message.guild.id;

		let Connection_Filter = bot.voice.connections.find((VC_Object) => { return VC_Object.voice.channel.guild.id == Guild_Msg_ID; });

		if (!Connection_Filter) {
			return message.channel.send('The bot is currently not connected to any voice channels.');
		}

		Exported_Queue.delete(message.guild.id);
		console.log(ServerQueue);
		Connection_Filter.disconnect();
	}
};