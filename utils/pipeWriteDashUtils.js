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
var PipeWriteDash = function(options) {
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

util.inherits(PipeWriteDash, EventEmitter);

/**
* PipeWriteDash command name
* @type {string}
*/
PipeWriteDash.cmd = 'MP4Box';

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

PipeWriteDash.prototype._args = function() {
    return this.arguments = [
        '-dash', '4000',
        '-rap', '-frag-rap',
        '-profile', 'onDemand',
        '-out', this.output,
        `${this.input}#audio`, `${this.input}#video`
    ];
};

/**
* Start ffmpeg spawn process
*/
PipeWriteDash.prototype.start = function() {
    const self = this;
    self.emit('start ' + PipeWriteDash.cmd);
    this.child = spawn(PipeWriteDash.cmd, this._args());
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
PipeWriteDash.prototype.error = function(err) {
    this.child.stdout.pause();
    this.child.stderr.pause();
    this.child.kill();
    delete this.child;
    this.emit('error', err);
};
/**
* Stop ffmpeg spawn process
*/
PipeWriteDash.prototype.stop = function() {
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
PipeWriteDash.prototype.end = function() {
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
PipeWriteDash.prototype.restart = function() {
    if (this.child) {
        this.stop();
        this.start();
    }
};

if (typeof Proxy === 'function') {
    PipeWriteDash = new Proxy(PipeWriteDash, {
        set: function(target, property) {
            if (property !== 'super_' && target[property] !== undefined) {
                target.restart();
            }
            return true;
        }
    });
}

module.exports.PipeWriteDash = PipeWriteDash;