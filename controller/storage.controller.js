"use strict";
const path = require('path');
const fs = require('fs');

// listing all files using forEach
// files.forEach(function (file) {
//     console.log(path.extname(file));
    // Do whatever you want to do with the file
    // console.log(path.join(__dirname, `../public/storages/${file}`));
// });

exports.get_storage = async (req, res, next) => {
    const directoryPath = path.join(__dirname, '../public/storages/');
    fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        res.status(200).send(files);
    });
}

exports.get_download_file = async (req, res, next) => {
    const directoryPath = path.join(__dirname, '../public/storages/');    
    try {
        const name = await req.query.filename;
        const filePath = `${directoryPath}${name}`;
        res.download(filePath, name);
    } catch (error) {
        res.status(404).json({ error });
    }
}

exports.delete_file = async (req, res, next) => {
    const directoryPath = path.join(__dirname, '../public/storages/');    
    try {
        const name = await req.query.filename;
        const filePath = `${directoryPath}${name}`;
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
