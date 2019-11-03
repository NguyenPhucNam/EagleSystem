"use strict";
const fs = require('fs');
const formidable = require('formidable');
const { PassThrough } = require('stream');
const Pipe = require('../utils/pipeWriteUtils');
const helperUtils = require('../utils/helperUtils');
const upperUtils = require('../utils/upperPipUtils');

exports.uploads = (req) => {
    return new Promise(async (resolve, reject) => {
        const pathFile = await helperUtils.checkFoldersExists();
        const pathFolder = `${pathFile}/dash_${Date.now()}`;

        const upper = upperUtils.Upper();
        const passThrough = new PassThrough();

        const form = new formidable.IncomingForm();
        form.maxFileSize = 10737418240; // 10 * 1024 * 1024 * 1024; //10GB
        form.hash = true;
        form.multiples = true;
        form.uploadDir = pathFile;
        form.keepExtensions = true;
        
        try {
            form.onPart = function(part) {
                const videoRegex = new RegExp('video', 'gi');

                if (!part.filename) {
                    form.handlePart(part);
                }

                part.addListener('data', function(chunk) {
                    upper.write(chunk);
                });

                part.addListener('end', function() {
                    upper.end();
                    console.log("========== Done ===============");
                });

                if(videoRegex.test(part.mime)) {
                    const folder = helperUtils.createFolders(pathFolder);
                    const pathDashFile = `${folder}/manifest.mpd`;
                    const writeStream = fs.createWriteStream(`${folder}/${part.filename}`);

                    passThrough.pipe(upper).pipe(writeStream)
                    .on('finish', function () { resolve(); });

                    new Pipe.PipeWrite({input: passThrough.pipe(upper), output: pathDashFile})
                    .on('start', function() { console.log('start') })
                    .on('data', function(data) { console.log(data) })
                    .on('error', function(error) { console.log(error) })
                    .on('end', function() { resolve(); });
                } else {
                    const writeStream = fs.createWriteStream(`${pathFile}/${part.filename}`);

                    passThrough.pipe(upper).pipe(writeStream)
                    .on('finish', function () { resolve(); });
                }

            }

            form.parse(req);

            form.on('error', (error) => reject(error));
        } catch (error) {
            reject(error);
        }
    });
}

