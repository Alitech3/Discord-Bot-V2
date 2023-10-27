const index = require('../../index.js');
const cleverbot = require('cleverbot-free');
module.exports = {
	name: '%clever',
	aliases: undefined,
	description: 'Clever Bot',
	ExpandedDesc: 'Clever Bot',
	execute(prefCommand, message, ytdl, bot, Discord) {

		let today = Date.now();

		if (today - index.Guild_DB.get(`${message.guild.id}.Clever.lastused`) >= 36000000) {
			index.Guild_DB.set(message.guild.id, {Clever: {lastused:0, convo: []}});
		}

		index.Guild_DB.set(`${message.guild.id}.Clever.lastused`, today);

		prefCommand.splice(0, 1);

		var text = prefCommand.join(' ');

		let Convo = index.Guild_DB.get(`${message.guild.id}.Clever.convo`);

		console.log(Convo);

		cleverbot(text, Convo).then(response => { 
			message.channel.send(response); 
			index.Guild_DB.push(`${message.guild.id}.Clever.convo`, text),
			index.Guild_DB.push(`${message.guild.id}.Clever.convo`, response);
		});
	}
};