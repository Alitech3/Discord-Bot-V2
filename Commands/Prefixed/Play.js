// this file can be overhauled
// https://gabrieltanner.org/blog/dicord-music-bot
const ytsr = require('ytsr');

const Queues = new Map();

function songPlayer(Gid, songs) {
	const Server = Queues.get(Gid);
	if (!songs) {
		Server.voicechannel.leave();
		Queues.delete(Gid);
		return;
	}
	const dispatcher = Server.connection.play(songs)
		.on('finish', () => {
			Server.songs.shift();
			// Server.textchannel.send('playing new song');
			songPlayer(Gid, Server.songs[0]);
		});
	dispatcher.setVolume(Server.volume / 5);
}

module.exports = {
	name: '%play',
	aliases: ['%p'],
	description: 'N/A',
	ExpandedDesc: undefined,
	Exported_Queue: Queues,
	// eslint-disable-next-line no-unused-vars
	async execute(prefCommand, message, ytdl, bot, Discord) {

		let y = message.content.split(' ');
		let x = y[1];

		const voiceChannel = message.member.voice.channel;

		if (!voiceChannel) return message.channel.send('please join a voice channel');
		if (typeof(x) === 'undefined') return message.channel.send('please add a valid youtube link');

		// search the string on youtube
		const results = await ytsr(message.content.slice(6), {limit: 1});

		console.log(results);

		// discriminates between a URL or the first option from the above search
		// if a channel is the first option it will throw an uncaught error
		(x.includes('youtu')) ? x = ytdl(x, {filter: 'audioonly', quality: 'lowestaudio', requestOptions: 'title' }) : x = ytdl(results.items[0].url, {filter: 'audioonly', quality: 'lowestaudio'});

		const ServerQueue = Queues.get(message.guild.id);

		if (!ServerQueue) {
			const QueueConstructor = {
				textchannel: message.channel,
				voicechannel: voiceChannel,
				connection: null,
				songs: [],
				volume: 5
			};

			QueueConstructor.songs.push(x);
			Queues.set(message.guild.id, QueueConstructor);

			try {
				const VCconnection = await voiceChannel.join();
				QueueConstructor.connection = VCconnection;

				// message.channel.send({embed: {title: 'Now Playing:', description: results.items[0].title, thumbnail: { url: results.items[0].thumbnails[0].url}, url: results.items[0].url, color: [Math.floor(Math.random()*255), Math.floor(Math.random()*255), Math.floor(Math.random()*255)] }});
				message.channel.send('Playing Song');
				songPlayer(message.guild.id, QueueConstructor.songs[0]);
			} catch (error) {
				console.log(error);
				Queues.delete(message.guild.id);
				message.channel.send('sorry an error has occured');
			}
		} else {
			ServerQueue.songs.push(x);
			// need to make this more detailed
			message.channel.send(`Added song to queue position: ${ServerQueue.songs.length}`);
		}
	},
};