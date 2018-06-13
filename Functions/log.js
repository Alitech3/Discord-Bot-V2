module.exports = (type, message, title) => {
	if (!title)title = 'log';
	console.log(`[${type}] [${title}]${message}`);
};
