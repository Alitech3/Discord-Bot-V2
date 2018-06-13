const uptime = 100000000; // 100,000,000

function date(uptime) {
	// day, hours, minutes, seconds, (maybe milliseconds)
	const milliseconds = uptime;
	const seconds = Math.floor(uptime / 1000);
	const minutes = Math.floor(uptime / 60000);
	const hours = Math.floor(uptime / 3600000);
	const days = Math.floor(uptime / 86400000);

	var math = math;

	return `Days ${days} Hours ${hours} Minutes ${minutes} Seconds ${seconds} Milliseconds ${milliseconds}`;
}
const x = 'test';
/*	const uptime = 100000000; // 100,000,000
const milliseconds = uptime;
const seconds = Math.floor(uptime % 1000);
const minutes = Math.floor(seconds / 60);
const hours = Math.floor(minutes / 60);
const days = Math.floor(hours / 24);
*/

(time) => {
	const methods = [
		{ name: 'd', count: 86400 },
		{ name: 'h', count: 3600 },
		{ name: 'm', count: 60 },
		{ name: 's', count: 1 },
	];

	const timeStr = [ Math.floor(time / methods[0].count).toString() + methods[0].name ];
	for (let i = 0; i < 3; i++) {
		timeStr.push(Math.floor(time % methods[i].count / methods[i + 1].count).toString() + methods[i + 1].name);
	}

	return console.log(timeStr.filter(g => !g.startsWith('0')).join(', '));
};
// console.log(date(uptime));

/*
1sec = 1000ms
1min = 60000ms
1h = 3600000ms
1 day = 86400000ms
*/
// have the message edit itself and continue counting for about 10 seconds (potentially)
// must change uptime to mins, secs, etc
//	const uptime = bot.uptime;

