exports.run = (Targs, message, Discord) => {

    const testFolder = './Commands/!Prefixed';
    const fs = require('fs');

    fs.readdirSync(testFolder).forEach(file => {
        message.channel.send(file.split('.js'));
      });
};