module.exports = {
	name: '%set',
	aliases: undefined,
	description: 'Set the profile picture of this bot.',
	ExpandedDesc: 'Set the profile picture of this bot. (this command works in the bots dm\'s)',
	// eslint-disable-next-line no-unused-vars
	execute(prefCommand, message, ytdl, bot, Discord) {

		let NewAvatar = message.content.split(/ +/)[1];

		if (typeof(prefCommand[1]) === 'undefined') {
			if (message.attachments.array().length === 0) {
				return message.channel.send('Please use a valid image.');
			} else {
				NewAvatar = message.attachments.array()[0].url;
				return bot.user.setAvatar(NewAvatar)
					.then(user => message.channel.send('Avatar set (probably) - Keep in mind you cant change avatars to fast so it may not show up right away'))
					.catch(error => message.channel.send('Sorry an error has occured. \n No valid attachment was found. - if this error persists contact Alitech#0625 or this bot with the message: *"INVALID IMAGE: <IMAGE URL/IMAGE ATTACHMENT>"*'));
			}
		} else {
			return bot.user.setAvatar(NewAvatar)
				.then(user => message.channel.send('Avatar set (probably) - Keep in mind you cant change avatars to fast so it may not show up right away'))
				.catch(error =>  message.channel.send('Sorry an error has occured. \n Try uploading the image or a different URL'));
		}
	}
};