"use strict";
const fs = require('fs');
const path = require('path');

exports.backPressureWriteStream = (writer, data) => {
    return new Promise((resolve) => {
      if (!writer.write(data)) {
        writer.once('drain', resolve).setMaxListeners(0);
      }
    })
}

exports.detectTypeFile = (minetype) => {
  return new Promise((resolve, reject) => {
    const imageRegex = new RegExp('image', 'gi');
    const videoRegex = new RegExp('video', 'gi');
    try {
      if(imageRegex.test(minetype)) {
        resolve('image');
      } else if (videoRegex.test(minetype)) {
        resolve('video');
      } else {
        resolve('another');
      }
    } catch (error) {
      reject(error);
    }
  });
}

exports.checkFoldersExists = () => {
  return new Promise((resolve, reject) => {
    try {
      const today = new Date().toLocaleDateString().replace(/\//gi,'.');
      const pathFile = path.join(__dirname, `../public/storages/${today}`); 
      if (!fs.existsSync(pathFile)){
        fs.mkdirSync(pathFile);
        resolve(pathFile);
      } else {
        resolve(pathFile);
      }
    } catch (error) {
      reject(error);
    }
  });
}

exports.checkFoldersAFiles = (directoryPath) => {
  return new Promise((resolve, reject) => {
    try {
      fs.readdir(directoryPath, (err, data) => {
        if(!err) {
          resolve(data);
        } else {
          reject(error);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}