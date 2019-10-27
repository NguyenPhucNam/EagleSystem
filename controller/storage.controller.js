"use strict";
const fs = require('fs');
const path = require('path');
const stream = require('stream');
const mime = require('mime-types');
const helperUtils = require('../utils/helperUtils');

exports.get_mimetype = async (req, res, next) => {
    try {
        const directoryPath = path.join(__dirname, '../public/mimetype');
        const mimetype = await helperUtils.checkFoldersAFiles(directoryPath);
        res.status(200).send(mimetype);
    } catch (error) {
        res.status(404).send(error);
    }
}

exports.get_storage = async (req, res, next) => {
    try {
        const arrayValue = [];
        const directoryPath = path.join(__dirname, '../public/storages');
        const folders = await helperUtils.checkFoldersAFiles(directoryPath);
        for (const folder of folders) {
            const files = await helperUtils.checkFoldersAFiles(`${directoryPath}/${folder}`);
            const jsonValue = {};
            jsonValue.folder = folder;
            jsonValue.files = files;
            arrayValue.push(jsonValue);
        }
        res.status(200).send(await arrayValue);
    } catch (error) {
        res.status(404).send(error);
    }
}

exports.get_storage_file = async (req, res, next) => {
    try {
        const ps = new stream.PassThrough();
        const { folder, filename } = await req.query;
        const isDash = await filename.match(/dash_/gim);
        const directoryPath = path.join(__dirname, '../public/storages');
        const filePath = `${directoryPath}/${folder}/${(!isDash) ? filename : filename + '/manifest.mpd'}`;
        const readStream = fs.createReadStream(filePath);
        fs.stat(filePath, function(err, stat) {
            if(err) throw new Error(err);
            res.writeHead(200, {
                "Content-Type": mime.lookup(filePath),
                "Content-Disposition": "attachment; filename=" + (!isDash) ? filename : filename + '/manifest.mpd',
                "Last-Modified": stat.birthtime.toUTCString(), //mtime
                "Created-Date": stat.birthtime.toUTCString(),
                "Content-Length": stat.size
            });
            ps.pipe(readStream.pipe(res));
        });
    } catch (error) {
        res.status(404).json({ error });        
    }
}

exports.get_download_file = async (req, res, next) => {
    try {
        const { folder, filename } = await req.query;
        const directoryPath = path.join(__dirname, '../public/storages');    
        const filePath = `${directoryPath}/${folder}/${filename}`;
        res.download(filePath, filename);
    } catch (error) {
        res.status(404).json({ error });
    }
}

exports.delete_file = async (req, res, next) => {
    try {
        const { folder, filename } = await req.query;
        const directoryPath = path.join(__dirname, '../public/storages');
        const filePath = `${directoryPath}/${folder}/${filename}`;
        fs.access(filePath, fs.F_OK, (err) => {
            if (err) {
                console.error(err);
                res.status(404).json({ err });
                return;
            }
            fs.unlink(filePath, (err) => {
                if (err) throw err;
                res.status(200).json({ message: 'File has been deleted successfully' });
            });
        });
    } catch (error) {
        res.status(500).json({ error });
    }
}
