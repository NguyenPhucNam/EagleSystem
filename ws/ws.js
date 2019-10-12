const WebSocket = require('ws');
const urlParse = require('url');
const config = require('../config/config');
const RTSP_Stream = require('../utils/ffmpegUtils');

exports.init = (server) => {
    const wss = new WebSocket.Server({server, ...config});

    const duplex = WebSocket.createWebSocketStream(wss, { encoding: 'utf8' });
 
    duplex.pipe(process.stdout);
    process.stdin.pipe(duplex);

    wss.on('connection', function connection(ws, req) {

        const { url } = urlParse.parse(req.url, true).query;

        ws.isAlive = true;
        ws.on('pong', heartbeat);

        ws.on('open', function open() {
            console.log('something');
            // ws.send('something');
        });
    
        ws.on('message', function incoming(message) {
            if (ws.readyState === WebSocket.OPEN) {
                console.log('success');
                // ws.send('success');
            }
        });

        if(url) {
            console.log(url);
            const runStream = formatRTSP_to_StreamBinary(url, ws);
            runStream.on('camdata', (data) => (ws.readyState===WebSocket.OPEN) && ws.send(data));
        } else {
            console.log(url);
        }
        
        ws.on('close', function close() {
            console.log('disconnected');
        });
       
    });

    function noop() {}
 
    function heartbeat() {
        this.isAlive = true;
    }

    const interval = setInterval(function ping() {
        wss.clients.forEach(function each(ws) {
          if (ws.isAlive === false) return ws.terminate();
        console.log("ping");
        //   ws.isAlive = false;
          ws.ping(noop);
        });
    }, 30000);

};

const formatRTSP_to_StreamBinary = (uri, ws) => {
    const stream = new RTSP_Stream.FFMpeg({input: uri});
    stream.on('start', function() {
      (ws.readyState===WebSocket.OPEN) && ws.send(JSON.stringify({type: "OPEN", payload: {msg: "Success start", cam: uri}}));
    });
    stream.on('stop', function() {
      console.log('stream ' + uri + ' stopped');
    });
    stream.on('notfound', function(err) {
      (ws.readyState===WebSocket.OPEN) && ws.send(JSON.stringify({type: "NOTFOUND", payload: {msg: err, cam: uri}}));
    });
    stream.on('error', function(err) {
      (ws.readyState===WebSocket.OPEN) && ws.send(JSON.stringify({type: "ERROR", payload: {msg: err, cam: uri}}));
    });
    return stream;
};