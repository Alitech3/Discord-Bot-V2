module.exports = {
	name: '%call',
	aliases: ['%notify'],
	description: 'opt in/out of Voice Chat notifications',
	ExpandedDesc: 'Be notified when 3 or more people are in a voice channel.',
	// eslint-disable-next-line no-unused-vars
	execute(prefCommand, message, ytdl, bot, Discord) {

		return;

		const Add_or_remove = prefCommand[1];

		if(!bot.guilds.cache.get(message.guild.id).roles.cache.find(n => n.name == 'Call Notify')) {
			return;
		}

		if (Add_or_remove === 'add') {
			// add role here
			if (message.member.roles.cache.some(role => role.name === 'Call Notify')) {
				return message.channel.send('You already have the `Call Notify` role.');
			}
			message.member.roles.add(bot.guilds.get(message.guild.id).roles.cache.find(n => n.name == 'Call Notify').id);
			message.channel.send('You now have the `Call Notify` role and will be notified when there are 3 or more people in the voice chat.');
		}
		else if (Add_or_remove === 'remove') {
			// remove role here
			if (!message.member.roles.cache.some(role => role.name === 'Call Notify')) {
				return message.channel.send('You do not have the `Call Notify` role.');
			}
			message.member.roles.remove(bot.guilds.get(message.guild.id).roles.cache.find(n => n.name == 'Call Notify').id);
			message.channel.send('You no longer have the `Call Notify` role and will no longer be notified when people are in the voice chat.');
		}
		else {
			message.channel.send('please specify `add` or `remove`\nEX: `%call add`.');
		}
	}
};