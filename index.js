var packageInfo = require('./package.json');
var program     = require('commander');
var fs          = require('fs');
var udpBlast    = require('udp-blast');

var DEFAULT_PACKET_SIZE = 10;

var servers = [];
var packetSize = DEFAULT_PACKET_SIZE;

function setServers(serverList) {
	servers = serverList
		.replace(' ', '')
		.split(',');
}

function setServersFromFile(serversFilepath) {
	if (serversFilepath.indexOf('.json') > 0) {
		// It's a JSON file
		servers = require(serversFilepath);
	} else {
		var serverList = String(fs.readFileSync(serversFilepath));
		setServers(serverList);
	}
}

function setPacketSize(inputPacketSize) {
	packetSize = inputPacketSize;
}

program
	.version(packageInfo.version)
	.option('-s, --servers <items>', 'specify a list of UDP servers to multiplex the stdin to', setServers, [])
	.option('-sf, --servers_file <file>', 'specify the file that contains a list of servers (either a JSON file or a file with a comma seperated list)', setServersFromFile)
	.option('-p, --packet_size <n>', 'specify the packet size. Defaults to ' + DEFAULT_PACKET_SIZE, setPacketSize, DEFAULT_PACKET_SIZE)
	.parse(process.argv);

// Convert servers string array into objects
servers = servers.map(function (serverStr) {
	var tokens = serverStr.split(':');
	return {
		host: tokens[0],
		port: parseInt(tokens[1])
	};
});

var serverStreams = servers.map(function (serverDest) {
	return new udpBlast(serverDest, {
		packetSize: packetSize
	});
});

serverStreams.forEach(function (serverStream) {
	process.stdin.pipe(serverStream);
});