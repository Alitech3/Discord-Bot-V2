module.exports = {
	name: '%eval',
	aliases: undefined,
	description: 'no.',
	ExpandedDesc: 'no again.',
	// eslint-disable-next-line no-unused-vars
	execute(prefCommand, message, ytdl, bot, Discord) {
		if(message.author.id != '264227830953541632'){
			return;
		}

		const index = require('../../index.js');

		// Reset a users xp (set to sak right now)
		// console.log(index.VcUsers.set('237432005502042132.VoiceTimeXP', 90000));

		let evaluate = message.content.split('%eval').pop();
		if(message.author.id == '264227830953541632'){
			message.channel.send('Completed:' + eval(evaluate));
		}
		else {
			message.channel.send('no');
		}
	}
};