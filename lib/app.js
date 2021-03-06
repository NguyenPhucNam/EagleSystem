const compression = require("compression");
const express = require("express");
const fs = require('fs');
const path = require('path');
const uploadRouter = require('../routes/upload');
const storageRouter = require('../routes/storage');
const streamRouter = require('../routes/stream');
const app = express();

app.use(compression())
app.disable('x-powered-by');

// Allowed extensions list can be extended depending on your own needs
const allowedExt = [
    '.js',
    '.ico',
    '.css',
    '.png',
    '.jpg',
    '.jpeg',
    '.gif',
    '.ico',
    '.woff2',
    '.woff',
    '.ttf',
    '.svg',
];

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../public/static'), { maxAge: '1 year' }));
app.use(express.static(path.join(__dirname, '../public/storages')));

app.use((req, res, next) => {
    const regex = new RegExp("/api", "gi");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("access-control-expose-headers", "Client-Protocol, Content-Length, Content-Type, X-Bandwidth-Est, X-Bandwidth-Est2, X-Bandwidth-Est3, X-Bandwidth-App-Limited, X-Bandwidth-Est-App-Limited, X-Bandwidth-Est-Comp, X-Bandwidth-Avg, X-Head-Time-Millis, X-Head-Time-Sec, X-Head-Seqnum, X-Response-Itag, X-Restrict-Formats-Hint, X-Sequence-Num, X-Segment-Lmt, X-Walltime-Ms");
    if (!regex.test(req.url)) {
        if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
            const stat = fs.stat(`public/static/${req.url}`);
            Promise.all([
                res.header("Last-Modified", stat.mtime.toUTCString()),
                res.header("Content-Length", stat.size),
                res.header("Cache-Control", "public, s-maxage=31536000, max-age=31536000"),
                res.header("ETag", `Ozy7_${stat.mtime.getTime()}`),
                res.header("Cache-Control", "public, s-maxage=31536000, max-age=31536000"),
                res.header("Expires", new Date(Date.now() + 31536000).toUTCString()),
                res.header("Date", new Date().toUTCString())
            ]);
        }
    }
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "*");
    }
    next();
});

app.use('/api', uploadRouter);
app.use('/api', storageRouter);
app.use('/api', streamRouter);

app.get('*', (req, res) => {
    if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
        res.sendFile(path.join(__dirname, `../public/static/${req.url}`));
    } else {
        res.sendFile(path.join(__dirname, '../public/static/index.html'));
    }
});

app.use((req,res,next) => {
    const error = new Error('Not Found');
    error.status(404);
    next(error);
});

app.use((error,req,res,next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;