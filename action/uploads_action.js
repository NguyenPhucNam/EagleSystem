"use strict";
const formidable = require('formidable');
const helperUtils = require('../utils/helperUtils');

exports.uploads = (req) => {
    return new Promise((resolve, reject) => {
        helperUtils.checkFoldersExists()
        .then(pathFile => {
            const form = new formidable.IncomingForm();
            form.maxFileSize = 10 * 1024 * 1024 * 1024; //default maxFileSize is 200MB
            form.hash = true;
            form.multiples = true;
            form.uploadDir = pathFile;
            form.keepExtensions = true;
            try {
                form.parse(req);
                form.on('fileBegin', (name, file) => {
                    helperUtils.detectTypeFile(file.type)
                    .then(minetype => {
                        if(minetype === 'image') {
                            // file.name = `uploads_${file.name.replace(/[^.]*/, Date.now()).replace(/\.[\w+]{0,}/gim, '.jpg')}`;
                            file.path = `${form.uploadDir}/${file.name}`;
                        } else if (minetype === 'video') {
                            // file.name = `uploads_${file.name.replace(/[^.]*/, Date.now()).replace(/\.[\w+]{0,}/gim, '.webm')}`;
                            file.name = `${file.name.replace(/\.[\w+]{0,}/gim, '.webm')}`;
                            file.path = `${form.uploadDir}/${file.name}`;
                        } else {
                            // file.name = `uploads_${file.name.replace(/[^.]*/, Date.now())}`;
                            file.path = `${form.uploadDir}/${file.name}`;
                        }
                    })
                    .catch(error => reject(error));
                });
                form.on('end', () => resolve());
                form.on('error', (error) => reject(error));
            } catch (error) {
                reject(error);
            }
        })
        .catch(error => reject(error));
    });
}
