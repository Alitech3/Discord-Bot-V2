spamCtrl = require('../../spamCtrl.js');
exports.run = (Targs, message, Discord) => {
		if (message.author.bot) {
			return;
		} else {
		spamCtrl.setChannel(message.channel);
		spamCtrl.setStatus(true);
		console.log(`spam started\nAuthor : ${message.author.username}\nServer : ${message.guild.name}`);
	}
};

