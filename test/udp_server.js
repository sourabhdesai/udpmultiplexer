function randomPort() {
	var MIN_PORT = 1024;
	var MAX_PORT = 49151;
	var range = MAX_PORT - MIN_PORT;

	return MIN_PORT + Math.floor(Math.random() * range);
}

var PORT = process.argv[2] ? parseInt(process.argv[2]) : randomPort();
var HOST = '127.0.0.1';

var dgram = require('dgram');
var server = dgram.createSocket('udp4');

server.on('listening', function () {
    var address = server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

server.on('message', function (message, remote) {
    console.log(remote.address + ':' + remote.port +' - ' + message);

});

server.bind(PORT, HOST);