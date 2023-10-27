const exe = require('@angablue/exe');

const build = exe({
	entry: 'package.json',
	out: './dist/Ascreaus.exe',
	// pkg: [], // Specify extra pkg arguments
	version: '2.6.0',
	target: 'latest-win-x64',
	icon: './Images/Icon/Ascraeus.ico', // Application icons must be in .ico format
	properties: {
		FileDescription: 'Ascraeus discord bot\nversion 2.8.0',
		ProductName: 'Ascreaus',
		LegalCopyright: 'Ali Chapman',
		OriginalFilename: 'Ascraeus.exe'
	}
});

build.then(() => console.log('Build completed!'));