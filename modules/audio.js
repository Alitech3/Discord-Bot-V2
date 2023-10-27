const { joinVoiceChannel, createAudioPlayer, createAudioResource, NoSubscriberBehavior } = require('@discordjs/voice');
const { createReadStream } = require('fs');
const path = require('path');

function playFile(voiceChannel, SoundBite, options) {
	if (!voiceChannel) {
		return;
	}

	if (typeof(SoundBite) == 'string') {
		// Ascreasus/modules/AudioPath
		// '..' steps out
		let SoundBitePath = path.join(__dirname,  '..', SoundBite);

		SoundBite = createReadStream(SoundBitePath);
	}

	const player = createAudioPlayer({ behaviors: NoSubscriberBehavior.Play });
	const resource = createAudioResource(SoundBite, {inlineVolume: true});

	switch (options && options.name) {
		default:
			resource.volume.setVolume(.50);
			break;
		case 'ok':
			resource.volume.setVolume(.35);
			break;
		case 'asd':
			null;
			break;
		case 'bean':
			resource.volume.setVolume(.35);
			break;
		case 'black':
			null;
			break;
		case 'cucumber':
			null;
			break;
		case 'daddy':
			resource.volume.setVolume(.15);
			break;
		case 'die':
			null;
			break;
		case 'sorry':
			resource.volume.setVolume(7.5);
			break;
		case 'flash':
			resource.volume.setVolume(.30);
			break;
		case 'flint':
			resource.volume.setVolume(.35);
			break;
		case 'gabe':
			null;
			break;
		case 'gay':
			resource.volume.setVolume(.35);
			break;
		case 'heresy':
			null;
			break;
		case 'lmao':
			null;
			break;
		case 'marker':
			null;
			break;
		case 'movie':
			null;
			break;
		case 'murder':
			resource.volume.setVolume(.35);
			break;
		case 'nani':
			resource.volume.setVolume(.25);
			break;
		case 'nigga':
			null;
			break;
		case 'orc':
			null;
			break;
		case 'science':
			resource.volume.setVolume(.60);
			break;
		case 'simp':
			null;
			break;
		case 'smile':
			resource.volume.setVolume(.40);
			break;
		case 'hot':
			null;
			break;
		case 'tower':
			resource.volume.setVolume(.75);
			break;
		case 'vayne':
			resource.volume.setVolume(.25);
			break;
		case 'victory':
			null;
			break;
		case 'doing':
			null;
			break;
	}
 
	try {
		const connection = joinVoiceChannel({
			channelId: voiceChannel.id,
			guildId: voiceChannel.guild.id,
			adapterCreator: voiceChannel.guild.voiceAdapterCreator,
		});

		player.play(resource);

		const sub = connection.subscribe(player);

		player.on('stateChange', (o, n) => {
			try{
				if (o.status === 'playing' && n.status === 'idle') {
					connection.disconnect();
				}
			}catch (error) {
				connection.destroy();
				sub.unsubscribe();
			}
		});

		if (sub) {
		// Unsubscribe after 2 mins (stop playing audio on the voice connection)
			setTimeout(() => sub.unsubscribe(), 120_000);
		}
	}catch(e) {
		console.log(e);
	}
}

module.exports = {
	playFile
};