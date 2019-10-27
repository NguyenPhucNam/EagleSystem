
const spawn = require('child_process').spawn;
const EventEmitter = require('events').EventEmitter;
const util = require('util');

/**
* Stream constructor
* @param {object} options
* @param {string} options.input Stream uri, for example rtsp://r3---sn-5hn7su76.c.youtube.com/CiILENy73wIaGQnup-1SztVOYBMYESARFEgGUgZ2aWRlb3MM/0/0/0/video.3gp
* @param {Array<string>} [options.arguments] Custom arguments for ffmpeg
* @constructor
*/
var FFMpeg = function(options) {
    if (options.input) {
        this.input = options.input;
    } else {
        throw new Error('no `input` parameter');
    }
    this.arguments = options.arguments || [];
    this.count = 0;
    this.on('newListener', newListener.bind(this));
    this.on('removeListener', removeListener.bind(this));
    this.on('notfoundListener', notfoundListener.bind(this));
    this.on('errorListener', errorListener.bind(this));
    if (Object.observe && (typeof Proxy !== 'function')) {
        Object.observe(this, observer.bind(this));
    }
};

util.inherits(FFMpeg, EventEmitter);

/**
* FFMpeg command name
* @type {string}
*/
FFMpeg.cmd = 'ffmpeg';

function newListener(event) {
    if (event === 'camdata' && this.listeners(event).length === 0) {
        this.start();
    }
}

function removeListener(event) {
    if (event === 'camdata' && this.listeners(event).length === 0) {
        this.stop();
    }
}

function notfoundListener(event) {
    if (event === 'camdata' && this.listeners(event).length === 0) {
        this.notfound();
    }
}

function errorListener(event) {
    if (event === 'camdata' && this.listeners(event).length === 0) {
        this.error();
    }
}

function observer(changes) {
    if (changes.some(function(change) {
        return change.type === 'update';
    })) {
        this.restart();
    }
}

FFMpeg.prototype._args = function() {
    return this.arguments = [
    '-loglevel', 'quiet',
    '-fflags', 'nobuffer',
    '-rtsp_transport', 'tcp',
    '-i', this.input,
    '-tune', 'zerolatency',
    '-preset', 'ultrafast',
    '-vf', 'scale=-1:480',
    '-f', 'mpegts',
    '-codec:v', 'mpeg1video',
    '-s', '480x360',
    '-b:v', '1000k',
    '-r', '30',
    '-bf', '0',
    '-codec:a', 'mp2', 
    '-ar', '44100', 
    '-ac', '1', 
    '-b:a', '128k',
    '-muxdelay', '0.001',
    '-'];
};

/**
* Start ffmpeg spawn process
*/
FFMpeg.prototype.start = function() {
    let self = this;
    let isStart = 0;
    this.child = spawn(FFMpeg.cmd, this._args(),{detached: false});
    this.child.stdout.on('data', function(data){
        self.emit('camdata', data);
        (isStart++ === 0) && this.emit('start');
    }.bind(this));
    this.child.stderr.on('data', function(data) {
        global.process.stderr.write(data);
    }.bind(this));
    this.child.on('close', function(code) {
        if (code === (0 || 1)) {
            if(this.count++ < 5) {
                setTimeout(FFMpeg.prototype.start.bind(this), 1000);
            } else {
                this.notfound('Not Found Camera IP');
                return;
            }
        }
    }.bind(this));
    this.child.on('error', function(err) {
        if (err.code === 'ENOENT') {
            this.error('FFMpeg executable wasn\'t found. Install this package and check FFMpeg.cmd property');
        } else {
            this.error(err);
        }
    });
};

/**
* Stop ffmpeg spawn process
*/
FFMpeg.prototype.stop = function() {
    if(this.child) {
        this.child.stdout.pause();
        this.child.stderr.pause();
        this.child.kill();
        delete this.child;
        this.emit('stop');
    }
};

/**
* Not Found ffmpeg spawn process
*/
FFMpeg.prototype.notfound = function(err) {
    this.child.stdout.pause();
    this.child.stderr.pause();
    this.child.kill();
    delete this.child;
    this.emit('notfound', err);
};

/**
* Error ffmpeg spawn process
*/
FFMpeg.prototype.error = function(err) {
    this.child.stdout.pause();
    this.child.stderr.pause();
    this.child.kill();
    delete this.child;
    this.emit('error', err);
};

/**
* Restart ffmpeg spawn process
*/
FFMpeg.prototype.restart = function() {
    if (this.child) {
        this.stop();
        this.start();
    }
};

if (typeof Proxy === 'function') {
    FFMpeg = new Proxy(FFMpeg, {
        set: function(target, property) {
            if (property !== 'super_' && target[property] !== undefined) {
                target.restart();
            }
            return true;
        }
    });
}

module.exports.FFMpeg = FFMpeg;