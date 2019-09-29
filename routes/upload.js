"use strict";
const express = require('express');
const router = express.Router();
const uploadController = require('../controller/upload.controller');

router
.get('/uploads', uploadController.get_uploads)
.post('/uploads', uploadController.post_uploads);

module.exports = router;
