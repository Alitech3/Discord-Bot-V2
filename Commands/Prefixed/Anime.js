// const request = require('snekfetch');
// const db = require('quick.db');

// async function mainbody(prefCommand, message, ytdl, bot, Discord) {
// 	let anime = prefCommand.splice(1, prefCommand.length).join(' ');
// 	console.log(anime);

// 	if (!anime) {
// 		return message.channel.send('sorry that is not a valid reddit page.\n`%reddit <subreddit>`\nexample command use `%reddit peoplefuckingdying`');
// 	}

// 	const results = await request.get(`https://myanimelist.net/anime.php?q=${anime}`).catch(() => {
// 		return;
// 	});

// 	console.log(results);

// }

module.exports = {
	name: '%anime',
	aliases: undefined,
	description: 'WIP',
	ExpandedDesc: undefined,
	execute(prefCommand, message, ytdl, bot, Discord) {
		return message.channel.send('WIP');
		mainbody(prefCommand, message, ytdl, bot, Discord);

	},
};