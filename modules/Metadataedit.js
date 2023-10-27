// DONT USE THIS ONE USE BUILD.JS

const PELibrary = require('pe-library');
const ResEdit = require('resedit');
const fs = require('fs');

// load and parse data
let data = fs.readFileSync('./dist/Ascraeus.exe');
// (the Node.js Buffer instance can be specified directly to NtExecutable.from)
let exe = PELibrary.NtExecutable.from(data);
let res = PELibrary.NtExecutableResource.from(exe);

// rewrite resources
// - You can use helper classes as followings:
//   - ResEdit.Resource.IconGroupEntry: access icon resource data
//   - ResEdit.Resource.StringTable: access string resource data
//   - ResEdit.Resource.VersionInfo: access version info data

// -- replace icons

// load icon data from file
// (you can use ResEdit.Data.IconFile to parse icon data)
let iconFile = ResEdit.Data.IconFile.from(fs.readFileSync('./Images/Icon/Ascraeus.ico'));

ResEdit.Resource.IconGroupEntry.replaceIconsForResource(
	// destEntries
	res.entries,
	// iconGroupID
	101,
	// lang ('lang: 1033' means 'en-US')
	1033,
	// icons (map IconFileItem to IconItem/RawIconItem)
	iconFile.icons.map((item) => item.data)
);

// -- replace version

let viList = ResEdit.Resource.VersionInfo.fromEntries(res.entries);
let vi = viList[0];
// setFileVersion will set `vi.fixedInfo.fileVersionMS`/`fileVersionLS` and 'FileVersion' string value
// ('1033' means 'en-US')
vi.setFileVersion(1, 0, 0, 0, 1033);
// ('lang: 1033' means 'en-US', 'codepage: 1200' is the default codepage)
vi.setStringValues(
	{ lang: 1033, codepage: 1200 },
	{
		FileDescription: 'Ascraeus discord bot.',
		ProductName: 'Ascraeus',
	}
);
vi.outputToResourceEntries(res.entries);

// write to another binary
res.outputResource(exe);
let newBinary = exe.generate();
fs.writeFileSync('MyApp_modified.exe', Buffer(newBinary));