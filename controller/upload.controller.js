"use strict";
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

exports.post_uploads = async (req, res, next) => {
    const form = new formidable.IncomingForm();
    const GB = 1024 * 1024 * 1024;
    form.maxFileSize = 10 * GB; //default maxFileSize is 200MB
    form.multiples = true; //default false
    try {
        form.parse(req);

        form.on('fileBegin', (name, file) => {
            file.name = `uploads_${file.name.replace(/[^.]*/, Date.now())}`;
            file.path = path.join(__dirname, `../public/storages/${file.name}`);
        });
    
        form.on('file', (name, file) => {
            console.log('Uploaded ' + file.name);
        });

        form.on('end', () => {
            console.log('Uploaded Done !!!');
            res.status(201).json({ message: 'Done!' });
        });

        form.on('error', (err) => {
            res.status(500).json({ error });
        });
    
    } catch (error) {
        res.status(500).json({ error });
    }
}
