const Canvas = require('canvas');
module.exports = {
	name: '%canvas',
	aliases: undefined,
	description: 'Edit images. WIP',
	ExpandedDesc: undefined,
	async execute(prefCommand, message, ytdl, bot, Discord) {
		return message.channel.send('WIP');

		let Canvas_Args = message.content.split(' ');
		console.log(Canvas_Args);

		let Image_Attachments = message.attachments.first();

		console.log(Image_Attachments);

		(Image_Attachments) ? Image_Attachments = message.attachments.first().url : Image_Attachments = './Images/Grilled.jpg';

		let Canvas_Width = Number(Canvas_Args[1]);

		let Canvas_Height = Number(Canvas_Args[2]);

		(Canvas_Width > 1501) ? message.channel.send('Please use a width below 1501') : 
			(Canvas_Height > 1501) ? message.channel.send('Please use a height below 1501') : null;

		const canvas = Canvas.createCanvas(Canvas_Width, Canvas_Height);
		const ctx = canvas.getContext('2d');

		// background image loader
		const background = await Canvas.loadImage(Image_Attachments);

		// This uses the canvas dimensions to stretch the image onto the entire canvas
		ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

		// Use helpful Attachment class structure to process the file for you
		const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'I cant believe youve done this.jpeg.png.gif.exe.iso.pdf.png');

		message.channel.send(attachment);
	}
};