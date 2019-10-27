const util = require('util');
const stream = require('stream');
const readable = require('readable-stream');

exports.Upper = () => {
    const Transform = stream.Transform || readable.Transform;

    function Upper(options) {
        // allow use without new
        if (!(this instanceof Upper)) {
            return new Upper(options);
        }
        // init Transform
        Transform.call(this, options);
    }
    util.inherits(Upper, Transform);
    
    Upper.prototype._transform = function (chunk, enc, cb) {
        this.push(chunk); cb();
    };

    return new Upper();
}
