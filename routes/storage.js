"use strict";
const express = require('express');
const router = express.Router();
const storageController = require('../controller/storage.controller');

router
.get('/mimetype', storageController.get_mimetype)
.get('/storages', storageController.get_storage)
.get('/storages/file', storageController.get_storage_file)
.get('/storages/download', storageController.get_download_file)
.delete('/storages/delete', storageController.delete_file);

module.exports = router;
