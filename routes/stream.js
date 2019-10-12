"use strict";
const express = require('express');
const router = express.Router();
const streamController = require('../controller/stream.controller');

router
.get('/stream', streamController.get_jwt);

module.exports = router;