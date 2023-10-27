/*
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
*/
module.exports = {
	name: 'brazil',
	description: undefined,
	// eslint-disable-next-line no-unused-vars
	execute(Command, message, ytdl, bot, Discord) {
	// broke due to socket hang up
		message.react('<:AKU:783526466561638460>');

		let Brazil = bot.guilds.cache.get('455764744217821194').channels.cache.get('644383730802229258');

		Brazil.join().then(connection => {
			// const Throat = ['https://www.youtube.com/watch?v=RSPYL7vu-Dg', 'https://www.youtube.com/watch?v=gPN4ImIoVm0']
			// Throat[Math.floor(Math.random() * Throat.length)]
			// https://www.youtube.com/watch?v=M3emJNkMmnA

			function play(connection) {
				var Throat = ['https://www.youtube.com/watch?v=RSPYL7vu-Dg', 'https://www.youtube.com/watch?v=gPN4ImIoVm0'];
				var stream = ytdl(Throat[Math.floor(Math.random() * Throat.length)], { filter : 'audioonly' });
				var dispatcher = connection.play(stream);
				dispatcher.on('finish', () => {play(connection); console.count('Played');});
				dispatcher.on('error', error => {play(connection); console.count('Played Error');});
			}

			play(connection);
		});
	}
};