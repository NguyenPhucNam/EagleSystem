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
var PipeWrite = function(options) {
    if (options.input) {
        this.input = options.input;
    } else {
        throw new Error('no `input` parameter');
    }
    if (options.output) {
        this.output = options.output;
    } else {
        throw new Error('no `output` parameter');
    }
    this.arguments = options.arguments || [];
    this.on('newListener', newListener.bind(this));
    this.on('removeListener', removeListener.bind(this));
    this.on('errorListener', errorListener.bind(this));
    if (Object.observe && (typeof Proxy !== 'function')) {
        Object.observe(this, observer.bind(this));
    }
};

util.inherits(PipeWrite, EventEmitter);

/**
* PipeWrite command name
* @type {string}
*/
PipeWrite.cmd = 'ffmpeg';

function newListener(event) {
    if (event === 'data' && this.listeners(event).length === 0) {
        this.start();
    }
}
function removeListener(event) {
    if (event === 'data' && this.listeners(event).length === 0) {
        this.stop();
    }
}
function errorListener(event) {
    if (event === 'data' && this.listeners(event).length === 0) {
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

PipeWrite.prototype._args = function() {
    return this.arguments = [
    // '-loglevel', 'quiet',
    '-i', 'pipe:0',
    '-s', '1280x720',
    '-c:v', 'libx264', 
    '-preset', 'fast',
    '-tune', 'zerolatency',
    '-b:v', '2500k',
    '-r', '24',
    '-x264opts', 'keyint=48:min-keyint=48:no-scenecut',
    '-profile:v', 'main',
    '-movflags', '+faststart',
    '-c:a', 'aac',
    '-b:a', '128k',
    '-ac', '2',
    '-f', 'dash', 
    '-min_seg_duration', '30', 
    '-use_timeline', '1', 
    '-use_template', '1', 
    '-init_seg_name', '$RepresentationID$-init.m4s', 
    '-media_seg_name', '$RepresentationID$-$Time$.m4s',
    `${this.output}`];
};

/**
* Start ffmpeg spawn process
*/
PipeWrite.prototype.start = function() {
    const self = this;
    self.emit('start ' + PipeWrite.cmd);
    const input_stream = this.input;
    this.child = spawn(PipeWrite.cmd, this._args());
    input_stream.pipe(this.child.stdin);
    this.child.stderr.on('data', function (data) {
        self.emit('data', data.toString());
    }.bind(this));
    this.child.stderr.on('error', function (err) {
        console.log('child process error');
        self.error(err);
    }.bind(this));
    this.child.stderr.on('end', function () {
        console.log('file has been converted succesfully');
        self.end();
    }.bind(this));
    this.child.stderr.on('exit', function () {
        console.log('child process exited');
    }.bind(this));
    this.child.stderr.on('close', function() {
        console.log('closing time! bye');
        self.end();
    }.bind(this));
};

/**
* Error ffmpeg spawn process
*/
PipeWrite.prototype.error = function(err) {
    this.child.stdout.pause();
    this.child.stderr.pause();
    this.child.kill();
    delete this.child;
    this.emit('error', err);
};
/**
* Stop ffmpeg spawn process
*/
PipeWrite.prototype.stop = function() {
    if(this.child) {
        this.child.stdout.pause();
        this.child.stderr.pause();
        this.child.kill();
        delete this.child;
        this.emit('stop');
    }
};
/**
* Error pipewrite spawn process
*/
PipeWrite.prototype.end = function() {
    if(this.child) {
        this.child.stdout.pause();
        this.child.stderr.pause();
        this.child.kill();
        delete this.child;
        this.emit('end');
    }
};

/**
* Restart ffmpeg spawn process
*/
PipeWrite.prototype.restart = function() {
    if (this.child) {
        this.stop();
        this.start();
    }
};

if (typeof Proxy === 'function') {
    PipeWrite = new Proxy(PipeWrite, {
        set: function(target, property) {
            if (property !== 'super_' && target[property] !== undefined) {
                target.restart();
            }
            return true;
        }
    });
}

module.exports.PipeWrite = PipeWrite;