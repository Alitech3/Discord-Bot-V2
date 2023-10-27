module.exports = {
	name: '%icon',
	aliases: undefined,
	description: 'Change the icon of the server.',
	ExpandedDesc: 'Change the icon of the server. (this command only works for one server currently), (this command works in the bots dm\'s)',
	// eslint-disable-next-line no-unused-vars
	execute(prefCommand, message, ytdl, bot, Discord) {

		// let NewAvatar = prefCommand[1];

		let NewAvatar = message.content.split(/ +/)[1];

		if (typeof(prefCommand[1]) === 'undefined') {
			if (message.attachments.array().length === 0) {
				return message.channel.send('Please use a valid image.');
			} else {
				NewAvatar = message.attachments.array()[0].url;
				return bot.guilds.cache.get('455764570829488128').setIcon(NewAvatar)
					.then(user => message.channel.send('Server Icon set (probably) - Keep in mind you cant change icons too fast so it may not show up right away'))
					.catch(error => { message.channel.send('Sorry an error has occured. \n No valid attachment was found. - if this error persists contact Alitech#0625 or this bot with the message: *"INVALID IMAGE: <IMAGE URL/IMAGE ATTACHMENT>"*'), console.log(error); });
			}
		} else {
			return bot.guilds.cache.get('455764570829488128').setIcon(NewAvatar)
				.then(user => message.channel.send('Server Icon set (probably) - Keep in mind you cant change icons too fast so it may not show up right away'))
				.catch(error => { message.channel.send('Sorry an error has occured. \n Try uploading the image or a different URL'), console.log(error); } );
		}
	}
};