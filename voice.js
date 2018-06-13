if(message.content.startsWith(`${Settings.Prefix}play`)) {
    try {
        const voiceChannel = message.member.voiceChannel;
        const connection = await voiceChannel.join();
        const dispatcher = connection.playStream(ytdl(argsV[1]));
        dispatcher.on('end', () => {
            console.log('song over');
            voiceChannel.leave();

        });
    }
    catch(error) {
        message.channel.send('please use a vaild youtube link');
    }
}
if(message.content === `${Settings.Prefix}dis` || message.content === `${Settings.Prefix}stop`) {
    message.member.voiceChannel.leave();
    /* .then(leave => {
        message.channel.send('`Disconnected`');
    }) */
}