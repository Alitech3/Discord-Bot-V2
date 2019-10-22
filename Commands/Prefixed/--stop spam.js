spamCtrl = require('../../spamCtrl.js');
exports.run = (Targs, message, Discord) => {
	spamCtrl.setStatus(false);
	console.log(`spam stopped\nAuthor : ${message.author.username}\nServer : ${message.guild.name}`);
};