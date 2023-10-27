// this code breaks down after a second skip and then crashes the program on a third
module.exports = {
	name: '%skip',
	aliases: undefined,
	description: 'Skip the current song',
	ExpandedDesc: undefined,
	// eslint-disable-next-line no-unused-vars
	execute(prefCommand, message, ytdl, bot, Discord) {
		let Guild_Msg_ID = message.guild.id;
		const voiceChannel = message.member.voice.channel;
		let Connection_Filter = bot.voice.connections.find((VC_Object) => { return VC_Object.voice.channel.guild.id == Guild_Msg_ID; });

		if (!voiceChannel) {
			return message.channel.send('please join a voice channel');
		}
		if (!Connection_Filter) {
			return message.channel.send('There is nothing playing.');
		}
		try {
			Connection_Filter.dispatcher.end();
			message.channel.send('Song has been skippped.');
		}
		catch (error) {
			message.channel.send('sorry an error has occurred attempting to play the next song');
		}
	}
};