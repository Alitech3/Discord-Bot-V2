/*
exports.run = (Targs, message, Discord) => {
    try {
        const voiceChannel = message.member.voiceChannel;
        const connection = await voiceChannel.join();
        const dispatcher = connection.playStream(ytdl(Targs[1]));
        dispatcher.on('end', () => {
            console.log('song over');
            voiceChannel.leave();

        });
    }
    catch(error) {
        message.channel.send('please use a vaild youtube link');
    }
};
*/