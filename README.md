# udpmultiplexer
Streams data from stdin to any number of UDP server processes *(specified by Hostname & Port)*

## Installation
`npm install -g udpmultiplexer`

## Usage
    Usage: udpmultiplexer [options]
    
    Options:
    
    -h, --help                  output usage information
    -V, --version               output the version number
    -s, --servers <items>       specify a list of UDP servers to multiplex the stdin to
    -sf, --servers_file <file>  specify the file that contains a list of servers (either a JSON file or a file with a comma seperated list)
    -p, --packet_size <n>       specify the packet size. Defaults to 10

### Example
`$udpmultiplexer -s localhost:8000,localhost:9000`