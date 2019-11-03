"use strict";
const formidable = require('formidable');
const helperUtils = require('../utils/helperUtils');

exports.uploads = (req) => {
    return new Promise(async (resolve, reject) => {
        const pathFile = await helperUtils.checkFoldersExists();
        const form = new formidable.IncomingForm();
        form.maxFileSize = 10737418240; // 10 * 1024 * 1024 * 1024; //10GB
        form.hash = true;
        form.multiples = true;
        form.uploadDir = pathFile;
        form.keepExtensions = true;
        try {
            form.parse(req);
            form.on('fileBegin', (name, file) => {
                file.name = `uploads_${file.name.replace(/[^.]*/, Date.now())}`;
            });
            form.on('end', () => resolve());
            form.on('error', (error) => reject(error));
        } catch (error) {
            reject(error);
        }
    });
}