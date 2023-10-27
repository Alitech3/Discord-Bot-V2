const request = require('snekfetch');
const index = require('../../index.js');

async function mainbody(prefCommand, message, ytdl, bot, Discord) {

	let subreddit = prefCommand[1];

	if (!subreddit) {
		return message.channel.send('sorry that is not a valid reddit page.\n`--reddit <subreddit>`\nexample command use `--reddit peoplefuckingdying`');
	}

	const results = await request.get(`https://www.reddit.com/r/${subreddit}/rising/.json`).catch(() => {
		return;
	});

	if (typeof(results) === 'undefined' || results.body.data.children.length === 0) {
		return message.channel.send('Either that subreddit doesnt exist or it could not be found at this time.');
	}

	let postfilter = results.body.data.children.filter(img => img.data.post_hint === 'image');

	if (postfilter.length === 0) {
		return message.channel.send('There are no valid images to be displayed in this subreddit.');
	}

	let today = Date.now();

	if (today - index.Guild_DB.get(`${message.guild.id}.reddit.lastused`) >= 36000000) {
		index.Guild_DB.set(message.guild.id, {reddit: {subreddit: [], index: [], lastused: 0}});
	}

	let serversubs = await index.Guild_DB.get(`${message.guild.id}.reddit.subreddit`);

	if (!serversubs.includes(subreddit)) {
		await index.Guild_DB.push(`${message.guild.id}.reddit.subreddit`, subreddit);
		await index.Guild_DB.push(`${message.guild.id}.reddit.index`, 0);
		serversubs = await index.Guild_DB.get(`${message.guild.id}.reddit.subreddit`);
	}

	let currentposvalue = await index.Guild_DB.get(`${message.guild.id}.reddit.index[${serversubs.indexOf(subreddit)}]`);

	if (currentposvalue + 1 > postfilter.length) {
		let maxindex = await index.Guild_DB.get(`${message.guild.id}.reddit.index[${serversubs.indexOf(subreddit)}]`);
		await index.Guild_DB.add(`${message.guild.id}.reddit.index[${serversubs.indexOf(subreddit)}]`, (maxindex * -1));
		currentposvalue = await index.Guild_DB.get(`${message.guild.id}.reddit.index[${serversubs.indexOf(subreddit)}]`);
		serversubs = await index.Guild_DB.get(`${message.guild.id}.reddit.subreddit`);
	}

	let postnum = index.Guild_DB.get(`${message.guild.id}.reddit.index[${serversubs.indexOf(subreddit)}]`);

	const post = postfilter[postnum].data;

	const title = post.title.length > 256 ? post.title.slice(0, 256) : post.title;

	const embed = new Discord.MessageEmbed()
		.setTitle(title)
		.setURL(`https://www.reddit.com${post.permalink}`)
		.setImage(post.url)
		.setFooter(`👍 ${post.ups} 💬 ${post.num_comments}\nprotip: you can search for a subreddit just do: --reddit subreddit name`)
		.setColor('RANDOM');

	message.channel.send(embed);

	if (currentposvalue + 1 <= postfilter.length) {
		index.Guild_DB.add(`${message.guild.id}.reddit.index[${serversubs.indexOf(subreddit)}]`, 1);
	}
	index.Guild_DB.set(`${message.guild.id}.reddit.lastused`, today);
}

module.exports = {
	name: '%reddit',
	aliases: undefined,
	description: 'Browse a subreddit.',
	ExpandedDesc: undefined,
	execute(prefCommand, message, ytdl, queue, bot, Discord) {

		mainbody(prefCommand, message, ytdl, queue, bot, Discord);

	},
};