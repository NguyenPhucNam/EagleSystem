"use strict";
const express = require('express');
const router = express.Router();
const storageController = require('../controller/storage.controller');

router
.get('/storages', storageController.get_storage)
.get('/storages/download', storageController.get_download_file)
.delete('/storages/delete', storageController.delete_file);

module.exports = router;
