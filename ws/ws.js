const WebSocket = require('ws');
const config = require('../config/config');

exports.init = (server) => {
    const wss = new WebSocket.Server({server, ...config});

    const duplex = WebSocket.createWebSocketStream(wss, { encoding: 'utf8' });
 
    duplex.pipe(process.stdout);
    process.stdin.pipe(duplex);

    wss.on('connection', function connection(ws) {
        ws.isAlive = true;
        ws.on('pong', heartbeat);

        ws.on('open', function open() {
            ws.send('something');
        });
    
        ws.on('message', function incoming(message) {
            if (ws.readyState === WebSocket.OPEN) {
                // ws.send('success');
            }
        });

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