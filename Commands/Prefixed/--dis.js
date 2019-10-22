exports.run = (Targs, message, Discord) => {
    message.member.voiceChannel.leave();
    /* .then(leave => {
        message.channel.send('`Disconnected`');
    }) */
};