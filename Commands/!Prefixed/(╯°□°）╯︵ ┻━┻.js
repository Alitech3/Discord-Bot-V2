// Original
return;
module.exports = {
	name: '(╯°□°）╯︵ ┻━┻',
	description: 'ANARCHY?',
	// eslint-disable-next-line no-unused-vars
	execute(Command, message, ytdl, bot, Discord) {
		const items = ['We do NOT throw tables in this server. We are civilized people!\n┬─┬﻿ ノ( ゜-゜ノ)', 'FLIP ALL OF THE TABLES!\n (ﾉಥ益ಥ）ﾉ﻿ ┻━┻', 'FLIP EVERYTHING! EVEN THE COMPUTERS!\n\n (ノÒ益Ó)ノ彡▔▔▏\n\n ┻━┻ ︵ヽ(`Д´)ﾉ︵﻿ ┻━┻'];
		message.channel.send(items[Math.floor(Math.random() * items.length)]);
	},
};
