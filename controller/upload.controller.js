"use strict";
const actionUploads = require('../action/uploads_action');

exports.post_uploads = async (req, res, next) => {
    try {
        await actionUploads.uploads(req);
        res.status(201).json({ message: 'Done!' });     
    } catch (error) {
        res.status(500).json({ error });        
    }
}
