exports.run = (Vargs, voiceChannel, message, ytdl, Discord) => {
    if (!voiceChannel) {
        return message.channel.send({ files: ['./Images/die.png'] });
    }
    else {
        message.react(':die:456523086733508609');
         voiceChannel.join()
            .then(connection => {
                const stream = ytdl('https://www.youtube.com/watch?v=uKwUlAevqGI&ab_channel=skellington15', { filter : 'audioonly' });

                const dispatcher = connection.playStream(stream,  { seek: 0, volume: 5/10 });

                dispatcher.on('end', () => voiceChannel.leave());
            }).catch(console.error);
    }
};